---
title: "Webpage Readable Content Extraction API Documentation"
description: "Webpage Readable Content Extraction API documentation with endpoint details, request parameters, response fields, HTTP status codes, and integration examples f…"
section: "gugudata-io"
slug: "webpage-readable-content-extraction-api"
lang: "en"
status: "published"
tags: ["API","Website Tools APIs","GuGuData.io"]
publishedAt: "2026-04-10T00:00:00.000Z"
updatedAt: "2026-04-10T00:00:00.000Z"
cover: "https://assets.devopen.club/uPic/202608/gugudata-pages/section-gugudata-io-9b5c79b6c485faad.webp"
author: "GuGuData"
---
## Webpage Readable Content Extraction API: Technical Guide and Integration Notes

The Webpage Readable Content Extraction API from GuGuData helps developers extract cleaned, reader-friendly article content from a webpage URL or a raw HTML payload.

This article is written for developers who want a crawlable, readable reference before integrating the endpoint into a product, data pipeline, internal tool, or technical workflow. The official detail page is [https://gugudata.io/details/readability](https://gugudata.io/details/readability).

### API details

| Item | Value |
| --- | --- |
| API name | Webpage Readable Content Extraction |
| Category | Website Tools APIs |
| Method | `POST` |
| Endpoint | `https://api.gugudata.io/v1/websitetools/readability` |
| Content type | `application/json` |
| Demo endpoint | [https://api.gugudata.io/v1/websitetools/readability/demo](https://api.gugudata.io/v1/websitetools/readability/demo) |
| Detail page | [https://gugudata.io/details/readability](https://gugudata.io/details/readability) |
| OpenAPI JSON | [https://gugudata.io/assets/openapi/gugudata.openapi.3.1.json](https://gugudata.io/assets/openapi/gugudata.openapi.3.1.json) |

### When to use this API

- Extract clean article content from public web pages.
- Remove navigation, sidebars, and boilerplate from page content.
- Prepare readable text for summarization or indexing.

### Request parameters

This endpoint accepts parameters through the query string plus request body. Keep `appkey` out of client-side public code and send it only from trusted server-side environments.

| Parameter | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `appkey` | `string` | Yes | `YOUR_APPKEY` | Application key used for request authentication. Supply the value as a query parameter, form field, or multipart field according to the request content type. |
| `html` | `string` | No | - | Raw HTML content. Supply either `html` or `url`. |
| `url` | `string` | No | - | Target webpage URL. Supply either `url` or `html`. |

### Example request

```bash
curl -X POST "https://api.gugudata.io/v1/websitetools/readability?appkey=REDACTED \
  -H "Content-Type: application/json" \
  -d '
{
  "url": "https://example.com/article"
}
'
```

### Response fields

The response body contains the fields below for successful JSON responses. For binary endpoints, the success response is returned as binary content and JSON is used for error responses.

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `DataStatus.RequestParameter` | `string` | Yes | Normalized request parameters echoed by the service. Sensitive credentials are omitted when available. |
| `DataStatus.StatusCode` | `integer` | Yes | Application-level status code returned by the API response. |
| `DataStatus.StatusDescription` | `string` | Yes | Application-level status message returned by the API response. |
| `DataStatus.ResponseDateTime` | `string` | Yes | Response timestamp returned by the API response. |
| `DataStatus.DataTotalCount` | `integer` | Yes | Total number of records that match the request. |
| `Data.Title` | `string` | Yes | Article title |
| `Data.Byline` | `string` | Yes | Article author |
| `Data.Dir` | `string` | Yes | Article text direction |
| `Data.Lang` | `string` | Yes | Article language |
| `Data.Content` | `string` | Yes | Article content |
| `Data.TextContent` | `string` | Yes | Article content (without HTML tags, divided by paragraphs) |
| `Data.Length` | `integer` | Yes | Article length |
| `Data.Excerpt` | `string` | Yes | Article excerpt |
| `Data.SiteName` | `string` | Yes | Website name |
| `Data.PublishedTime` | `array<string>` | Yes | Article publication time |

### Response example

```json
{
  "dataStatus": {
    "statusCode": 200,
    "statusDescription": "successfully",
    "responseDateTime": "2026-04-10T00:00:00Z",
    "dataTotalCount": 1
  },
  "data": "sample value"
}
```

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

The official detail page is [https://gugudata.io/details/readability](https://gugudata.io/details/readability). It is the best place to review the latest public endpoint information before publishing or integrating.

#### Should I handle `dataStatus.statusCode` as the HTTP status code?

No. Use the HTTP status code for request-level behavior such as authentication, permission, rate limiting, and server errors. Use `dataStatus.statusCode` only as the response body status field when it is present.

#### Can I use the demo endpoint in production?

No. The demo endpoint is for quick testing and examples. Use the authenticated endpoint with your `appkey` for production workflows.

### Related GuGuData APIs

- [Domain SSL Certificate Information Parsing](https://gugudata.io/details/sslcertinfo)
- [Domain DNS Information Query](https://gugudata.io/details/dnslookup)
- [Get Any Site Title and Favicon](https://gugudata.io/details/favicon)

For more developer APIs, visit [GuGuData](https://gugudata.io/).
