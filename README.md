# Task Management App

This is a full-stack task management application built with React, Redux Toolkit, Tailwind CSS on the frontend and Node.js, Express, and MongoDB on the backend.  It allows users to manage their tasks efficiently, including creating, updating, deleting, filtering, sorting, and viewing statistics on task completion progress.

## Features

* **User Authentication:** Secure user registration and login with JWT (JSON Web Tokens).
* **Task Management:**
    * Create tasks with title, start time, end time, priority (1-5), and status (pending/finished).
    * Update task details, including marking tasks as complete and adjusting the end time.
    * Delete tasks.
    * Filter tasks by priority and status.
    * Sort tasks by start and end time.
* **Dashboard with Statistics:**
    * Total task count.
    * Percentage of completed and pending tasks.
    * Time lapsed and remaining estimated time for pending tasks, broken down by priority.
    * Overall average completion time.
* **Protected Routes:**  Ensures only authenticated users can access task management features.
* **Redux Toolkit for State Management:**  Manages application state efficiently and predictably.


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
* JWT (jsonwebtoken)
* bcryptjs
* cookie-parser
* cors
* dotenv

## Installation and Setup

- `git clone https://github.com/Satyam2192/Task-Management.git`

**Backend:**
1. Navigate to the `server` directory: `cd server`
2. Install dependencies: `npm install`
3. Create a `.env` file in the `server` directory and add the following environment variables, replacing placeholders with your actual values:
    ```
    MONGODB_URL=<your_mongodb_connection_string>
    JWT_SECRET=<your_jwt_secret_key>
    PORT=<your_port_number> 
    ```
4. Start the server: `npm start`

**Frontend:**

1. Navigate to the `client` directory: `cd client`
2. Install dependencies: `npm install`
3. Start the development server: `npm start`

## Usage

1. Register a new account or log in with existing credentials.
2. Navigate to the dashboard to view task statistics.
3. Use the "Task List" page to manage your tasks.
4. Create new tasks using the "Add Task" page.
5. Update existing tasks by clicking the "Edit" button on the task list.

