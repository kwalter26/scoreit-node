#!/bin/bash
#build the image    
docker build .
#push the image to repo    
docker push kwalter26/scoreit-node
