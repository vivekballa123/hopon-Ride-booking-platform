# UBER 2.0 Backend - Captain Routes API Documentation

## Overview

Captain routes handle authentication and registration for drivers (captains) in the UBER 2.0 application. Captains can register with their vehicle information, login, view their profile, and logout with token blacklisting.

---

## Endpoints

### 1. Captain Registration Endpoint

#### POST `/captains/register`

**Description:**
This endpoint allows new captains (drivers) to register an account with their vehicle information. It validates the provided information, hashes the password, and returns an authentication token upon successful registration.

---

## Request Details

### Method
`POST`

### URL
```
/captains/register
```

### Content-Type
```
application/json
```

---

## Request Body

```json
{
  "fullname": {
    "firstname": "string",        // Required: min 3 characters
    "lastname": "string"          // Optional: min 3 characters if provided
  },
  "email": "string",              // Required: valid email format, must be unique
  "password": "string",           // Required: min 6 characters (will be hashed)
  "vehicle": {
    "color": "string",            // Required: min 3 characters
    "plate": "string",            // Required: min 3 characters, must be unique
    "capacity": "number",         // Required: min 1 (integer)
    "vehicleType": "string"       // Required: one of ['car', 'motorcycle', 'auto', 'scooter']
  }
}
```

### Example Request Body

```json
{
  "fullname": {
    "firstname": "Rajesh",
    "lastname": "Kumar"
  },
  "email": "rajesh.kumar@example.com",
  "password": "securepassword123",
  "vehicle": {
    "color": "white",
    "plate": "DL-01-AB-1234",
    "capacity": 4,
    "vehicleType": "car"
  }
}
```

---

## Success Response (201 Created)

```json
{
  "message": "Captain registered successfully",
  "captain": {
    "_id": "ObjectId",                      // Auto-generated unique identifier
    "fullname": {
      "firstname": "string",                // Captain's first name (min 3 chars)
      "lastname": "string"                  // Captain's last name (optional, min 3 chars)
    },
    "email": "string",                      // Lowercased email address
    "status": "inactive",                   // Default status: 'inactive' | 'active' | 'offline'
    "socketId": null,                       // WebSocket ID (null until online)
    "vehicle": {
      "color": "string",                    // Vehicle color
      "plate": "string",                    // Unique vehicle plate number
      "capacity": "number",                 // Passenger capacity
      "vehicleType": "string"               // Type: car | motorcycle | auto | scooter
    },
    "location": {
      "latitude": null,                     // Null until location is updated
      "longitude": null                     // Null until location is updated
    },
    "createdAt": "ISO 8601 timestamp",      // Account creation time
    "updatedAt": "ISO 8601 timestamp"       // Last update time
  },
  "token": "string"                         // JWT token (expires in 1 hour)
}
```

### Example Success Response

```json
{
  "message": "Captain registered successfully",
  "captain": {
    "_id": "507f1f77bcf86cd799439012",
    "fullname": {
      "firstname": "Rajesh",
      "lastname": "Kumar"
    },
    "email": "rajesh.kumar@example.com",
    "status": "inactive",
    "socketId": null,
    "vehicle": {
      "color": "white",
      "plate": "DL-01-AB-1234",
      "capacity": 4,
      "vehicleType": "car"
    },
    "location": {
      "latitude": null,
      "longitude": null
    },
    "createdAt": "2026-06-11T10:30:00Z",
    "updatedAt": "2026-06-11T10:30:00Z"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1MDdmMWY3N2JjZjg2Y2Q3OTk0MzkwMTIifQ.abc..."
}
```

## Error Responses

### Validation Error (400 Bad Request)

```json
{
  "errors": [
    {
      "type": "field",                     // Error type
      "value": "invalid_value",            // The value that failed validation
      "msg": "string",                     // Error message
      "path": "field_name",                // Which field has the error
      "location": "body"                   // Location in the request
    }
  ]
}
```

### Example Validation Error Response

```json
{
  "errors": [
    {
      "type": "field",
      "value": "ra",
      "msg": "First name is required",
      "path": "fullname.firstname",
      "location": "body"
    }
  ]
}
```

### Captain Already Exists Error (400 Bad Request)

```json
{
  "message": "Captain with this email already exists"  // Email already registered
}
```

## Error Scenarios

| Scenario | Status Code | Error Message |
|----------|-------------|---------------|
| First name < 3 characters | `400` | `First name is required` |
| Invalid email format | `400` | `Valid email is required` |
| Email already exists | `400` | `Captain with this email already exists` |
| Password < 6 characters | `400` | `Password must be at least 6 characters long` |
| Vehicle color < 3 characters | `400` | `Vehicle color is required` |
| Vehicle plate < 3 characters | `400` | `Vehicle plate is required` |
| Vehicle capacity < 1 | `400` | `Vehicle capacity must be at least 1` |
| Invalid vehicle type | `400` | `Vehicle type must be one of car, motorcycle, auto, scooter` |

---

## 2. Captain Login Endpoint

