Here's an updated README that includes the Docker section for your **DevStream** project:

---

# DevStream Server

## Real-Time Code Collaboration Backend

This project is the backend for a real-time code collaboration platform where users can collaboratively write, compile, and execute code. The platform provides real-time code synchronization, integrates code execution services like JDoodle, and uses MongoDB and Redis for session management.

## Tech Stack

- **Node.js**: Backend runtime environment.
- **Express.js**: Web framework for building APIs and handling HTTP requests.
- **MongoDB**: Database to store user data, session history, and code files.
- **Redis**: In-memory data store used for caching sessions and handling real-time updates.
- **Socket.io**: WebSocket library for real-time communication between the server and clients.
- **JDoodle API**: Integrated AI for code execution and compilation.

## Setup

### Local Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/pruthiraj-97/DevStream-server
   cd DevStream-server
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create an `.env` file with the following configuration:

   ```bash
   PORT=4005
   MONGO_URI=your-mongo-uri
   JDOODLE_CLIENT_ID=your-jdoodle-client-id
   JDOODLE_CLIENT_SECRET=your-jdoodle-client-secret
   JWT_SECRET=your-jwt-secret
   REDIS_URL=your-redis-url
   ```

4. Start the server:

   ```bash
   npm start
   ```

### Docker Setup

1. Pull the Docker image:

   ```bash
   docker pull pruthiraj/devstream
   ```

2. Run the Docker container:

   ```bash
   docker run -d -p 4005:4005  pruthiraj/devstream
   ```

3. Ensure your `.env` file is correctly set up with the MongoDB, Redis, JDoodle, and other necessary credentials.

   Example `.env` file:

   ```bash
   PORT=4005
   MONGO_URI=your-mongo-uri
   JDOODLE_CLIENT_ID=your-jdoodle-client-id
   JDOODLE_CLIENT_SECRET=your-jdoodle-client-secret
   JWT_SECRET=your-jwt-secret
   REDIS_URL=your-redis-url
   ```

## API Documentation

### Authentication

- **POST** `/api/v1/auth/register`

  Registers a new user.

  - Request body:
    ```json
    {
      "name": "string",
      "email": "string",
      "password": "string"
    }
    ```

- **POST** `/api/v1/auth/login`

  Logs in a user and returns a JWT.

  - Request body:
    ```json
    {
      "email": "string",
      "password": "string"
    }
    ```

### Code Execution

- **POST** `/api/compile`

  Compiles and executes code using JDoodle API.

  - Request body:
    ```json
    {
      "language": "string",
      "code": "string",
      "input": "string (optional)"
    }
    ```

### Real-Time Collaboration

- **POST** `/api/v1/dashboard/createdashboard`

  Create a new session.

  - Request body:
    ```json
    {}
    ```

- **POST** `/api/v1/dashboard/join/:id`

  Join a new user in the session.

  - Request body:
    ```json
    {}
    ```

- **GET** `/api/v1/dashboard/collaborators/:id`

  Get all collaborators in a session.

  - Request body:
    ```json
    {}
    ```

- **PUT** `/api/v1/dashboard/leave/:id`

  User leaves an ongoing session.

  - Request body:
    ```json
    {}
    ```

- **PUT** `/api/v1/dashboard/updatecode/:id`

  Update code in a session.

  - Request body:
    ```json
    {
      "code": "code"
    }
    ```

- **GET** `/api/v1/dashboard/:id`

  Retrieves the current state of a session.

### User Management

- **GET** `/api/user/:userId`

  Fetch user details.

---

## WebSocket Events

### Server-Side Events (Emitted by Server)

1. **Event**: `newuser<DashboardId>`
   - Description: Emitted when a new user joins the dashboard.
   - Example event name: `newuser12345`.

2. **Event**: `newcode<DashboardId>`
   - Description: Emitted when the code is updated in a specific dashboard.
   - Example event name: `newcode12345`.

3. **Event**: `compilationResult<DashboardId>`
   - Description: Emitted after code compilation to send the result to all users in the dashboard.
   - Example event name: `compilationResult12345`.

4. **Event**: `compilation_start<DashboardId>`
   - Description: Emitted when a user starts compiling code in a specific dashboard.
   - Example event name: `compilation_start12345`.

5. **Event**: `leaveMessage<DashboardId>`
   - Description: Emitted when a collaborator leaves the room/dashboard.
   - Example event name: `leaveMessage12345`.

### Client-Side Events (Listened by Server)

1. **Event**: `join_room`
   - Description: Triggered when a user joins a specific dashboard room.
   - Payload:
     ```json
     {
       "DashboardId": "string",
       "userId": "string"
     }
     ```

2. **Event**: `leave_room`
   - Description: Triggered when a user leaves the dashboard room.
   - Payload:
     ```json
     {
       "dashboardId": "string"
     }
     ```

3. **Event**: `compile_code`
   - Description: Triggered when a user initiates the code compilation in a specific dashboard.
   - Payload:
     ```json
     {
       "dashboardId": "string"
     }
     ```

---

Feel free to customize the descriptions or event names further according to your project setup.

--- 

This README now includes the Docker setup and API documentation. Let me know if you need any further changes!