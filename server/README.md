# Task Management API Documentation

## Authentication Endpoints

### Register a New User
- **Endpoint:** `POST /api/auth/register`
- **Description:** Register a new user account
- **Request Body:**
  ```json
  {
    "email": "user@example.com",
    "password": "strongpassword"
  }
  ```
- **Success Response:** 
  - **Code:** 201 Created
  - **Content:** `{ "message": "User registered successfully" }`
- **Error Response:** 
  - **Code:** 400 Bad Request
  - **Content:** `{ "message": "User already exists or invalid input" }`

### User Login
- **Endpoint:** `POST /api/auth/login`
- **Description:** Authenticate user and receive JWT token
- **Request Body:**
  ```json
  {
    "email": "user@example.com",
    "password": "strongpassword"
  }
  ```
- **Success Response:** 
  - **Code:** 200 OK
  - **Content:** `{ "token": "jwt_token_here" }`
- **Error Response:** 
  - **Code:** 401 Unauthorized
  - **Content:** `{ "message": "Invalid email or password" }`

## Task Endpoints

### Get Tasks
- **Endpoint:** `GET /api/tasks`
- **Description:** Retrieve tasks for the authenticated user
- **Query Parameters:**
  - `priority` (optional): Filter tasks by priority (number)
  - `status` (optional): Filter tasks by status
- **Headers:** 
  - `Authorization: Bearer <jwt_token>`
- **Success Response:**
  - **Code:** 200 OK
  - **Content:** Array of task objects
- **Error Response:**
  - **Code:** 500 Internal Server Error
  - **Content:** `{ "message": "Failed to fetch tasks" }`

### Add New Task
- **Endpoint:** `POST /api/tasks`
- **Description:** Create a new task for the authenticated user
- **Headers:** 
  - `Authorization: Bearer <jwt_token>`
- **Request Body:**
  ```json
  {
    "title": "Task Title",
    "startTime": "2024-01-01T00:00:00Z",
    "endTime": "2024-01-02T00:00:00Z",
    "priority": 1,
    "status": "pending"
  }
  ```
- **Success Response:** 
  - **Code:** 201 Created
  - **Content:** Created task object
- **Error Response:**
  - **Code:** 400 Bad Request
  - **Content:** 
    - `{ "message": "Task with this title already exists" }`
    - `{ "message": "Invalid input" }`

### Update Task
- **Endpoint:** `PUT /api/tasks/:id`
- **Description:** Update an existing task
- **Headers:** 
  - `Authorization: Bearer <jwt_token>`
- **Request Body:** (partial update supported)
  ```json
  {
    "title": "Updated Task Title",
    "status": "finished"
  }
  ```
- **Success Response:**
  - **Code:** 200 OK
  - **Content:** Updated task object
- **Error Response:**
  - **Code:** 404 Not Found
  - **Content:** `{ "message": "Task not found" }`
  - **Code:** 400 Bad Request
  - **Content:** `{ "message": "Failed to update task" }`

### Delete Task
- **Endpoint:** `DELETE /api/tasks/:id`
- **Description:** Delete a specific task
- **Headers:** 
  - `Authorization: Bearer <jwt_token>`
- **Success Response:**
  - **Code:** 200 OK
  - **Content:** `{ "message": "Task deleted" }`
- **Error Response:**
  - **Code:** 404 Not Found
  - **Content:** `{ "message": "Task not found" }`
  - **Code:** 500 Internal Server Error
  - **Content:** `{ "message": "Failed to delete task" }`

### Get Task Statistics
- **Endpoint:** `GET /api/tasks/statistics`
- **Description:** Retrieve comprehensive task statistics for the authenticated user
- **Headers:** 
  - `Authorization: Bearer <jwt_token>`
- **Success Response:**
  - **Code:** 200 OK
  - **Content:**
    ```json
    {
      "totalTasks": 10,
      "completedTasks": 5,
      "pendingTasks": 5,
      "completedPercentage": 50,
      "pendingPercentage": 50,
      "timeElapsed": 12.5,
      "balanceEstimate": 24.3,
      "averageCompletionTime": 2.5
    }
    ```
- **Error Response:**
  - **Code:** 500 Internal Server Error
  - **Content:** `{ "message": "Failed to fetch statistics" }`


