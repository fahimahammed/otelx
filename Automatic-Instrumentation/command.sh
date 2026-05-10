#!/bin/bash

echo "Installing dependencies..."

npm install express \
@opentelemetry/sdk-node \
@opentelemetry/auto-instrumentations-node \
@opentelemetry/sdk-trace-base \
@opentelemetry/exporter-jaeger \
@opentelemetry/exporter-trace-otlp-http

echo "Starting Jaeger container..."

docker run -d \
  --name jaeger \
  -e COLLECTOR_OTLP_ENABLED=true \
  -p 16686:16686 \
  -p 14268:14268 \
  jaegertracing/all-in-one:latest

echo "Starting application..."

node app.js