#### POST `/captains/login`

**Description:**
This endpoint authenticates a captain by verifying their email and password. Upon successful authentication, it returns a JWT token and captain information that can be used for subsequent authenticated requests.

### Request Details

- **Method:** `POST`
- **URL:** `/captains/login`
- **Content-Type:** `application/json`

### Request Body

```json
{
  "email": "string",              // Required: valid email format
  "password": "string"            // Required: min 6 characters
}
```

### Example Request Body

```json
{
  "email": "rajesh.kumar@example.com",
  "password": "securepassword123"
}
```

## Success Response (200 OK)

```json
{
  "message": "Login successful",
  "captain": {
    "_id": "ObjectId",                      // Unique identifier
    "fullname": {
      "firstname": "string",
      "lastname": "string"
    },
    "email": "string",
    "status": "string",                     // Current status: 'inactive' | 'active' | 'offline'
    "socketId": "string or null",           // WebSocket ID if online
    "vehicle": {
      "color": "string",
      "plate": "string",
      "capacity": "number",
      "vehicleType": "string"
    },
    "location": {
      "latitude": "number or null",
      "longitude": "number or null"
    },
    "createdAt": "ISO 8601 timestamp",
    "updatedAt": "ISO 8601 timestamp"
  },
  "token": "string"                         // JWT token (expires in 1 hour)
}
```

### Example Success Response

```json
{
  "message": "Login successful",
  "captain": {
    "_id": "507f1f77bcf86cd799439012",
    "fullname": {
      "firstname": "Rajesh",
      "lastname": "Kumar"
    },
    "email": "rajesh.kumar@example.com",
    "status": "inactive",
    "socketId": null,
    "vehicle": {
      "color": "white",
      "plate": "DL-01-AB-1234",
      "capacity": 4,
      "vehicleType": "car"
    },
    "location": {
      "latitude": null,
      "longitude": null
    },
    "createdAt": "2026-06-11T10:30:00Z",
    "updatedAt": "2026-06-11T10:30:00Z"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1MDdmMWY3N2JjZjg2Y2Q3OTk0MzkwMTIifQ.xyz..."
}
```

## Error Responses

### Validation Error (400 Bad Request)

```json
{
  "errors": [
    {
      "type": "field",
      "value": "invalid_value",
      "msg": "string",                     // Validation error message
      "path": "field_name",
      "location": "body"
    }
  ]
}
```

### Authentication Error (400 Bad Request)

```json
{
  "message": "Invalid email or password"   // Generic error for security
}
```

## Login Error Scenarios

| Scenario | Status Code | Error Message |
|----------|-------------|---------------|
| Invalid email format | `400` | `Valid email is required` |
| Password < 6 characters | `400` | `Password must be at least 6 characters long` |
| Email not found | `400` | `Invalid email or password` |
| Password incorrect | `400` | `Invalid email or password....` |

---

## 3. Captain Profile Endpoint

#### GET `/captains/profile`

**Description:**
This endpoint retrieves the authenticated captain's profile information. Requires a valid JWT token for authentication.

### Request Details

- **Method:** `GET`
- **URL:** `/captains/profile`
- **Authentication:** **Required** - Bearer Token or Cookie

**Authentication Methods:**
- **Authorization Header:** `Authorization: Bearer <JWT_TOKEN>`
- **Cookie:** `token=<JWT_TOKEN>`

### Request Example

```bash
curl -X GET http://localhost:5000/captains/profile \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

## Success Response (200 OK)

```json
{
  "captain": {
    "_id": "ObjectId",                      // Unique identifier
    "fullname": {
      "firstname": "string",
      "lastname": "string"
    },
    "email": "string",
    "status": "string",                     // Current status: 'inactive' | 'active' | 'offline'
    "socketId": "string or null",
    "vehicle": {
      "color": "string",
      "plate": "string",
      "capacity": "number",
      "vehicleType": "string"
    },
    "location": {
      "latitude": "number or null",
      "longitude": "number or null"
    },
    "createdAt": "ISO 8601 timestamp",
    "updatedAt": "ISO 8601 timestamp"
  }
}
```

### Example Success Response

```json
{
  "captain": {
    "_id": "507f1f77bcf86cd799439012",
    "fullname": {
      "firstname": "Rajesh",
      "lastname": "Kumar"
    },
    "email": "rajesh.kumar@example.com",
    "status": "inactive",
    "socketId": null,
    "vehicle": {
      "color": "white",
      "plate": "DL-01-AB-1234",
      "capacity": 4,
      "vehicleType": "car"
    },
    "location": {
      "latitude": null,
      "longitude": null
    },
    "createdAt": "2026-06-11T10:30:00Z",
    "updatedAt": "2026-06-11T10:30:00Z"
  }
}
```

## Error Response

### Unauthorized (401)

```json
{
  "error": "Unauthorized"                  // Missing or invalid token
}
```

---

## 4. Captain Logout Endpoint

#### GET `/captains/logout`

**Description:**
This endpoint logs out the authenticated captain by clearing the authentication token, adding it to a blacklist to prevent further use, and clearing cookies. Requires a valid JWT token for authentication.

### Request Details

- **Method:** `GET`
- **URL:** `/captains/logout`
- **Authentication:** **Required** - Bearer Token or Cookie

**Authentication Methods:**
- **Authorization Header:** `Authorization: Bearer <JWT_TOKEN>`
- **Cookie:** `token=<JWT_TOKEN>`

### Request Example

```bash
curl -X GET http://localhost:5000/captains/logout \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

