const { NodeSDK } = require("@opentelemetry/sdk-node");
const { getNodeAutoInstrumentations } = require("@opentelemetry/auto-instrumentations-node");
const { SimpleSpanProcessor } = require("@opentelemetry/sdk-trace-node");
const { JaegerExporter } = require("@opentelemetry/exporter-jaeger");

// OpenTelemetry SDK
const sdk = new NodeSDK({
  traceExporter: new JaegerExporter({
    endpoint: "http://localhost:14268/api/traces",
  }),
  spanProcessor: new SimpleSpanProcessor(new JaegerExporter({
    endpoint: "http://localhost:14268/api/traces",
  })),
  instrumentations: [getNodeAutoInstrumentations()], // Automatically instruments devops fast and popular libraries
});

// Start telemetry
sdk.start();

const express = require("express");

const app = express();

// Simple GET route
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "OpenTelemetry auto instrumentation working 🚀",
  });
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

// Graceful shutdown
process.on("SIGTERM", async () => {
  await sdk.shutdown();
  console.log("OpenTelemetry terminated");
  process.exit(0);
});