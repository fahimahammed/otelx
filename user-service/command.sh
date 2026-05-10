#!/usr/bin/env bash
set -euo pipefail

# Usage:
#   ./command.sh up          # build and start services, then follow logs
#   ./command.sh post        # create a sample user via curl
#   ./command.sh build       # build images without cache
#   ./command.sh cleanup     # stop and remove containers, images, volumes, prune caches

CMD="${1:-up}"

if [ "$CMD" = "up" ]; then
  docker compose up -d --build
  docker compose logs -f
  exit 0
fi

if [ "$CMD" = "build" ]; then
  docker compose build --no-cache
  exit 0
fi

if [ "$CMD" = "post" ]; then
  curl -X POST http://localhost:3000/api/users \
    -H "Content-Type: application/json" \
    -d '{"name": "Bob3", "email": "bob37@example.com"}'
  exit 0
fi

if [ "$CMD" = "cleanup" ]; then
  echo "Stopping and removing compose services (containers, networks)"
  docker compose down --rmi all --volumes --remove-orphans || true

  echo "Pruning unused Docker objects (images, containers, networks, volumes)"
  docker system prune -af --volumes || true

  echo "Pruning build cache"
  docker builder prune -af || true

  echo "Removing project-level temporary folders: node_modules, logs, tmp, .cache"
  rm -rf node_modules logs tmp .cache || true

  echo "Cleanup complete."
  exit 0
fi

echo "Unknown command: $CMD"
echo "Usage: $0 [up|build|post|cleanup]"
exit 2