---
title: "Convert HTML to Word API Documentation"
description: "Convert HTML to Word API documentation with endpoint details, request parameters, response fields, HTTP status codes, and integration examples for developers."
section: "gugudata-io"
slug: "convert-html-to-word-api"
lang: "en"
status: "published"
tags: ["API","Document and Image APIs","GuGuData.io"]
publishedAt: "2026-04-17T00:00:00.000Z"
updatedAt: "2026-04-17T00:00:00.000Z"
cover: "https://assets.devopen.club/uPic/202608/gugudata-pages/section-gugudata-io-9b5c79b6c485faad.webp"
author: "GuGuData"
---
## Convert HTML to Word API: Technical Guide and Integration Notes

The Convert HTML to Word API from GuGuData helps developers convert HTML content or a webpage URL into a Word document that is ready to download, archive, or share.

This article is written for developers who want a crawlable, readable reference before integrating the endpoint into a product, data pipeline, internal tool, or technical workflow. The official detail page is [https://gugudata.io/details/html2word](https://gugudata.io/details/html2word).

### API details

| Item | Value |
| --- | --- |
| API name | Convert HTML to Word |
| Category | Document and Image APIs |
| Method | `POST` |
| Endpoint | `https://api.gugudata.io/v1/imagerecognition/html2word` |
| Content type | `multipart/form-data` |
| Demo endpoint | [https://api.gugudata.io/v1/imagerecognition/html2word/demo](https://api.gugudata.io/v1/imagerecognition/html2word/demo) |
| Detail page | [https://gugudata.io/details/html2word](https://gugudata.io/details/html2word) |

### When to use this API

- Convert raw HTML strings into editable Word documents.
- Export webpage content to `.docx` files for reports, archives, and publishing workflows.
- Add document export to CMS, internal tools, and business documentation systems.

### Request parameters

This endpoint accepts parameters through the query string plus request body. Keep `appkey` out of client-side public code and send it only from trusted server-side environments.

| Parameter | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `appkey` | `string` | Yes | `YOUR_APPKEY` | Application key used for request authentication. Supply the value as a query parameter, form field, or multipart field according to the request content type. |
| `content` | `string` | Yes | - | HTML string or webpage URL to convert. Send this parameter as multipart form data. |
| `type` | `string` | Yes | `html` | Request type. Supported values are `html` and `url`. Send this parameter as multipart form data. |
| `filename` | `string` | No | - | Optional output file name ending in `.docx`. Send this parameter as multipart form data. |

### Example request

```bash
curl -X POST "https://api.gugudata.io/v1/imagerecognition/html2word?appkey=REDACTED \
  -F "type=html" \
  -F "content=<h1>Quarterly Report</h1><p>Summary content.</p>" \
  -F "filename=quarterly-report.docx"
```

### Response fields

The response body contains the fields below for successful JSON responses. For binary endpoints, the success response is returned as binary content and JSON is used for error responses.

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `dataStatus` | `object` | Yes | Response metadata returned by the API response. |
| `dataStatus.requestParameter` | `string` | Yes | Normalized request parameters echoed by the service. Sensitive credentials are omitted when available. |
| `dataStatus.statusCode` | `integer` | Yes | Application-level status code returned by the API response. |
| `dataStatus.statusDescription` | `string` | Yes | Application-level status message returned by the API response. |
| `dataStatus.responseDateTime` | `string` | Yes | Response timestamp returned by the API response. |
| `dataStatus.dataTotalCount` | `integer` | Yes | Total number of records that match the request. |
| `data` | `object` | Yes | Primary response payload returned by the endpoint. |
| `data.wordPath` | `string` | Yes | Download URL of the generated Word document. |

### Response example

```json
{
  "dataStatus": {
    "statusCode": 200,
    "statusDescription": "successfully",
    "responseDateTime": "2026-04-17T00:00:00Z",
    "dataTotalCount": 1,
    "requestParameter": ""
  },
  "data": {
    "wordPath": "https://cdn.example.com/quarterly-report.docx"
  }
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

- Choose `type=html` for raw HTML and `type=url` when the service should fetch a webpage URL.
- Validate HTML size and source URL access before sending the request.
- Keep server-side retries conservative for `429`, `500`, and `503` responses.
- Log the HTTP status code and `dataStatus.statusDescription` together for easier debugging.
- Use the demo endpoint for a quick connectivity check, then switch to the authenticated endpoint for production data.

### FAQ

#### Where is the official API detail page?

The official detail page is [https://gugudata.io/details/html2word](https://gugudata.io/details/html2word). It is the best place to review the latest public endpoint information before publishing or integrating.

#### Should I handle `dataStatus.statusCode` as the HTTP status code?

No. Use the HTTP status code for request-level behavior such as authentication, permission, rate limiting, and server errors. Use `dataStatus.statusCode` only as the response body status field when it is present.

#### Can I use the demo endpoint in production?

No. The demo endpoint is for quick testing and examples. Use the authenticated endpoint with your `appkey` for production workflows.

### Related GuGuData APIs

- [HTML/URL to PDF](https://gugudata.io/details/html2pdf)
- [Convert Word to HTML](https://gugudata.io/details/word2html)
- [Convert PPT to Images](https://gugudata.io/details/ppt2images)

For more developer APIs, visit [GuGuData](https://gugudata.io/).
