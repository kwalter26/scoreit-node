#!/bin/bash
#build the image    
docker build --no-cache -t kwalter26/scoreit-node .    
#push the image to repo    
docker push kwalter26/scoreit-node
