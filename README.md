# ISEC - FrontEnd

## Prerequisites

* Docker Engine 18.06.0 or above
* Docker Compose 1.22.0 or above

## Getting Started

1. Build instances (First time)

    docker-compose build

2a. Start up

    docker-compose up

2b. Start up without logs

    docker-compose up -d

## Useful commands

Knowing the container ID (container_id)

    docker-compose ps -q frontend

Ssh into container

    docker exec -ti container_id /bin/bash

Print logs:

    docker logs container_id

## Managing the lifecycle

### Restarting

Without any data loss, you can safely restart the cluster with

    docker-compose restart

or by CTRL+C and then

    docker-compose up

### Stopping

You can stop the Docker instance with

    docker-compose stop

or remove the container completely with

    docker-compose down

### Removing and Cleaning up

You can clean up the system by running

    docker system prune --volumes

which will remove all unused things

### Restarting from scratch

Rebuild and restart with fresh data :

    docker-compose stop
    docker-compose rm -f
    docker volume prune
    docker-compose build
    docker-compose up
