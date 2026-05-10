# Automatic Instrumentation with OpenTelemetry

This directory contains examples demonstrating automatic instrumentation in Node.js using OpenTelemetry. Automatic instrumentation allows you to capture telemetry data (traces, metrics, logs) from your application without modifying the application code.

## Overview

OpenTelemetry's auto-instrumentation for Node.js automatically instruments popular libraries and frameworks, capturing:
- **HTTP requests** - Incoming and outgoing HTTP calls
- **Express routes** - Request/response handling
- **File system operations** - File reads/writes
- **Database operations** - MongoDB, PostgreSQL, MySQL, etc.
- **gRPC & GraphQL** - Remote procedure calls
- **And many more...**

## Examples

### 1. `basic-otel.js`

Basic auto-instrumentation using `ConsoleSpanExporter` for development/debugging. Spans are printed directly to the console.

```bash
node basic-otel.js
```

### 2. `app.js`

Auto-instrumentation with Jaeger exporter for tracing visualization. Sends traces to a Jaeger backend.

```bash
node app.js
```

### 3. `fileotel.js`

Custom file-based exporter that writes traces to a log file (`traces_fileotel.log`). Useful when you don't have a backend configured.

```bash
node fileotel.js
```

## Quick Start

### Prerequisites

- Node.js (v20+)
- npm or yarn

### Installation

Run the setup command to install all dependencies:

```bash
chmod +x command.sh
./command.sh
```

Or manually install:

```bash
npm install express \
  @opentelemetry/sdk-node \
  @opentelemetry/auto-instrumentations-node \
  @opentelemetry/sdk-trace-base \
  @opentelemetry/exporter-jaeger \
  @opentelemetry/exporter-trace-otlp-http
```

### Running with Jaeger

1. Start Jaeger container:

```bash
docker run -d \
  --name jaeger \
  -e COLLECTOR_OTLP_ENABLED=true \
  -p 16686:16686 \
  -p 14268:14268 \
  jaegertracing/all-in-one:latest
```

2. Start the application:

```bash
node app.js
```

3. Open Jaeger UI at http://localhost:16686

## How It Works

### SDK Setup

```javascript
const { NodeSDK } = require("@opentelemetry/sdk-node");
const { getNodeAutoInstrumentations } = require("@opentelemetry/auto-instrumentations-node");
const { JaegerExporter } = require("@opentelemetry/exporter-jaeger");

const sdk = new NodeSDK({
  traceExporter: new JaegerExporter({
    endpoint: "http://localhost:14268/api/traces",
  }),
  instrumentations: [getNodeAutoInstrumentations()],
});

sdk.start();
```

### Key Components

| Component | Purpose |
|-----------|---------|
| `NodeSDK` | Main SDK for initializing OpenTelemetry |
| `getNodeAutoInstrumentations()` | Returns all available auto-instrumentations |
| `JaegerExporter` | Exports traces to Jaeger backend |
| `ConsoleSpanExporter` | Prints spans to console (debugging) |
| `SimpleSpanProcessor` | Processes spans before export |

### Custom Exporter

You can create custom exporters for any output:

```javascript
function createFileExporter(fileName = "traces.log") {
  return {
    export(spans, resultCallback) {
      const data = spans.map((span) => JSON.stringify({
        traceId: span.spanContext().traceId,
        spanId: span.spanContext().spanId,
        name: span.name,
        attributes: span.attributes,
      }));
      
      fs.appendFileSync(fileName, data.join("\n") + "\n");
      resultCallback({ code: 0 });
    },
    shutdown() {
      return Promise.resolve();
    },
  };
}
```

## Auto-Instrumented Libraries

The `@opentelemetry/auto-instrumentations-node` package automatically instruments:

- **HTTP Client/Server** - Native http/https modules
- **Express** - Web framework routing
- **MongoDB** - Database driver
- **Redis** - Key-value store
- **gRPC** - Remote procedure calls
- **MySQL/PostgreSQL** - Database clients
- **GraphQL** - Query language
- **and more...**

## Configuration Options

### Disable Specific Instrumentations

```javascript
const sdk = new NodeSDK({
  instrumentations: [
    getNodeAutoInstrumentations({
      "@opentelemetry/instrumentation-http": { enabled: false },
      "@opentelemetry/instrumentation-express": { enabled: false },
    }),
  ],
});
```

### Resource Attributes

```javascript
const { NodeSDK } = require("@opentelemetry/sdk-node");
const { Resource } = require("@opentelemetry/resources");

const sdk = new NodeSDK({
  resource: new Resource({
    "service.name": "my-service",
    "service.version": "1.0.0",
  }),
});
```

## Graceful Shutdown

Always handle shutdown properly to ensure spans are exported:

```javascript
process.on("SIGTERM", async () => {
  await sdk.shutdown();
  console.log("OpenTelemetry terminated");
  process.exit(0);
});
```