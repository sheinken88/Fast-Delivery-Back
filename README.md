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

## Usage and Features

## API Endpoints

## Testing

## Deployment

## Changelog
