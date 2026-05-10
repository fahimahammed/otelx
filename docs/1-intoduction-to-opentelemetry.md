# Intro to OpenTelemetry

OpenTelemetry helps you understand what happens inside your app. It records traces, spans, and logs so you can see how a request moves through your system.

## What is tracing?

Tracing means following a request from start to finish. It is useful when one request goes through many services, like an API, database, or cache.

With tracing, you can:

- See the full path of a request
- Find slow parts of the app
- Spot errors faster
- Understand how services work together

## What is a span?

A span is one small step in a request. You can think of it as one task or one operation.

A span usually has:

- A name for the operation
- Start and end time
- A unique span ID
- A parent span ID if it belongs to another span
- Attributes like HTTP method or database query
- Events that describe important moments
- A status such as success or error

## What is a trace?

A trace is a group of spans. It shows the full story of one request.

Example:

Client -> API -> Service -> Database

The trace may contain spans like:

- GET /api/users
- Fetch user details
- SELECT * FROM users

