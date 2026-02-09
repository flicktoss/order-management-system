# Order Management System

Spring Boot-based Order Management System with user authentication, product catalog, and order management.

## Features
- User registration & JWT authentication
- Product CRUD
- Order creation with line items and statuses
- Role-based endpoints (user/admin)
- Redis configuration present for caching/session needs
- SQL data seeding via `src/main/resources/data.sql`

## Tech stack
- Java (Spring Boot)
- Maven (wrapper included)
- H2 / configurable relational DB (via `application.properties`)
- Redis (optional)
- Docker / Docker Compose

## Repository layout (important files)
- `pom.xml` - Maven build
- `docker-compose.yml` - Compose for DB/Redis (if present)
- `src/main/java/...` - application source
- `src/main/resources/application.properties` - default configuration
- `src/main/resources/data.sql` - initial seed data
- `mvnw`, `mvnw.cmd` - Maven wrapper (use `mvnw.cmd` on Windows)

## Prerequisites
- Java 17+ (or configured project JDK)
- Maven (optional when using wrapper)
- Docker (optional for containerized run)
- Redis (optional if you enable it)

## Quick start

### Run locally (Windows)
1. Build:
   - `.\mvnw.cmd clean package`
2. Run:
   - `.\mvnw.cmd spring-boot:run`
   or
   - `java -jar target/*.jar`
Application defaults to port `8080` (see `application.properties`).

### Run locally (Linux / macOS)
1. Build:
   - `./mvnw clean package`
2. Run:
   - `./mvnw spring-boot:run`
   or
   - `java -jar target/*.jar`

### Run with Docker Compose
- `docker compose up --build`
This will bring up services defined in `docker-compose.yml`. Adjust environment variables in the compose file or via `.env`.

## Configuration
Configure runtime values via environment variables or `src/main/resources/application.properties`. Common variables:
- `SPRING_DATASOURCE_URL` (e.g. `jdbc:postgresql://db:5432/orders`)
- `SPRING_DATASOURCE_USERNAME`
- `SPRING_DATASOURCE_PASSWORD`
- `SPRING_PROFILES_ACTIVE`
- `JWT_SECRET` — secret used to sign JWTs
- `REDIS_HOST`, `REDIS_PORT`

Check `src/main/resources/application.properties` for defaults and override as needed.

## Database & Seeding
- Default seed data is in `src/main/resources/data.sql`.
- On first run it inserts sample products, users, roles as configured in the SQL.

## API (common endpoints)
Base path patterns used by controllers:
- `POST /api/auth/register` — register a user
  - JSON: `{"username":"u","password":"p","email":"e@example.com"}`
- `POST /api/auth/login` — login
  - JSON: `{"username":"u","password":"p"}`
  - Response: `{"accessToken":"<jwt>","tokenType":"Bearer", ...}`
- `GET /api/products` — list products
- `GET /api/products/{id}` — get product
- `POST /api/products` — create product (secured, admin)
- `PUT /api/products/{id}` — update product (secured, admin)
- `DELETE /api/products/{id}` — delete product (secured, admin)
- `POST /api/orders` — create order (secured)
- `GET /api/orders/{id}` — view order (secured, owner or admin)

Sample curl (login + use token):
- Login:
  - `curl -X POST http://localhost:8080/api/auth/login -H "Content-Type: application/json" -d "{\"username\":\"user\",\"password\":\"pass\"}"`
- Use token:
  - `curl -H "Authorization: Bearer <token>" http://localhost:8080/api/products`


## Running tests
- Windows: `.\mvnw.cmd test`
- Unix: `./mvnw test`

## Build & package
- `.\mvnw.cmd clean package` (Windows)
- `./mvnw clean package` (Unix)
JAR is generated under `target/`.

## Useful file references
- Main app: `src/main/java/com/project/order_management_system/OrderManagementSystemApplication.java`
- Entities: `src/main/java/com/project/order_management_system/entity`
- Controllers: `src/main/java/com/project/order_management_system/controller`
- Services: `src/main/java/com/project/order_management_system/service`
- Security: `src/main/java/com/project/order_management_system/security`
- Config: `src/main/java/com/project/order_management_system/config`
