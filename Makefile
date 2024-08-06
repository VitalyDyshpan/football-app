ifneq (,$(wildcard ./.env))
    include .env
    export
endif

all: help

help:
	@echo "help                  # this help"
	@echo "build                 # build prod images"
	@echo "start                 # build and start prod images"
	@echo "stop                  # stop and remove prod containers"
	@echo "prune                 # clear all unusable data (prune unusable containers, images amd volumes)"
	@echo "================================================================================================"

setup-network:
	docker network inspect appnet || docker network create appnet

setup-docker:
	apt update && apt install docker.io -y
	curl -fsSL https://get.docker.com | sh
	curl -L "https://github.com/docker/compose/releases/download/v2.23.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
	chmod +x /usr/local/bin/docker-compose
	docker -v && docker-compose -v

setup:
	[ -f .env ] || cp -f .env.example .env

start: setup setup-network
	docker-compose -f docker-compose.local.yml up -d

stop:
	docker-compose -f docker-compose.local.yml down

prune:
	docker system prune -af
	docker volume prune -af
#	docker system df

