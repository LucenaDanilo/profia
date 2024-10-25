
FROM maven:3.8.6-openjdk-17-slim AS build
WORKDIR /api
COPY . .
RUN mvn clean package -DskipTests


FROM openjdk:17-jdk-slim
WORKDIR /api
COPY --from=build /api/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]