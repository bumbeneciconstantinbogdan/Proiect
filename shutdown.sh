#!/bin/bash
docker-compose -f 'db/docker-compose.yaml' down 
docker-compose -f 'discovery-service/docker-compose.yaml' down
docker-compose -f 'gateway-service/docker-compose.yaml' down
docker-compose -f 'plant-simulation-service/docker-compose.yaml' down
docker-compose -f 'extra-plant-simulation/docker-compose.yaml' down
docker system prune --volumes -f