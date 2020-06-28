#! /bin/bash

# build docker images
cd Server
sh build.sh

# push latest docker image
docker push charlyecastro/cookbook

# export addresses
export NODEADDR="node:80"
export MONGOADDR="mongodemo:27017"
export GOOGLE_CLIENT_ID = "30938520250-3ae6r37hr1cq9hjm4193f8721gcshldg.apps.googleusercontent.com"
export GOOGLE_CLIENT_SECRET = "SnrEaV6s79on7mz6vpCuyQfs"

# pull latest docker image
docker pull charlyecastro/cookbook

# remove old containers & network
docker rm -f cookbook
docker rm -f mongodemo
docker network rm cooknetwork

# create new network
docker network create cooknetwork

# run new containers
docker run -d --name mongodemo --network cooknetwork mongo

docker run -d --name cookbook -p 80:80 -e NODEADDR=$NODEADDR -e MONGOADDR=$MONGOADDR -e GOOGLE_CLIENT_ID=$GOOGLE_CLIENT_ID -e  GOOGLE_CLIENT_SECRET=$GOOGLE_CLIENT_SECRET --network cooknetwork charlyecastro/cookbook