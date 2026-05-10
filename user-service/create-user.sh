#!/usr/bin/env bash
set -euo pipefail

API_URL="${API_URL:-http://localhost:3000/api/users}"
NAME="${1:-Bob}"
EMAIL="${2:-bob@example.com}"

curl -X POST "$API_URL" \
  -H "Content-Type: application/json" \
  -d "{\"name\": \"$NAME\", \"email\": \"$EMAIL\"}"
