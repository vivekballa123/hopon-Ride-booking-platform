# UBER 2.0 Backend API Documentation

## Endpoints

### User Registration Endpoint

#### POST `/users/register`

**Description:**
This endpoint allows new users to register an account. It validates the provided information, hashes the password, and returns an authentication token upon successful registration.

---

## Request Details

### Method
`POST`

### URL
```
/users/register
```

### Content-Type
```
application/json
```

---

## Request Body

The endpoint requires the following JSON data in the request body:

```json
{
  "fullname": {
    "firstname": "string (required)",
    "lastname": "string (optional)"
  },
  "email": "string (required)",
  "password": "string (required)"
}
```

### Field Validations

| Field | Type | Required | Validation Rules | Description |
|-------|------|----------|-------------------|-------------|
| `fullname.firstname` | String | ✅ Yes | Minimum 3 characters | User's first name |
| `fullname.lastname` | String | ❌ No | Minimum 3 characters | User's last name |
| `email` | String | ✅ Yes | Valid email format | User's email address |
| `password` | String | ✅ Yes | Minimum 6 characters | User's password (will be hashed) |

---

## Response Codes

### Success Response

**Status Code:** `201 Created`

**Response Body:**
```json
{
  "user": {
    "_id": "ObjectId",
    "fullname": {
      "firstname": "string",
      "lastname": "string"
    },
    "email": "string",
    "socketId": "string or null",
    "createdAt": "ISO 8601 timestamp",
    "updatedAt": "ISO 8601 timestamp"
  },
  "token": "JWT_TOKEN_STRING"
}
```

### Error Response

**Status Code:** `400 Bad Request`

**Response Body:**
```json
{
  "errors": [
    {
      "type": "field",
      "value": "invalid_value",
      "msg": "Error message describing the validation failure",
      "path": "field_name",
      "location": "body"
    }
  ]
}
```

---

## Error Scenarios

| Scenario | Status Code | Error Message |
|----------|-------------|---------------|
| Missing or invalid firstname | `400` | `First name must be at least 3 characters long` |
| Invalid email format | `400` | `Valid email is required` |
| Missing or invalid password | `400` | `Password must be at least 6 characters long` |
| Missing required fields | `400` | `All fields are required` |

---

## Example Request

```bash
curl -X POST http://localhost:5000/users/register \
  -H "Content-Type: application/json" \
  -d '{
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john@example.com",
    "password": "password123"
  }'
```

---

## Example Response (Success)

```json
{
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john@example.com",
    "socketId": null,
    "createdAt": "2026-06-06T10:30:00Z",
    "updatedAt": "2026-06-06T10:30:00Z"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1MDdmMWY3N2JjZjg2Y2Q3OTk0MzkwMTEifQ.d4Zv..."
}
```

---

## Example Response (Error)

```json
{
  "errors": [
    {
      "type": "field",
      "value": "jo",
      "msg": "First name must be at least 3 characters long",
      "path": "fullname.firstname",
      "location": "body"
    }
  ]
}
```

---

### User Login Endpoint

#### POST `/users/login`

**Description:**
This endpoint authenticates a user by verifying their email and password. Upon successful authentication, it returns a JWT token that can be used for subsequent authenticated requests.

---

## Login Request Details

### Method
`POST`

### URL
```
/users/login
```

### Content-Type
```
application/json
```

---

## Login Request Body

The endpoint requires the following JSON data in the request body:

```json
{
  "email": "string (required)",
  "password": "string (required)"
}
```

### Field Validations

| Field | Type | Required | Validation Rules | Description |
|-------|------|----------|-------------------|-------------|
| `email` | String | ✅ Yes | Valid email format | User's registered email address |
| `password` | String | ✅ Yes | Minimum 6 characters | User's password |

---

## Login Response Codes

### Success Response

**Status Code:** `200 OK`

**Response Body:**
```json
{
  "token": "JWT_TOKEN_STRING",
  "user": {
    "_id": "ObjectId",
    "fullname": {
      "firstname": "string",
      "lastname": "string"
    },
    "email": "string",
    "socketId": "string or null",
    "createdAt": "ISO 8601 timestamp",
    "updatedAt": "ISO 8601 timestamp"
  }
}
```

### Error Response - Validation Error

**Status Code:** `400 Bad Request`

**Response Body:**
```json
{
  "errors": [
    {
      "type": "field",
      "value": "invalid_value",
      "msg": "Error message describing the validation failure",
      "path": "field_name",
      "location": "body"
    }
  ]
}
```

