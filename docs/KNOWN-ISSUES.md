---
updated_at: 2025-08-05 20:45:06
bun_version: 1.2.19
---

# Known Issues

## Caused by Bun

[Issue#7135 Unable to Forward Request Body Stream to Fetch](https://github.com/oven-sh/bun/issues/7135)

So we can't stream forward request body to upstream directly


[Issue#5686 [Node.js] - HTTP Request Agent is invalid! - Via node-fetch](https://github.com/oven-sh/bun/issues/5686) 

Forwarding a large form-data payload to upstream via a proxy server could throw a `ECONNRESET` error.

[Issue#21620 Multiple data writes on outgoing http/https request cause the connection to hang](https://github.com/oven-sh/bun/issues/21620)

So streaming a large payload to upstream doesn't work.

[Isseu#18701 Streaming `formData()` for requests](https://github.com/oven-sh/bun/issues/18701)

