# Employee Management System

A full-stack Employee Management System built using **Spring Boot, Spring Security, JWT, MySQL, and React.js**.

The project provides secure authentication and role-based employee management through a REST API and a responsive React frontend.

---

## 🚀 Features

### Authentication & Security

- User registration
- User login
- JWT-based authentication
- Password encryption using BCrypt
- Stateless authentication
- Role-based authorization
- Protected REST APIs
- CORS configuration

### Employee Management

- Create employee
- View all employees
- View employee by ID
- Update employee
- Delete employee
- Employee validation
- Global exception handling

### Frontend

- React.js
- React Router
- Login page
- Registration page
- Protected dashboard
- Responsive UI
- Employee cards
- Add employee form
- Edit employee
- Delete employee
- Logout functionality
- JWT token handling using LocalStorage

---

## 🛠️ Technologies Used

### Backend

- Java
- Spring Boot
- Spring Security
- Spring Data JPA
- Hibernate
- JWT
- Maven
- Jakarta Validation

### Database

- MySQL

### Frontend

- React.js
- JavaScript
- HTML
- CSS
- Axios
- React Router
- Vite

### Tools

- IntelliJ IDEA
- Visual Studio Code
- Postman
- Git
- GitHub

---

## 📂 Project Structure

```text
employee-management-system/
│
├── employee-backend/
│   │
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/
│   │   │   │   └── com/example/employee/
│   │   │   │       ├── config/
│   │   │   │       ├── controller/
│   │   │   │       ├── dto/
│   │   │   │       ├── entity/
│   │   │   │       ├── exception/
│   │   │   │       ├── repository/
│   │   │   │       └── service/
│   │   │   │
│   │   │   └── resources/
│   │   │
│   │   └── test/
│   │
│   ├── pom.xml
│   └── mvnw.cmd
│
├── employee-frontend/
│   │
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── package.json
│   └── vite.config.js
│
└── README.md










🔐 Authentication Flow

The application uses JWT authentication.

User
  │
  ▼
React Login Page
  │
  ▼
POST /api/auth/login
  │
  ▼
Spring Security
  │
  ▼
Authentication
  │
  ▼
JWT Token
  │
  ▼
React LocalStorage
  │
  ▼
Protected API Requests
  │
  ▼
JWT Authentication Filter
  │
  ▼
Employee APIs




User
  │
  ▼
React Login Page
  │
  ▼
POST /api/auth/login
  │
  ▼
Spring Security
  │
  ▼
Authentication
  │
  ▼
JWT Token
  │
  ▼
React LocalStorage
  │
  ▼
Protected API Requests
  │
  ▼
JWT Authentication Filter
  │
  ▼
Employee 



👥 Roles

The application supports role-based access.

ADMIN

Admin users can:

View employees
Add employees
Update employees
Delete employees
USER

Normal users can:

Login
View employees
Logout

Employee modification operations are restricted to administrators.

🔗 API Endpoints
Authentication
Register
POST /api/auth/register

Example request:

{
  "username": "testuser",
  "password": "Test@123"
}
Login
POST /api/auth/login

Example request:

{
  "username": "testuser",
  "password": "Test@123"
}

Response:

{
  "token": "JWT_TOKEN",
  "username": "testuser",
  "role": "USER"
}
Employee APIs

All employee APIs require JWT authentication.

Get all employees
GET /api/employees
Get employee by ID
GET /api/employees/{id}
Create employee
POST /api/employees

Example:

{
  "firstName": "Rahul",
  "lastName": "Kumar",
  "email": "rahul@gmail.com",
  "department": "IT",
  "salary": 50000
}
Update employee
PUT /api/employees/{id}
Delete employee
DELETE /api/employees/{id}


⚙️ Backend Setup
1. Clone the repository
git clone <https://github.com/Bhargav9945325466/employee-management-system>
cd employee-management-system
2. Configure MySQL

Create the database:

CREATE DATABASE employee_management;

Configure your local database credentials in:

employee-backend/src/main/resources/application.properties

Example:

spring.application.name=employee-backend


server.port=8081


spring.datasource.url=jdbc:mysql://localhost:3306/employee_management
spring.datasource.username=root
spring.datasource.password=YOUR_PASSWORD


spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.format_sql=true

application.properties is intentionally excluded from GitHub because it contains local database credentials.





3. Run the backend

Navigate to:

cd employee-backend

Run:

.\mvnw.cmd spring-boot:run

Backend will run on:

http://localhost:8081
💻 Frontend Setup

Navigate to:

cd employee-frontend

Install dependencies:

npm install

Start the frontend:

npm run dev

Frontend will run on:

http://localhost:5173
🧪 Testing

The REST APIs were tested using Postman.

Tested functionality includes:

User registration
User login
JWT token generation
JWT-protected employee APIs
Get employees
Create employee
Update employee
Delete employee

The frontend was also tested with the running Spring Boot backend.

📱 Frontend Pages
Login

Users can securely login using their username and password.

Register

New users can create an account.

Dashboard

The dashboard displays employees and provides role-based functionality.

Responsive UI

The frontend is designed to work across desktop and mobile screen sizes.

🔒 Security

The project implements:

JWT authentication
BCrypt password hashing
Stateless sessions
Protected REST endpoints
Role-based authorization
CORS configuration
Request validation
Global exception handling

Sensitive configuration files are excluded from version control.