curl -X POST http://localhost:4318/v1/spans -H "Content-Type: application/json" -d '[
  {
    "traceId": "00000000000000000000000000000000",
    "spanId": "0000000000000000",
    "parentSpanId": "0000000000000000",
    "name": "test",
    "startTime": "2021-01-01T00:00:00Z",
    "endTime": "2021-01-01T00:00:00Z",
    "attributes": {
      "key": "value"
    }
  }
]'