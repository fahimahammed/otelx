#!/usr/bin/env bash
set -euo pipefail

# Simple command helper for order-processing-system
# Usage: ./command.sh [install|start|dev|docker-build|cleanup]

CMD="${1:-install}"

print_help() {
	cat <<'EOF'
Usage: ./command.sh [command]

Commands:
	install       Install Node dependencies used by the project
	start         Start the application (`npm start`)
	dev           Start the dev server with nodemon
	docker-build  Build Docker image (no cache)
	cleanup       Stop and remove containers, images, volumes and prune Docker caches
	help, -h, --help  Show this help message

Examples:
	./command.sh install
	./command.sh start
	./command.sh cleanup
EOF
}

if [[ "${1:-}" =~ ^(-h|--help|help)$ ]]; then
	print_help
	exit 0
fi

if [ "$CMD" = "install" ]; then
	echo "Installing Node dependencies..."
	npm install \
		@opentelemetry/api \
		@opentelemetry/auto-instrumentations-node \
		@opentelemetry/exporter-trace-otlp-grpc \
		@opentelemetry/sdk-node \
		@opentelemetry/winston-transport \
		amqplib \
		dotenv \
		mongoose \
		winston
	echo "Dependencies installed."
	exit 0
fi

if [ "$CMD" = "start" ]; then
	echo "Starting app..."
	npm start
	exit 0
fi

if [ "$CMD" = "dev" ]; then
	echo "Starting dev server (nodemon)..."
	npx nodemon src/server.js
	exit 0
fi

if [ "$CMD" = "docker-build" ]; then
	echo "Building Docker image (no cache)..."
	docker build --no-cache -t order-processing-system:latest .
	exit 0
fi

if [ "$CMD" = "cleanup" ]; then
	echo "Stopping containers and pruning docker..."
	docker compose down --rmi all --volumes --remove-orphans || true
	docker system prune -af --volumes || true
	echo "Cleanup complete."
	exit 0
fi

echo "Unknown command: $CMD"
echo "Usage: $0 [install|start|dev|docker-build|cleanup]"
exit 2

