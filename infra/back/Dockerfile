# syntax=docker/dockerfile:1.3
FROM ubuntu:jammy

LABEL maintainer="igorkso"

WORKDIR /app

RUN apt-get update && \
    apt-get install -y openjdk-17-jdk maven git

RUN mkdir -p /root/.ssh && \
    ssh-keyscan github.com >> /root/.ssh/known_hosts

RUN --mount=type=ssh git clone git@github.com:LucenaDanilo/profia.git 

WORKDIR /app/profia/api

RUN mvn clean package

ENTRYPOINT ["mvn", "spring-boot:run"]  
