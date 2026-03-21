FROM eclipse-temurin:17-jdk-jdkFROM eclipse-temurin:17-jdk

WORKDIR /app

COPY backend /app

RUN chmod +x mvnw

RUN ./mvnw clean package -DskipTests

CMD sh -c "java -jar target/*.jar"

WORKDIR /app

COPY . /app

RUN chmod +x mvnw

RUN ./mvnw clean package -DskipTests

CMD ["java", "-jar", "target/*.jar"]
