Here’s the updated README with only the request details for the API section:

---
 
DevStream server

# Real-Time Code Collaboration Backend

This project is the backend for a real-time code collaboration platform where users can collaboratively write, compile, and execute code. The platform provides real-time code synchronization, integrates code execution services like JDoodle, and uses MongoDB and Redis for session management.

## Tech Stack

- **Node.js**: Backend runtime environment.
- **Express.js**: Web framework for building APIs and handling HTTP requests.
- **MongoDB**: Database to store user data, session history, and code files.
- **Redis**: In-memory data store used for caching sessions and handling real-time updates.
- **Socket.io**: WebSocket library for real-time communication between the server and clients.
- **JDoodle API**: Integrated AI for code execution and compilation.

## Setup

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
   ```

4. Start the server:

   ```bash
   npm start
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

  create a new session.

  - Request body:
    ```json
    {
      
    }
    ```
- **POST** `/api/v1/dashboard/join/:id`

  Join a new user in the session.

  - Request body:
    ```json
    {
      
    }
    ```

- **GET** `/api/v1/dashboard/collaborators/:id`

  Get all collaborators in a session.

  - Request body:
    ```json
    {
      
    }
    ```

- **PUT** `/api/v1/dashboard/leave/:id`

  user leave a ongoing session.

  - Request body:
    ```json
    {
      
    }
    ```
- **PUT** `/api/v1/dashboard/updatecode/:id`

  user leave a ongoing session.

  - Request body:
    ```json
    {
       "code":"code"
    }
    ```

- **GET** `/api/v1/dashboard/:id`

  Retrieves the current state of a session.

### User Management

- **GET** `/api/user/:userId`

  Fetch user details.

This gives an overview of all API.

---

## WebSocket Events

### Server-Side Events (Emitted by Server)

1. **Event**: `newuser<DashboardId>`
   - Description: Emitted when a new user joins the dashboard.
   - Example event name: `newuser12345` for a dashboard with the ID `12345`.

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

This gives an overview of all WebSocket events emitted and listened to by the server. You can customize the descriptions or event names further if needed.


---

Feel free to customize it according to your specific project setup!