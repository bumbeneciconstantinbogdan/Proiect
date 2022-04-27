#!/bin/bash
cd discovery-service
gradle clean
gradle build
docker build -t discovery-service:1.0 .
cd ../gateway-service
gradle clean
gradle build
docker build -t api-gateway-service:1.0 .
cd ../plant-simulation-service
gradle clean
gradle build
docker build -t plant-simulation-service:1.0 .
cd ..
docker rmi $(docker images -f 'dangling=true' -q)