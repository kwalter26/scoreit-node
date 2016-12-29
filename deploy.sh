#!/bin/bash
#build the image    
docker build -t kwalter26/scoreit-node:latest .
#push the image to repo    
docker push kwalter26/scoreit-node:latest
