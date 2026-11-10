// Sync endpoint. One POST per request: the body is the device's whole snapshot.
// The function merges it with the stored file for that sync code, saves it, and returns the merged snapshot.
// CORS is set on the function URL itself, so this handler adds no CORS headers.
import { S3Client, GetObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { merge } from "./merge.mjs";

const s3 = new S3Client({});
const BUCKET = process.env.BUCKET;
const MAX_BODY = 200000;
const CODE_RE = /^[A-Z2-9]{16}$/;

function reply(status, body) {
  return { statusCode: status, headers: { "content-type": "application/json" }, body: JSON.stringify(body) };
}

// The stored snapshot and its etag, or null when this code has no file yet.
async function read(key) {
  try {
    const res = await s3.send(new GetObjectCommand({ Bucket: BUCKET, Key: key }));
    const text = await res.Body.transformToString();
    let data = null;
    try {
      data = JSON.parse(text);
    } catch (e) {
      data = null; // a broken file is replaced by the next valid write
    }
    return { data, etag: res.ETag };
  } catch (e) {
    if (e.name === "NoSuchKey") return null;
    throw e;
  }
}

export async function handler(event) {
  try {
    if (event.requestContext?.http?.method !== "POST") return reply(405, { error: "Use POST" });

    const params = event.queryStringParameters || {};
    const code = String(params.code || "").toUpperCase().replace(/-/g, "");
    if (!CODE_RE.test(code)) return reply(400, { error: "Bad code" });

    let raw = event.body || "";
    if (event.isBase64Encoded) raw = Buffer.from(raw, "base64").toString("utf8");
    if (raw.length > MAX_BODY) return reply(413, { error: "Too large" });
    let incoming;
    try {
      incoming = JSON.parse(raw);
    } catch (e) {
      return reply(400, { error: "Bad JSON" });
    }

    const key = `progress/${code}.json`;
    // Up to 3 tries: another device writing at the same time makes the conditional put fail, so re-read and merge again.
    for (let attempt = 1; attempt <= 3; attempt++) {
      const stored = await read(key);
      if (!stored && params.join === "1") return reply(404, { error: "Unknown code" });

      const merged = merge(stored ? stored.data : null, incoming);
      try {
        await s3.send(new PutObjectCommand({
          Bucket: BUCKET,
          Key: key,
          ContentType: "application/json",
          Body: JSON.stringify(merged),
          ...(stored ? { IfMatch: stored.etag } : { IfNoneMatch: "*" })
        }));
        return reply(200, merged);
      } catch (e) {
        const status = e.$metadata?.httpStatusCode;
        if (status !== 412 && status !== 409) throw e;
      }
    }
    return reply(409, { error: "Busy, try again" });
  } catch (e) {
    console.error(e);
    return reply(500, { error: "Server error" });
  }
}
