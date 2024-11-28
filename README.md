# Task Management App

Full-stack task management application with React, Redux Toolkit, and Node.js.

- Live: https://task-management-three-lovat.vercel.app/

## Features

* User Authentication (JWT)
* Task Creation, Update, Delete
* Task Filtering and Sorting
* Dashboard Statistics
* Protected Routes

## Tech Stack

**Frontend:**
* React
* Redux Toolkit
* React Router DOM
* Tailwind CSS

**Backend:**
* Node.js
* Express
* MongoDB
* JWT
* bcryptjs

## Installation

**Backend:**
1. Clone repository
2. Navigate to `server` directory
3. Install dependencies: `npm install`
4. Create `.env` file with:
    ```
    MONGODB_URL=<mongodb_connection_string>
    JWT_SECRET=<jwt_secret_key>
    PORT=<port_number>
    ```
5. Start server: `npm start`

**Frontend:**
1. Navigate to `client` directory
2. Install dependencies: `npm install`
3. Start development server: `npm start`

## Usage

1. Register or login
2. View dashboard statistics
3. Manage tasks (create, update, delete)
4. Filter and sort tasks as needed
