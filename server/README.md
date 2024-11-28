# Task Management Application

## Overview
A full-stack task management application that allows users to create, track, and manage their tasks with comprehensive statistics and authentication.

## Features
- User Authentication (Signup/Login)
- Task CRUD Operations
- Task Filtering and Sorting
- Detailed Task Statistics Dashboard
- Secure User-specific Task Management

## Tech Stack
- **Backend:** 
  - Node.js
  - Express.js
  - MongoDB
  - JWT Authentication

## Prerequisites
- Node.js (v14 or later)
- MongoDB
- npm or yarn

## Installation

1. Clone the repository
```bash
git clone <repository-url>
cd task-management-app
```

2. Install backend dependencies
```bash
cd server
npm install
```

3. Configure Environment Variables
Create a `.env` file in the `server` directory with:
```
MONGODB_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=7000
```

4. Start the Server
```bash
npm start
```

## API Endpoints

### Authentication
- `POST /api/auth/signup` - User Registration
- `POST /api/auth/login` - User Login
- `GET /api/auth/signout` - User Logout

### Tasks
- `GET /api/tasks` - Retrieve Tasks
- `POST /api/tasks` - Create Task
- `GET /api/tasks/:id` - Get Specific Task
- `PUT /api/tasks/:id` - Update Task
- `DELETE /api/tasks/:id` - Delete Task
- `GET /api/tasks/statistics` - Get Task Statistics

## Task Model
- Title
- Start Time
- End Time
- Priority (1-5)
- Status (pending/finished)

## Dashboard Statistics
- Total Tasks
- Completed/Pending Task Percentages
- Time Elapsed for Pending Tasks
- Estimated Remaining Time
- Average Completion Time
- Priority-based Task Breakdown
