---
title: "Domain WHOIS Information Lookup API Documentation"
description: "Domain WHOIS Information Lookup API documentation with endpoint details, request parameters, response fields, HTTP status codes, and integration examples for d…"
section: "gugudata-io"
slug: "domain-whois-information-lookup-api"
lang: "en"
status: "published"
tags: ["AI","API","Website Tools APIs","GuGuData.io"]
publishedAt: "2026-04-10T00:00:00.000Z"
updatedAt: "2026-04-10T00:00:00.000Z"
cover: "https://assets.devopen.club/uPic/202608/gugudata-pages/section-gugudata-io-9b5c79b6c485faad.webp"
author: "GuGuData"
---
## Domain WHOIS Information Lookup API: Technical Guide and Integration Notes

The Domain WHOIS Information Lookup API from GuGuData helps developers look up WHOIS registration data for a domain name.

This article is written for developers who want a crawlable, readable reference before integrating the endpoint into a product, data pipeline, internal tool, or technical workflow. The official detail page is [https://gugudata.io/details/whois](https://gugudata.io/details/whois).

### API details

| Item | Value |
| --- | --- |
| API name | Domain WHOIS Information Lookup |
| Category | Website Tools APIs |
| Method | `GET` |
| Endpoint | `https://api.gugudata.io/v1/websitetools/whois` |
| Content type | `query parameters` |
| Demo endpoint | [https://api.gugudata.io/v1/websitetools/whois/demo](https://api.gugudata.io/v1/websitetools/whois/demo) |
| Detail page | [https://gugudata.io/details/whois](https://gugudata.io/details/whois) |
| OpenAPI JSON | [https://gugudata.io/assets/openapi/gugudata.openapi.3.1.json](https://gugudata.io/assets/openapi/gugudata.openapi.3.1.json) |

### When to use this API

- Look up domain registration data.
- Support domain research and ownership review workflows.
- Enrich domain intelligence tools.

### Request parameters

This endpoint accepts parameters through the query string. Keep `appkey` out of client-side public code and send it only from trusted server-side environments.

| Parameter | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `appkey` | `string` | Yes | `YOUR_APPKEY` | Application key used for request authentication. Supply the value as a query parameter, form field, or multipart field according to the request content type. |
| `domain` | `string` | Yes | - | Domain name or HTTPS origin to inspect. |

### Example request

```bash
curl -G "https://api.gugudata.io/v1/websitetools/whois" \
  --data-urlencode "appkey=YOUR_APPKEY" \
  --data-urlencode "domain=example.com"
```

### Response fields

The response body contains the fields below for successful JSON responses. For binary endpoints, the success response is returned as binary content and JSON is used for error responses.

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `dataStatus.requestParameter` | `string` | Yes | Normalized request parameters echoed by the service. Sensitive credentials are omitted when available. |
| `dataStatus.statusCode` | `integer` | Yes | Application-level status code returned by the API response. |
| `dataStatus.status` | `string` | Yes | Application-level status enum returned by the API response. |
| `dataStatus.statusDescription` | `string` | Yes | Application-level status message returned by the API response. |
| `dataStatus.responseDateTime` | `string` | Yes | Response timestamp returned by the API response. |
| `dataStatus.dataTotalCount` | `integer` | Yes | Total number of records that match the request. |
| `data.domain_name` | `array<string>` | Yes | Domain name(s) found in WHOIS record |
| `data.registrar` | `string` | Yes | Domain registrar information |
| `data.creation_date` | `array<string>` | Yes | Domain creation date(s) |
| `data.expiration_date` | `array<string>` | Yes | Domain expiration date(s) |
| `data.updated_date` | `array<string>` | Yes | Domain last update date(s) |
| `data.name_servers` | `array<string>` | Yes | Domain nameservers |
| `data.status` | `array<string>` | Yes | Domain status information |
| `data.org` | `string` | No | Organization name |
| `data.country` | `string` | No | Country code |
| `data.emails` | `array<string>` | No | Contact email addresses |
| `data.dnssec` | `string` | No | DNSSEC status |

### Response example

```json
{
  "dataStatus": {
    "statusCode": 200,
    "statusDescription": "successfully",
    "responseDateTime": "2026-04-10T00:00:00Z",
    "dataTotalCount": 1,
    "status": "SUCCESS",
    "requestParameter": ""
  },
  "data": {
    "domain_name": "sample value",
    "registrar": "sample value",
    "creation_date": "sample value",
    "expiration_date": "sample value",
    "updated_date": "sample value"
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

- Validate required parameters before sending the request so `400` responses are easier to diagnose.
- Keep server-side retries conservative for `429`, `500`, and `503` responses.
- Cache stable metadata responses when your use case allows it, especially for lookup and directory endpoints.
- Log the HTTP status code and `dataStatus.statusDescription` together for easier debugging.
- Use the demo endpoint for a quick connectivity check, then switch to the authenticated endpoint for production data.

### FAQ

#### Where is the official API detail page?

The official detail page is [https://gugudata.io/details/whois](https://gugudata.io/details/whois). It is the best place to review the latest public endpoint information before publishing or integrating.

#### Should I handle `dataStatus.statusCode` as the HTTP status code?

No. Use the HTTP status code for request-level behavior such as authentication, permission, rate limiting, and server errors. Use `dataStatus.statusCode` only as the response body status field when it is present.

#### Can I use the demo endpoint in production?

No. The demo endpoint is for quick testing and examples. Use the authenticated endpoint with your `appkey` for production workflows.

### Related GuGuData APIs

- [Webpage Readable Content Extraction](https://gugudata.io/details/readability)
- [Domain SSL Certificate Information Parsing](https://gugudata.io/details/sslcertinfo)
- [Domain DNS Information Query](https://gugudata.io/details/dnslookup)

For more developer APIs, visit [GuGuData](https://gugudata.io/).