### Error Response - Authentication Error

**Status Code:** `401 Unauthorized`

**Response Body:**
```json
{
  "error": "Invalid email or password"
}
```

---

## Login Error Scenarios

| Scenario | Status Code | Error Message |
|----------|-------------|---------------|
| Invalid email format | `400` | `Valid email is required` |
| Invalid or missing password | `400` | `Password must be at least 6 characters long` |
| Email not found in database | `401` | `Invalid email or password` |
| Password does not match | `401` | `Invalid email or password` |

---

## Login Example Request

```bash
curl -X POST http://localhost:5000/users/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

---

## Login Example Response (Success)

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1MDdmMWY3N2JjZjg2Y2Q3OTk0MzkwMTEifQ.d4Zv...",
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john@example.com",
    "socketId": null,
    "createdAt": "2026-06-06T10:30:00Z",
    "updatedAt": "2026-06-06T10:30:00Z"
  }
}
```

---

## Login Example Response (Error - Invalid Credentials)

```json
{
  "error": "Invalid email or password"
}
```

---

---

### User Profile Endpoint

#### GET `/users/profile`

**Description:**
This endpoint retrieves the authenticated user's profile information. Requires a valid JWT token for authentication.

---

## Profile Request Details

### Method
`GET`

### URL
```
/users/profile
```

### Authentication
**Required** - Bearer Token or Cookie

The request must include authentication via one of the following:
- **Authorization Header:** `Authorization: Bearer <JWT_TOKEN>`
- **Cookie:** `token=<JWT_TOKEN>`

---

## Profile Response Codes

### Success Response

**Status Code:** `200 OK`

**Response Body:**
```json
{
  "user": {
    "_id": "ObjectId",
    "fullname": {
      "firstname": "string",
      "lastname": "string"
    },
    "email": "string",
    "socketId": "string or null",
    "createdAt": "ISO 8601 timestamp",
    "updatedAt": "ISO 8601 timestamp"
  }
}
```

### Error Response - Unauthorized

**Status Code:** `401 Unauthorized`

**Response Body:**
```json
{
  "error": "Unauthorized - Invalid or missing token"
}
```

---

## Profile Example Request

```bash
curl -X GET http://localhost:5000/users/profile \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1MDdmMWY3N2JjZjg2Y2Q3OTk0MzkwMTEifQ.d4Zv..."
```

---

## Profile Example Response (Success)

```json
{
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john@example.com",
    "socketId": null,
    "createdAt": "2026-06-06T10:30:00Z",
    "updatedAt": "2026-06-06T10:30:00Z"
  }
}
```

---

### User Logout Endpoint

#### GET `/users/logout`

**Description:**
This endpoint logs out the authenticated user by clearing the authentication token and adding it to a blacklist to prevent further use. Requires a valid JWT token for authentication.

---

## Logout Request Details

### Method
`GET`

### URL
```
/users/logout
```

### Authentication
**Required** - Bearer Token or Cookie

The request must include authentication via one of the following:
- **Authorization Header:** `Authorization: Bearer <JWT_TOKEN>`
- **Cookie:** `token=<JWT_TOKEN>`

---

## Logout Response Codes

### Success Response

**Status Code:** `200 OK`

**Response Body:**
```json
{
  "message": "Logged out successfully"
}
```

### Error Response - Unauthorized

**Status Code:** `401 Unauthorized`

**Response Body:**
```json
{
  "error": "Unauthorized - Invalid or missing token"
}
```

---

## Logout Error Scenarios

| Scenario | Status Code | Error Message |
|----------|-------------|---------------|
| Missing or invalid token | `401` | `Unauthorized - Invalid or missing token` |
| Token already blacklisted | `401` | `Unauthorized - Invalid or missing token` |

---

## Logout Example Request

```bash
curl -X GET http://localhost:5000/users/logout \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1MDdmMWY3N2JjZjg2Y2Q3OTk0MzkwMTEifQ.d4Zv..."
```

---

## Logout Example Response (Success)

```json
{
  "message": "Logged out successfully"
}
```

---

## Notes

- Passwords are automatically hashed using bcrypt before storage
- The returned JWT token can be used for subsequent authenticated requests
- Email addresses should be unique in the system (validation not shown in current code but recommended)
- Login returns generic "Invalid email or password" message for security (doesn't reveal if email exists)
- Authenticated endpoints (`/users/profile`, `/users/logout`) require valid JWT token in Authorization header or cookie
- Logout blacklists the token to prevent its reuse after logout
