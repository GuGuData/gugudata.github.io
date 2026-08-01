---
title: "Geographic Coordinate System Converter API Documentation"
description: "Geographic Coordinate System Converter API documentation with endpoint details, request parameters, response fields, HTTP status codes, and integration example…"
section: "gugudata-io"
slug: "geographic-coordinate-system-converter-api"
lang: "en"
status: "published"
tags: ["API","Website Tools APIs","GuGuData.io"]
publishedAt: "2026-04-10T00:00:00.000Z"
updatedAt: "2026-04-10T00:00:00.000Z"
author: "GuGuData"
---
## Geographic Coordinate System Converter API: Technical Guide and Integration Notes

The Geographic Coordinate System Converter API from GuGuData helps developers convert geographic coordinates between WGS84, GCJ02, and BD09 between WGS84, GCJ02, and BD09.

This article is written for developers who want a crawlable, readable reference before integrating the endpoint into a product, data pipeline, internal tool, or technical workflow. The official detail page is [https://gugudata.io/details/coordinateconverter](https://gugudata.io/details/coordinateconverter).

### API details

| Item | Value |
| --- | --- |
| API name | Geographic Coordinate System Converter |
| Category | Website Tools APIs |
| Method | `GET` |
| Endpoint | `https://api.gugudata.io/v1/location/coordinateconverter` |
| Content type | `query parameters` |
| Demo endpoint | [https://api.gugudata.io/v1/location/coordinateconverter/demo](https://api.gugudata.io/v1/location/coordinateconverter/demo) |
| Detail page | [https://gugudata.io/details/coordinateconverter](https://gugudata.io/details/coordinateconverter) |
| OpenAPI JSON | [https://gugudata.io/assets/openapi/gugudata.openapi.3.1.json](https://gugudata.io/assets/openapi/gugudata.openapi.3.1.json) |

### When to use this API

- Convert coordinates between common map coordinate systems.
- Normalize geospatial data from different map providers.
- Prepare location data before storage or display.

### Request parameters

This endpoint accepts parameters through the query string. Keep `appkey` out of client-side public code and send it only from trusted server-side environments.

| Parameter | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `appkey` | `string` | Yes | `YOUR_APPKEY` | Application key used for request authentication. Supply the value as a query parameter, form field, or multipart field according to the request content type. |
| `from` | `string` | Yes | - | Source coordinate system. Supported values are `WGS84`, `GCJ02`, and `BD09`. |
| `to` | `string` | Yes | - | Target coordinate system. Supported values are `WGS84`, `GCJ02`, and `BD09`. |
| `value` | `string` | Yes | - | Coordinate pair in `[longitude,latitude]` format, for example `[120.54,32.74]`. |

### Example request

```bash
curl -G "https://api.gugudata.io/v1/location/coordinateconverter" \
  --data-urlencode "appkey=YOUR_APPKEY" \
  --data-urlencode "from=WGS84" \
  --data-urlencode "to=GCJ02" \
  --data-urlencode "value=[120.54,32.74]"
```

### Response fields

The response body contains the fields below for successful JSON responses. For binary endpoints, the success response is returned as binary content and JSON is used for error responses.

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `dataStatus` | `object` | Yes | Response metadata. `dataStatus.statusCode` is a response body status field, not the HTTP status code. |
| `dataStatus.requestParameter` | `string` | Yes | Normalized request parameters echoed by the service. Sensitive credentials are omitted when available. |
| `dataStatus.statusCode` | `integer` | Yes | Response body status field. Successful demo responses currently return `100`. |
| `dataStatus.statusDescription` | `string` | Yes | Response body status message. Successful demo responses currently return a Chinese message. |
| `dataStatus.responseDateTime` | `string` | Yes | Response timestamp returned by the API response. |
| `dataStatus.dataTotalCount` | `integer` | Yes | Total number of records that match the request. |
| `data` | `object` | Yes | Primary response payload returned by the endpoint. |
| `data.coordinateFrom` | `string` | Yes | Source coordinate system (WGS84, GCJ02, or BD09) |
| `data.coordinateTo` | `string` | Yes | Target coordinate system (WGS84, GCJ02, or BD09) |
| `data.coordinateSourceValue` | `string` | Yes | Source coordinate value in format [longitude,latitude] |
| `data.coordinateDestinationValue` | `string` | Yes | Converted coordinate value in format [longitude,latitude] |

### Response example

```json
{
  "dataStatus": {
    "statusCode": 100,
    "statusDescription": "请求成功。",
    "responseDateTime": "2026-04-10T00:00:00Z",
    "dataTotalCount": 1,
    "requestParameter": ""
  },
  "data": {
    "coordinateFrom": "sample value",
    "coordinateTo": "sample value",
    "coordinateSourceValue": "sample value",
    "coordinateDestinationValue": "sample value"
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

The official detail page is [https://gugudata.io/details/coordinateconverter](https://gugudata.io/details/coordinateconverter). It is the best place to review the latest public endpoint information before publishing or integrating.

#### Should I handle `dataStatus.statusCode` as the HTTP status code?

No. Use the HTTP status code for request-level behavior such as authentication, permission, rate limiting, and server errors. Use `dataStatus.statusCode` only as the response body status field when it is present.

#### Can I use the demo endpoint in production?

No. The demo endpoint is for quick testing and examples. Use the authenticated endpoint with your `appkey` for production workflows.

### Related GuGuData APIs

- [Webpage Readable Content Extraction](https://gugudata.io/details/readability)
- [Domain SSL Certificate Information Parsing](https://gugudata.io/details/sslcertinfo)
- [Domain DNS Information Query](https://gugudata.io/details/dnslookup)

For more developer APIs, visit [GuGuData](https://gugudata.io/).
