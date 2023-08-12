# Fast-Delivery-Back

## Introduction

Welcome to the "Fast-Delivery-Back" project documentation. In this guide, we will provide detailed information about the Fast-Delivery backend system, a fast and efficient food delivery service. The purpose of this documentation is to provide a comprehensive overview of the project's backend architecture, design, and operation.

## Architecture and Design

### Backend

The backend system is designed using a microservices-based architecture. Microservices communicate with each other through RESTful APIs, facilitating the scalability and maintenance of the system.

### Design Patterns

- **MVC Pattern(Model-View-Controller):** This pattern is used to separate business logic (Model), presentation (View), and logic control (Controller), which improves the maintainability and scalability of the code.

- **Repository Parttern:** It is used to abstract access to the database and facilitate data management in the system.

### Used Frameworks and Technologies

In the development of the Fast-Delivery backend, the following frameworks and technologies were used:

- Node.js: As the runtime environment for the backend due to its ability to handle asynchronous operations and scalability.
- Express.js: A web application framework from Node.js that simplifies the creation of RESTful APIs and route handling.
- MongoDB: As a NoSQL database to store data related to orders, users, and restaurants.

## Installation

### Step-by-step Instructions

To install and set up the Fast-Delivery backend in your development environment, follow these steps:

1. Clone the Repository:

git clone https://github.com/sheinken88/Fast-Delivery-Back.git

2. Install the Dependencies:

cd Fast-Delivery-Back
npm install

3. Configure Environment Variables:

Create a .env file in the root directory of the project and define the necessary environment variables, such as the database connection and the secret key for JWT.

4. Start the Server:

### Required Dependencies and Versions

Make sure to have Node.js and npm installed on your system before proceeding with the installation. The specific versions may vary, but here we use Node.js v16.20.1 LTS and npm v8.19.4.

### Libraries

- Mongoose: An object modeling library for Node.js that facilitates interaction with the MongoDB database.
- JWT (JSON Web Tokens): Library for user and service authentication and authorization on the platform.
- Bcrypt: Library for encrypting user passwords.
- Nodemailer: Library for sending user account verification emails.
- Multer: Library for handling multimedia files in the system.
- Cloudinary: Cloud service for storing multimedia files.
- Dotenv: Library for managing environment variables in the system.
- Cors: Library for managing CORS in the system.

## Project Structure

Here is a high-level overview of the project structure, and a brief explanation of what each file and folder is responsible for:
```
FAST-DELIVERY-BACK
|
|-- config
| |-- db # Contains configuration for MongoDB connection.
| |-- token # JWT token configuration and utility functions.
|
|-- controllers # Holds the business logic of the application. Controllers interact with models to retrieve data and serve it to the client.
|
| -- interfaces # Holds the interfaces used across the application.
|
|-- middlewares # Holds middleware functions used across the application. This includes authentication, authorization, and error handling middleware.
|
|-- models # Contains all data models used in the application. Each model represents a collection in the MongoDB database.
|
|-- routes # Defines the API endpoints of the application. Routes are linked to controllers which handle the business logic.
|
|-- services # Contains service modules used by controllers to handle business logic. These services can include functions for fetching, updating, or deleting data, and more.
|
|-- .dockerignore # Lists files/directories that Docker should not copy into the container.
|
|-- .env # Contains environment variables. Important: This file should not be checked into version control.
|
|-- .gitignore # Specifies files that Git should ignore.
|
|-- dockerfile # Contains Docker instructions for building a Docker image for the application.
|
|-- index.ts # The main entry point of the application. This file bootstraps the Express application.
|
|-- package-lock.json # Contains the exact version of installed npm dependencies in order to reproduce an identical dependency tree.
|
|-- package.json # Lists the package dependencies for the project. Also includes metadata about the project such as name, description and version.
|
|-- README.md # Provides an overview and documentation for the project.
|
|-- tsconfig.json # Contains the configurations and options for the TypeScript compiler.
```


## Usage and Features

## API Endpoints

## Testing

## Deployment

## Changelog
### Gitflow and SemVer

We follow the Gitflow methodology for version control and SemVer (Semantic Versioning) for versioning. The commit messages follow the following format:

```
<commit_type>: <version_number>
```

Example:

```
git commit -m "fix: user login error (v1.5.2)"
git tag v1.5.2
```

The types of versioning used in this project are:

- MAJOR: v1.0.0
- MINOR: v0.1.0
- PATCH: v0.0.1

The commit types used in this project are:

- feat: Used when adding a new feature or functionality to the project.
- fix: Used when fixing an error or resolving an issue.
- refactor: Applied when making internal code changes without modifying its external behavior. For example, code structure changes for improvement or maintainability.
- docs: Used for changes in documentation, such as updates in code comments, README files, or project documentation.
- style: Used for code style changes, such as formatting adjustments, white spaces, indentation, etc.
- test: Used for changes related to tests, such as adding, modifying, or removing unit or integration tests.
- chore: Used for maintenance or administrative task changes, such as dependency updates, project configuration adjustments, etc.

### GITFLOW (Kebab Case)

We organize branches in the Gitflow format using Kebab Case:

- feature/<description-of-content>
- bugFix/<description-of-content>

Example:

```
feature/user-authentication
bugFix/n
```
