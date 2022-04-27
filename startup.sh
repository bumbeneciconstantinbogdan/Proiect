#!/bin/bash
docker-compose -f 'db/docker-compose.yaml' up -d
sleep 5
docker-compose -f 'discovery-service/docker-compose.yaml' up -d
sleep 5
docker-compose -f 'gateway-service/docker-compose.yaml' up -d
sleep 5
docker-compose -f 'plant-simulation-service/docker-compose.yaml' up -d
docker-compose -f 'extra-plant-simulation/docker-compose.yaml' up -d
