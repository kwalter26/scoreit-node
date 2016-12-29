#!/bin/bash
#build the image    
docker build -t kwalter/scoreit-node:latest .
#push the image to repo    
docker push kwalter/scoreit-node:latest
