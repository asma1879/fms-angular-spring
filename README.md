# Freelancing Management System (Angular + Spring Boot + MySQL)

A freelancing management platform built with Angular for the frontend, Spring Boot (JDK, Hibernate) for the backend, and MySQL for data storage.

## 🚀 Features

- User registration & login (Client / Freelancer / Admin)
- Post & manage jobs
- Browse jobs
- Place bids
- Manage job deliveries
- Payments
- Dashboard with charts
- Review and rating system

## 🛠️ Tech Stack


- Frontend: Angular, Bootstrap
- Backend: Spring Boot, Hibernate
- Database: MySQL 8

## 📂 Project Structure

Frontend (Angular):

```
freelancing-management-system
├── .angular                 # Angular CLI cache/config
├── node_modules             # Installed npm packages
├── server                   # Backend server config (optional)
├── src                      # Angular source code (components, modules)
├── .browserslistrc          # Browser support configuration
├── .editorconfig            # Editor configuration
├── angular.json             # Angular workspace configuration
├── karma.conf.js            # Karma test configuration
├── package.json             # npm dependencies and scripts
├── package-lock.json        # Exact npm versions
├── README.md                # Project documentation
├── tsconfig.app.json        # TypeScript config for app
├── tsconfig.json            # TypeScript base config
└── tsconfig.spec.json       # TypeScript config for tests
```
Backend (Spring Boot):
```
freelance_spring_boot
├── .mvn                     # Maven wrapper files
├── .settings                # IDE-specific settings (Eclipse)
├── src
│   ├── main
│   │   ├── java             # Java source files
│   │   └── resources        # Configuration and static resources
│   └── test                 # Test code
├── target                   # Compiled classes and build output
├── uploads                  # Directory for file uploads
├── .classpath               # Eclipse classpath configuration
├── .gitignore               # Git ignore rules
├── .project                 # Eclipse project file
├── HELP.md                  # Help documentation
├── mvnw                     # Maven wrapper (Unix)
├── mvnw.cmd                 # Maven wrapper (Windows)
└── pom.xml                  # Maven project configuration
```
## ⚙️ How to Run

1. Backend (Spring Boot)
- Open the Spring Boot backend folder (`freelance_spring_boot`) in Eclipse or IntelliJ.
- Run with Maven:
```bash
  mvn spring-boot:run
  ```

2. Frontend (Angular)
- Open `freelancing-management-system` in Visual Studio Code.
- Install dependencies and run:
  npm install
  ng serve

3. Access the application
- Frontend → http://localhost:4200
- Backend → http://localhost:8080

### Screenshots

 Landing page with login modal:

 

<img width="1361" height="690" alt="login" src="https://github.com/user-attachments/assets/585855dd-1045-45cd-b822-11a1f6a8b205" />

Dashboard(Role:Freelancer):
<img width="1365" height="689" alt="Freelancers_Dashboard" src="https://github.com/user-attachments/assets/ba8e6421-d40b-417e-926b-a69a0da92a4a" />

