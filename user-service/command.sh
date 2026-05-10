docker-compose up -d && docker-compose logs -f
docker compose build --no-cache

curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Bob3",
    "email": "bob37@example.com"
  }'