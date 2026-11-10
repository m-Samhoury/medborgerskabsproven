# Sync between devices: AWS setup

This sets up the small server behind "Synkroniser mellem enheder" (on I dag). It is one Lambda function with a public function URL, storing one JSON file per sync code in a private S3 bucket. The site never sees an AWS key.

The steps below are for the site owner to run. The code is in `sync/lambda/` (`index.mjs` is the handler, `merge.mjs` the merge rules). The region is `eu-north-1` (Stockholm); use your own region if you prefer, and change it everywhere.

Set these once in your shell, so the commands below can be pasted as they are:

```bash
export AWS_REGION=eu-north-1
export BUCKET=mbp-sync-CHANGE-ME        # must be globally unique
export FUNC=mbp-sync
export ACCOUNT_ID=123456789012          # aws sts get-caller-identity --query Account --output text
```

## 1. Create the bucket (private)

```bash
aws s3api create-bucket --bucket "$BUCKET" --region "$AWS_REGION" \
  --create-bucket-configuration LocationConstraint="$AWS_REGION"

aws s3api put-public-access-block --bucket "$BUCKET" \
  --public-access-block-configuration BlockPublicAcls=true,IgnorePublicAcls=true,BlockPublicPolicy=true,RestrictPublicBuckets=true
```

## 2. Create the Lambda execution role

Trust policy (`trust.json`), so Lambda can use the role:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    { "Effect": "Allow", "Principal": { "Service": "lambda.amazonaws.com" }, "Action": "sts:AssumeRole" }
  ]
}
```

```bash
aws iam create-role --role-name mbp-sync-role --assume-role-policy-document file://trust.json

aws iam attach-role-policy --role-name mbp-sync-role \
  --policy-arn arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole
```

Access policy (`access.json`). Only the `progress/` prefix of this bucket:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    { "Effect": "Allow", "Action": ["s3:GetObject", "s3:PutObject"], "Resource": "arn:aws:s3:::CHANGE-ME-BUCKET/progress/*" },
    { "Effect": "Allow", "Action": "s3:ListBucket", "Resource": "arn:aws:s3:::CHANGE-ME-BUCKET" }
  ]
}
```

Replace `CHANGE-ME-BUCKET` with the bucket name, then:

```bash
sed "s/CHANGE-ME-BUCKET/$BUCKET/g" access.json > access-filled.json
aws iam put-role-policy --role-name mbp-sync-role --policy-name mbp-sync-s3 --policy-document file://access-filled.json
```

`s3:ListBucket` is needed. Without it, a missing object returns AccessDenied instead of NoSuchKey, and a new sync code cannot be created.

Wait about 10 seconds for IAM to propagate before the next step.

## 3. Zip the code and create the function

```bash
cd sync/lambda
zip -r ../../mbp-sync.zip index.mjs merge.mjs
cd ../..

aws lambda create-function --function-name "$FUNC" --region "$AWS_REGION" \
  --runtime nodejs22.x --handler index.handler \
  --role arn:aws:iam::$ACCOUNT_ID:role/mbp-sync-role \
  --zip-file fileb://mbp-sync.zip \
  --environment "Variables={BUCKET=$BUCKET}" \
  --memory-size 128 --timeout 10
```

The runtime has `@aws-sdk/client-s3` built in. Do not bundle it, and do not add a `package.json`.

## 4. Create the function URL, with CORS

The CORS settings live on the function URL. The function itself adds no CORS headers.

```bash
aws lambda create-function-url-config --function-name "$FUNC" --region "$AWS_REGION" \
  --auth-type NONE \
  --cors '{"AllowOrigins":["https://m-samhoury.github.io","http://localhost:8080","http://127.0.0.1:8080"],"AllowMethods":["POST"],"MaxAge":86400}'
```

The command prints `FunctionUrl`. Keep it.

Allow anyone to call the URL. Newer accounts need both permissions, so add both (if the second one is refused as a duplicate on an older account, that's fine):

```bash
aws lambda add-permission --function-name "$FUNC" --region "$AWS_REGION" \
  --statement-id FunctionURLAllowPublic --action lambda:InvokeFunctionUrl \
  --principal "*" --function-url-auth-type NONE

aws lambda add-permission --function-name "$FUNC" --region "$AWS_REGION" \
  --statement-id FunctionURLInvoke --action lambda:InvokeFunction \
  --principal "*" --invoked-via-function-url
```

## 5. Optional: cap the concurrency

This limits how many requests run at once, so a runaway client can't run up a bill:

```bash
aws lambda put-function-concurrency --function-name "$FUNC" --region "$AWS_REGION" \
  --reserved-concurrent-executions 5
```

New accounts often have a low concurrency quota, and this command fails there. Skipping it is fine.

## 6. Test

Use your function URL in place of `<url>`:

```bash
curl -X POST "<url>?code=AAAABBBBCCCCDDDD" -H 'content-type: text/plain' -d '{}'
```

Expected: a 200 with a JSON snapshot (`{"v":1,"resetAt":0,"progress":{...},...}`). Then check that joining an unknown code fails:

```bash
curl -i -X POST "<url>?code=ZZZZYYYYXXXXWWWW&join=1" -H 'content-type: text/plain' -d '{}'
```

Expected: `404`. When you are done testing, delete the test file:

```bash
aws s3 rm "s3://$BUCKET/progress/AAAABBBBCCCCDDDD.json"
```

## 7. Connect the site

Paste the function URL into `SYNC_URL` in `js/sync.js`:

```js
var SYNC_URL = "https://<id>.lambda-url.eu-north-1.on.aws/";
```

Then commit and push, as for any site change (pushing deploys the site to GitHub Pages).

## 8. Update the code later

After changing `sync/lambda/index.mjs` or `merge.mjs`, zip them again and upload:

```bash
cd sync/lambda && zip -r ../../mbp-sync.zip index.mjs merge.mjs && cd ../..
aws lambda update-function-code --function-name "$FUNC" --region "$AWS_REGION" --zip-file fileb://mbp-sync.zip
```

## Security

- The sync code is the only secret. It is 16 characters from a 32-symbol alphabet, which is about 80 bits. Anyone who has the code can read that progress and overwrite it.
- Anyone can create a new code, because the URL is public. That is why the function caps request bodies at 200 000 characters, and why the concurrency cap in step 5 is worth setting if you want a limit.
- The progress is stored in your bucket, so keep the bucket private (step 1).
- To remove one person's data, delete `progress/<CODE>.json` from the bucket.
