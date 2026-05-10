<p align="center">
  <img src="./image.png" alt="OpenTelemetry learning banner" width="100%" />
</p>

<h1 align="center">OpenTelemetry Learning Lab</h1>

<p align="center">
  <a href="https://opentelemetry.io/"><img alt="OpenTelemetry" src="https://img.shields.io/badge/OpenTelemetry-Observability-blueviolet"></a>
  <a href="https://nodejs.org/"><img alt="Node.js" src="https://img.shields.io/badge/Node.js-18%2B-339933?logo=node.js&logoColor=white"></a>
  <a href="./user-service/docker-compose.yml"><img alt="Docker" src="https://img.shields.io/badge/Docker-Ready-2496ED?logo=docker&logoColor=white"></a>
  <img alt="Status" src="https://img.shields.io/badge/Status-Learning%20Project-success">
  <img alt="License" src="https://img.shields.io/badge/License-MIT-yellow">
</p>

A hands-on repository to learn **OpenTelemetry** with practical examples: manual/automatic instrumentation, Tempo integration, and a sample user-service setup.

---

## Table of Contents

- [Overview](#overview)
- [Repository Structure](#repository-structure)
- [Prerequisites](#prerequisites)
- [Quick Start](#quick-start)
- [Projects](#projects)
  - [1) Docs](#1-docs)
  - [2) Automatic Instrumentation](#2-automatic-instrumentation)
  - [3) Grafana Tempo Demo](#3-grafana-tempo-demo)
  - [4) User Service](#4-user-service)
- [Learning Path](#learning-path)
- [Contributing](#contributing)
- [License](#license)

---

## Overview

This repo is focused on learning OpenTelemetry end-to-end:
- Generating traces from Node.js apps
- Auto and manual instrumentation patterns
- Exporting telemetry and visualizing traces with Tempo/Grafana
- Running service + observability stack locally with Docker

## Repository Structure

```text
.
├── docs/
├── Automatic-Instrumentation/
├── grafana-tempo/
├── user-service/
├── image.png
└── README.md
```

## Prerequisites

- Node.js 18+
- npm
- Docker & Docker Compose
- Basic understanding of APIs/services

## Quick Start

```bash
# clone
git clone <your-repo-url>
cd open-telemetry

# pick any module and run it
cd Automatic-Instrumentation
npm install
npm start
```

## Projects

### 1) Docs
- Intro notes: [`docs/1-intoduction-to-opentelemetry.md`](./docs/1-intoduction-to-opentelemetry.md)

### 2) Automatic Instrumentation
- Folder: [`Automatic-Instrumentation`](./Automatic-Instrumentation)
- Includes examples for auto instrumentation and logging traces.
- Start point: [`Automatic-Instrumentation/README.md`](./Automatic-Instrumentation/README.md)

### 3) Grafana Tempo Demo
- Folder: [`grafana-tempo`](./grafana-tempo)
- Contains Docker + Tempo configuration and tracing example.
- Main files:
  - [`grafana-tempo/docker-compose.yaml`](./grafana-tempo/docker-compose.yaml)
  - [`grafana-tempo/readme.md`](./grafana-tempo/readme.md)

### 4) User Service
- Folder: [`user-service`](./user-service)
- A sample service with OpenTelemetry setup and containerization.
- Start point: [`user-service/README.md`](./user-service/README.md)

## Learning Path

1. Read the intro docs
2. Run `Automatic-Instrumentation` examples
3. Bring up `grafana-tempo` stack
4. Run `user-service` and inspect traces

## Contributing

PRs and improvements are welcome—especially around:
- Better instrumentation examples
- Additional exporters/backends
- Clearer tutorials and diagrams

## License

MIT (update this section if your project uses a different license).
