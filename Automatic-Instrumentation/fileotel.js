const fs = require("fs");

const { NodeSDK } = require("@opentelemetry/sdk-node");
const { getNodeAutoInstrumentations } = require("@opentelemetry/auto-instrumentations-node");
const {
  SimpleSpanProcessor,
  ConsoleSpanExporter,
} = require("@opentelemetry/sdk-trace-base");

// Function based exporter
// function createFileExporter(fileName = "traces_fileotel.log") {
//   return {
//     export(spans, resultCallback) {
//       const data = spans
//         .map((span) =>
//           JSON.stringify({
//             traceId: span.spanContext().traceId,
//             spanId: span.spanContext().spanId,
//             name: span.name,
//             attributes: span.attributes,
//             startTime: span.startTime,
//             endTime: span.endTime,
//           })
//         )
//         .join("\n");

//       fs.appendFileSync(fileName, data + "\n");

//       resultCallback({ code: 0 });
//     },

//     shutdown() {
//       return Promise.resolve();
//     },
//   };
// }

function createFileExporter(fileName = "traces_fileotel.log") {
  return {
    export(spans, resultCallback) {
      const formattedSpans = spans.map((span) => {
        return {
          traceId: span.spanContext().traceId,
          spanId: span.spanContext().spanId,
          parentSpanId: span.parentSpanContext?.spanId || null,

          name: span.name,
          kind: span.kind,

          startTime: span.startTime,
          endTime: span.endTime,

          durationNs:
            span.duration?.[0] * 1_000_000_000 + span.duration?.[1],

          status: span.status,

          attributes: span.attributes,

          events: span.events?.map((event) => ({
            name: event.name,
            attributes: event.attributes,
            time: event.time,
          })),

          resource: span.resource?.attributes || {},

          instrumentationScope: span.instrumentationScope || {},

          timestamp: new Date().toISOString(),
        };
      });

      // Pretty JSON format
      fs.appendFileSync(
        fileName,
        JSON.stringify(formattedSpans, null, 2) + "\n"
      );

      resultCallback({ code: 0 });
    },

    shutdown() {
      return Promise.resolve();
    },
  };
}

// OpenTelemetry SDK
const sdk = new NodeSDK({
traceExporter: new ConsoleSpanExporter(),
  spanProcessor: new SimpleSpanProcessor(
    createFileExporter("traces_fileotel.log")
  ),
  instrumentations: [getNodeAutoInstrumentations()],
});

// Start telemetry first
sdk.start();

const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Function based file exporter 🚀",
  });
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});