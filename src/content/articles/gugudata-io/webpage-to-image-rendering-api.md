---
title: "Webpage to Image Rendering API Documentation"
description: "Webpage to Image Rendering API documentation with endpoint details, request parameters, response fields, HTTP status codes, and integration examples for develo…"
section: "gugudata-io"
slug: "webpage-to-image-rendering-api"
lang: "en"
status: "published"
tags: ["API","Website Tools APIs","GuGuData.io"]
publishedAt: "2026-04-10T00:00:00.000Z"
updatedAt: "2026-04-10T00:00:00.000Z"
author: "GuGuData"
---
## Webpage to Image Rendering API: Technical Guide and Integration Notes

The Webpage to Image Rendering API from GuGuData helps developers render a target webpage as an image binary stream with configurable viewport options.

This article is written for developers who want a crawlable, readable reference before integrating the endpoint into a product, data pipeline, internal tool, or technical workflow. The official detail page is [https://gugudata.io/details/url2image](https://gugudata.io/details/url2image).

### API details

| Item | Value |
| --- | --- |
| API name | Webpage to Image Rendering |
| Category | Website Tools APIs |
| Method | `GET` |
| Endpoint | `https://api.gugudata.io/v1/websitetools/url2image` |
| Content type | `query parameters` |
| Demo endpoint | [https://api.gugudata.io/v1/websitetools/url2image/demo](https://api.gugudata.io/v1/websitetools/url2image/demo) |
| Detail page | [https://gugudata.io/details/url2image](https://gugudata.io/details/url2image) |
| OpenAPI JSON | [https://gugudata.io/assets/openapi/gugudata.openapi.3.1.json](https://gugudata.io/assets/openapi/gugudata.openapi.3.1.json) |

### When to use this API

- Render public pages as images for previews or monitoring.
- Generate visual snapshots for reports and dashboards.
- Capture page state for QA workflows.

### Request parameters

This endpoint accepts parameters through the query string. Keep `appkey` out of client-side public code and send it only from trusted server-side environments.

| Parameter | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `appkey` | `string` | Yes | `YOUR_APPKEY` | Application key used for request authentication. Supply the value as a query parameter, form field, or multipart field according to the request content type. |
| `url` | `string` | Yes | - | Target webpage URL. |
| `isFullPage` | `boolean` | No | `false` | Whether the renderer should capture the full page height. |
| `width` | `integer` | No | `250` | Output width in pixels. |
| `height` | `integer` | No | `250` | Output height in pixels. |
| `viewportWidth` | `integer` | No | `1080` | Viewport width in pixels used during page rendering. |
| `viewportHeight` | `integer` | No | `1080` | Viewport height in pixels used during page rendering. |
| `forceReload` | `boolean` | No | `false` | Whether the renderer should bypass cached page content before capture. |
| `isMobile` | `boolean` | No | `false` | Whether the renderer should emulate a mobile device viewport. |
| `isDarkMode` | `boolean` | No | `false` | Whether the renderer should emulate dark mode when rendering the target page. |
| `deviceScaleFactor` | `integer` | No | `1` | Device scale factor used during page rendering. |

### Example request

```bash
curl -G "https://api.gugudata.io/v1/websitetools/url2image" \
  --data-urlencode "appkey=YOUR_APPKEY" \
  --data-urlencode "url=https://example.com/article" \
  --data-urlencode "isFullPage=false" \
  --data-urlencode "width=250" \
  --data-urlencode "height=250" \
  --data-urlencode "viewportWidth=1080" \
  --data-urlencode "viewportHeight=1080" \
  --data-urlencode "forceReload=false" \
  --data-urlencode "isMobile=false" \
  --data-urlencode "isDarkMode=false" \
  --data-urlencode "deviceScaleFactor=1"
```

### Response fields

The response body contains the fields below for successful JSON responses. For binary endpoints, the success response is returned as binary content and JSON is used for error responses.

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `image` | `binary` | Yes | Rendered image binary stream returned on success. On failure, the endpoint returns a JSON error payload instead of binary content. |

### Response example

Successful responses return binary content. JSON error responses use the same dataStatus metadata shape documented below.

### HTTP status codes

Use the HTTP status code for transport-level handling. If the response body contains `dataStatus.statusCode`, treat it as an application-level status field in the JSON payload.

| HTTP status | Meaning | Recommended handling |
| --- | --- | --- |
| `200` | Request processed successfully. | Parse the documented response body for the endpoint result. |
| `400` | Invalid request parameters or request format. | Check required fields, data types, and request body format. |
| `401` | Missing or unknown application key. | Send a valid appkey with the request. |
| `403` | The application key is recognized but access is not allowed. | Check subscription, trial state, and endpoint access. |
| `429` | Request rate or trial usage limit exceeded. | Reduce concurrency or retry after the limit window resets. |
| `500` | Internal service error. | Retry later or contact support if the error persists. |
| `503` | Upstream service unavailable. | Retry later when the dependency is available again. |

### Implementation notes

- Validate required parameters before sending the request so `400` responses are easier to diagnose.
- Keep server-side retries conservative for `429`, `500`, and `503` responses.
- Cache stable metadata responses when your use case allows it, especially for lookup and directory endpoints.
- Log the HTTP status code and `dataStatus.statusDescription` together for easier debugging.
- Use the demo endpoint for a quick connectivity check, then switch to the authenticated endpoint for production data.

### FAQ

#### Where is the official API detail page?

The official detail page is [https://gugudata.io/details/url2image](https://gugudata.io/details/url2image). It is the best place to review the latest public endpoint information before publishing or integrating.

#### Should I handle `dataStatus.statusCode` as the HTTP status code?

No. Use the HTTP status code for request-level behavior such as authentication, permission, rate limiting, and server errors. Use `dataStatus.statusCode` only as the response body status field when it is present.

#### Can I use the demo endpoint in production?

No. The demo endpoint is for quick testing and examples. Use the authenticated endpoint with your `appkey` for production workflows.

### Related GuGuData APIs

- [Webpage Readable Content Extraction](https://gugudata.io/details/readability)
- [Domain SSL Certificate Information Parsing](https://gugudata.io/details/sslcertinfo)
- [Domain DNS Information Query](https://gugudata.io/details/dnslookup)

For more developer APIs, visit [GuGuData](https://gugudata.io/).
