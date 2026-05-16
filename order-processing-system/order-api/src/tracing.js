const {diag, DiagConsoleLogger, DiagLogLevel} = require('@opentelemetry/api');
diag.setLogger(new DiagConsoleLogger(), DiagLogLevel.INFO);

const {NodeSDK} = require('@opentelemetry/sdk-node');
const {getNodeAutoInstrumentations} = require('@opentelemetry/auto-instrumentations-node');

const instrumentations = getNodeAutoInstrumentations({
    '@opentelemetry/instrumentation-express': { enabled: true },
    '@opentelemetry/instrumentation-mongodb': { enabled: true },
    '@opentelemetry/instrumentation-amqplib': { enabled: true },
    '@opentelemetry/instrumentation-winston': { enabled: true },
    '@opentelemetry/instrumentation-grpc': { enabled: true },
});

const {OTLPTraceExporter} = require('@opentelemetry/exporter-trace-otlp-grpc');
const config = require('./config/index');

diag.setLogger(new DiagConsoleLogger(), DiagLogLevel.INFO);
console.log('Initializing OpenTelemetry Tracing...', Object.keys(require.cache));

const sdk = new NodeSDK({
    traceExporter: new OTLPTraceExporter({
        url: config.otelExporterOtlpEndpoint || 'http://tempo:4317',
    }),
    instrumentations: [instrumentations],
    serviceName: config.otelServiceName || 'order-api',
});

function initTracing(){
    sdk.start()
    console.log('OpenTelemetry Tracing initialized');
    process.on('SIGTERM', () => {
        sdk.shutdown()
            .then(() => console.log('### Tracing terminated'))
            .catch((error) => console.log('### Error terminating tracing', error))
            .finally(() => process.exit(0));
    });
}

initTracing();

module.exports = {initTracing };