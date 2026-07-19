# HimWrite AI - Auth API Collection

This document outlines the Authentication APIs available in the HimWrite AI backend. These endpoints handle user registration, login, profile management, and Google OAuth.

**Base URL**: `http://localhost:5000/api/auth`

---

## 1. Register User

Register a new user account using an email and password.

- **URL**: `/register`
- **Method**: `POST`
- **Auth Required**: No

### Request Body (JSON)
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword123"
}
```

### Success Response (201 Created)
```json
{
  "_id": "60d0fe4f5311236168a109ca",
  "name": "John Doe",
  "email": "john@example.com",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Error Responses
- **400 Bad Request**: Validation failed (e.g., missing fields, weak password).
- **400 Bad Request**: `User already exists`

---

## 2. Login User

Authenticate an existing user and receive a JWT token.

- **URL**: `/login`
- **Method**: `POST`
- **Auth Required**: No
- **Rate Limit**: Max 5 attempts per 15 minutes per IP.

### Request Body (JSON)
```json
{
  "email": "john@example.com",
  "password": "securepassword123"
}
```

### Success Response (200 OK)
```json
{
  "_id": "60d0fe4f5311236168a109ca",
  "name": "John Doe",
  "email": "john@example.com",
  "profileImage": "...",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Error Responses
- **401 Unauthorized**: `Invalid credentials`
- **429 Too Many Requests**: `Too many login attempts, please try again after 15 minutes`

---

## 3. Get User Profile

Fetch the profile data of the currently authenticated user.

- **URL**: `/profile`
- **Method**: `GET`
- **Auth Required**: Yes (Bearer Token)

### Headers
```
Authorization: Bearer <your_jwt_token>
```

### Success Response (200 OK)
```json
{
  "_id": "60d0fe4f5311236168a109ca",
  "name": "John Doe",
  "email": "john@example.com",
  "profileImage": "..."
}
```

### Error Responses
- **401 Unauthorized**: `Not authorized, token failed` or `Not authorized, no token`

---

## 4. Logout User

Logs out the user. (Currently handled entirely on the client by destroying the JWT, but this endpoint exists for future-proofing or session termination).

- **URL**: `/logout`
- **Method**: `POST`
- **Auth Required**: Yes (Bearer Token)

### Headers
```
Authorization: Bearer <your_jwt_token>
```

### Success Response (200 OK)
```json
{
  "message": "Logged out successfully"
}
```

---

## 5. Google OAuth - Initiate

Initiates the Google OAuth 2.0 flow. Redirects the user to Google's consent screen.

- **URL**: `/google`
- **Method**: `GET`
- **Auth Required**: No

*(Note: Navigate to this route directly via the browser, do not use AJAX/fetch for this).*

---

## 6. Google OAuth - Callback

Handles the response from Google after user grants consent.

- **URL**: `/google/callback`
- **Method**: `GET`
- **Auth Required**: No

### Behavior
- On success, the backend redirects the user to `http://localhost:5173/dashboard?token=<JWT_TOKEN>`
- The frontend extracts the token from the URL and securely logs the user in.
- On failure, redirects to `/login`.
