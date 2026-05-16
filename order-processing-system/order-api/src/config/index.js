require('dotenv').config();

const config = {
    mongoUri: process.env.MONGO_URI || 'mongodb://localhost:27017/order_db?replicaSet=rs0',
    rabbitmqUri: process.env.RABBITMQ_URI || 'amqp://localhost:5672',
    nodeEnv: process.env.NODE_ENV || 'development',
    otelExporterOtlpEndpoint: process.env.OTEL_EXPORTER_OTLP_ENDPOINT || 'http://localhost:4317',
    otelServiceName: process.env.OTEL_SERVICE_NAME || 'order-api',
    queueName: process.env.QUEUE_NAME || 'order_queue',
    port: process.env.PORT || 3000,
}

module.exports = config;