## Success Response (200 OK)

```json
{
  "message": "Logged out successfully"     // Token blacklisted, cookie cleared
}
```

## Error Response

### Unauthorized (401)

```json
{
  "error": "Unauthorized"                  // Missing or invalid token
}
```

### Logout Error Scenarios

| Scenario | Status Code | Error Message |
|----------|-------------|---------------|
| Missing token | `401` | `Unauthorized` |
| Invalid token | `401` | `Unauthorized` |
| Token already blacklisted | `401` | `Unauthorized` |

---

## General Notes

- **Password Security:** Passwords are automatically hashed using bcrypt (salt rounds: 10) before storage
- **JWT Tokens:** All tokens expire after 1 hour from generation
- **Email Uniqueness:** Email addresses must be unique in the system
- **Vehicle Plate Uniqueness:** Vehicle plate numbers must be unique
- **Password Privacy:** Passwords are never returned in responses (excluded with `select: false` and `.select("-password")`)
- **Email Format:** Email addresses are stored in lowercase for consistency
- **Default Status:** New captains have status `inactive` by default
- **Default Location:** Captain location is `null` until explicitly updated
- **Token Blacklisting:** Logout tokens are added to a blacklist to prevent reuse after logout
- **Cookie Management:** Login sets a cookie named `token`; logout clears the cookie

---

## Captain Model Schema

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `_id` | ObjectId | auto-generated | Unique identifier |
| `fullname.firstname` | String | required | First name (min 3 chars) |
| `fullname.lastname` | String | optional | Last name (min 3 chars if provided) |
| `email` | String | required | Unique, lowercase email address |
| `password` | String | required | Hashed password (min 6 chars, hidden by default) |
| `status` | String | `inactive` | Status: `active` \| `inactive` \| `offline` |
| `socketId` | String | `null` | WebSocket connection ID |
| `vehicle.color` | String | required | Vehicle color (min 3 chars) |
| `vehicle.plate` | String | required | Unique vehicle plate (min 3 chars) |
| `vehicle.capacity` | Number | required | Passenger capacity (min 1) |
| `vehicle.vehicleType` | String | required | Type: `car` \| `motorcycle` \| `auto` \| `scooter` |
| `location.latitude` | Number | `null` | Current latitude coordinate |
| `location.longitude` | Number | `null` | Current longitude coordinate |
| `createdAt` | Timestamp | auto-generated | Account creation timestamp |
| `updatedAt` | Timestamp | auto-generated | Last update timestamp |

---

## Authentication Middleware

Endpoints requiring authentication (`/profile`, `/logout`) use `authCaptainMiddleware` which validates:
- JWT token from Authorization header or cookies
- Ensures token is not blacklisted
- Attaches captain data to `req.captain`

---

## Best Practices & Recommendations

### For Production Deployment

1. **Rate Limiting:**
   - Limit registrations per IP address to prevent abuse
   - Implement exponential backoff for login failures
   - Add CAPTCHA verification for multiple failed attempts

2. **Security:**
   - Use HTTPS/TLS for all endpoints
   - Implement CORS policies appropriately
   - Add request body size limits
   - Validate file uploads if vehicle photos are added later

3. **Monitoring & Logging:**
   - Log all registration and login attempts
   - Monitor for unusual patterns (multiple registrations from same IP)
   - Track token expiration and refresh patterns

4. **Data Validation:**
   - Validate vehicle plate format per country/region
   - Implement email verification for new registrations
   - Add phone number verification for captains

5. **Token Management:**
   - Consider token refresh mechanisms for long sessions
   - Implement token rotation strategies
   - Clear expired tokens from blacklist periodically

---

## cURL Examples

### Register a Captain
```bash
curl -X POST http://localhost:5000/captains/register \
  -H "Content-Type: application/json" \
  -d '{
    "fullname": {"firstname": "Rajesh", "lastname": "Kumar"},
    "email": "rajesh@example.com",
    "password": "password123",
    "vehicle": {
      "color": "white",
      "plate": "DL-01-AB-1234",
      "capacity": 4,
      "vehicleType": "car"
    }
  }'
```

### Login as Captain
```bash
curl -X POST http://localhost:5000/captains/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "rajesh@example.com",
    "password": "password123"
  }'
```

### Get Captain Profile
```bash
curl -X GET http://localhost:5000/captains/profile \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### Logout Captain
```bash
curl -X GET http://localhost:5000/captains/logout \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```
