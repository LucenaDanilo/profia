# Usa a imagem do Maven para compilar o projeto
FROM maven:3.8.6-openjdk-17 AS build
WORKDIR /api
COPY . .
RUN mvn clean package -DskipTests

# Usa a imagem do JDK para rodar o projeto
FROM openjdk:17-jdk-slim
WORKDIR /api
COPY --from=build /api/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
