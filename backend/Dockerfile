FROM openjdk:17-jdk-slim

WORKDIR /app

COPY . /app

RUN chmod +x mvnw

RUN ./mvnw clean package -DskipTests

CMD ["java", "-jar", "target/*.jar"]
