# Tempo + OpenTelemetry Node.js Example

This project demonstrates distributed tracing with [Grafana Tempo](https://grafana.com/oss/tempo/), [Grafana](https://grafana.com/grafana/), and a Node.js application instrumented with [OpenTelemetry](https://opentelemetry.io/).

## Features

- Node.js app auto-instrumented with OpenTelemetry
- Traces exported to Tempo using OTLP HTTP
- Grafana for trace visualization

---

## Prerequisites

- [Docker](https://www.docker.com/get-started)
- [Node.js](https://nodejs.org/) (v14+ recommended)
- [npm](https://www.npmjs.com/)

---

## Getting Started

### 1. Install Node.js dependencies

```bash
npm install
```

### 2. Start Tempo and Grafana

```bash
docker-compose up -d
```

- Tempo: receives and stores traces
- Grafana: UI for exploring traces

### 3. Start the Node.js app with tracing enabled

```bash
npm start
```

### 4. Generate traces

Visit your app in a browser or use curl:

```bash
curl http://localhost:3030/
```

Each request generates a trace sent to Tempo.

---

## Viewing Traces

1. Open Grafana: [http://localhost:3000](http://localhost:3000)
   - Default login: `admin` / `admin`
2. Add Tempo as a data source (if not already added):
   - URL: `http://tempo:3200`
3. Go to **Explore** → select **Tempo** as the data source
4. Search for traces (e.g., by service name or leave filters empty to see all)

---

## Project Structure

```
.
├── app.js                # Express app
├── tracing.js            # OpenTelemetry setup
├── package.json
├── docker-compose.yaml   # Tempo & Grafana services
├── tempo-config.yaml     # Tempo configuration
└── otel-config.yaml      # (optional) OpenTelemetry Collector config
```

---

## Troubleshooting

- **No traces in Grafana?**
  - Make sure you start the app with `npm start` (not just `node app.js`)
  - Check that all dependencies are installed
  - Check Docker containers are running: `docker ps`
  - Look for errors in the app or Tempo logs

- **Permission errors in Tempo logs?**
  - These usually do not affect trace ingestion for local testing.

---

## License

MIT
