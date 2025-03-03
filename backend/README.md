# Backend API Documentation

## Endpoints

### POST /register
- **Description:** Registers a new user. This endpoint validates the user’s input before creation.
- **Request Body:** 
  - `fullname.firstname` (string, required): First name of the user. Must have at least 3 characters.
  - `fullname.lastname` (string, optional): Last name of the user (if provided, must have at least 3 characters).
  - `email` (string, required): User's email address. Must be a valid email format.
  - `password` (string, required): Password for the new user. Minimum of 6 characters.
- **Response:**
  - **201 Created:** Returns a JSON object with:
    - `token`: A JWT token for authentication.
    - `user`: Object containing user details.
  - **400 Bad Request:** Input validation failed. Returns a JSON object with an `error` message.
  - **500 Internal Server Error:** An unexpected error occurred. Returns a JSON object with an `error` message.
- **Example Request:**
  ```json
  {
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "password": "password123"
  }
  ```
- **Example Response (201 Created):**
  ```json
  {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": 1,
      "fullname": {
        "firstname": "John",
        "lastname": "Doe"
      },
      "email": "john.doe@example.com"
    }
  }
  ```

### POST /users/register
- **Description:** Registers a new user via /users/register. Validates input before user creation.
- **Request Body:**
  - `fullname.firstname` (string, required): First name of the user. Must have at least 3 characters.
  - `fullname.lastname` (string, optional): Last name of the user (if provided, must have at least 3 characters).
  - `email` (string, required): User's email address. Must be a valid email format.
  - `password` (string, required): Password for the new user. Minimum of 6 characters.
- **Response:**
  - **201 Created:** Returns a JSON object with:
    - `token`: A JWT token for authentication.
    - `user`: Object containing user details.
  - **400 Bad Request:** Input validation failed. Returns a JSON object with an `error` message.
  - **500 Internal Server Error:** An unexpected error occurred. Returns a JSON object with an `error` message.

### POST /users/login
- **Description:** Authenticates a user by validating credentials and returns a JWT token.
- **Request Body:**
  - `email` (string, required): User's email address. Must be a valid email.
  - `password` (string, required): User's password. Minimum of 6 characters.
- **Response:**
  - **200 OK:** Returns a JSON object with:
    - `token`: A JWT token for authentication.
    - `user`: Object containing user details.
  - **400 Bad Request:** Input validation failed.
  - **401 Unauthorized:** Invalid email or password.
  - **500 Internal Server Error:** An unexpected error occurred.
  
- **Example Request:**
  ```json
  {
    "email": "john.doe@example.com",
    "password": "password123"
  }
  ```

- **Example Response (200 OK):**
  ```json
  {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": 1,
      "fullname": {
        "firstname": "John",
        "lastname": "Doe"
      },
      "email": "john.doe@example.com"
    }
  }
  ```

### GET /users/profile
- **Description:** Retrieves the authenticated user's profile.
- **Headers/Cookies:** Requires a valid JWT token (in cookies or the `Authorization` header).
- **Response:**
  - **200 OK:** Returns a JSON object containing the user details.
  - **401 Unauthorized:** When token is missing or invalid.
- **Example Response:**
  ```json
  {
    "user": {
      "id": 1,
      "fullname": {
        "firstname": "John",
        "lastname": "Doe"
      },
      "email": "john.doe@example.com"
    }
  }
  ```

### POST /users/logout
- **Description:** Logs out the user by clearing the token and blacklisting it.
- **Headers/Cookies:** The token is retrieved from cookies or the `Authorization` header.
- **Response:**
  - **201 Created:** Confirms successful logout with a message.
  - **401 Unauthorized:** If the token is missing or invalid.
- **Example Response:**
  ```json
  {
    "message": "Logged out"
  }
  ```
