# UBER 2.0 Backend - Captain Routes API Documentation

## Overview

Captain routes handle authentication and registration for drivers (captains) in the UBER 2.0 application. Captains can register with their vehicle information and access authentication tokens for subsequent requests.

---

## Endpoints

### Captain Registration Endpoint

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

The endpoint requires the following JSON data in the request body:

```json
{
  "fullname": {
    "firstname": "string (required)",
    "lastname": "string (optional)"
  },
  "email": "string (required)",
  "password": "string (required)",
  "vehicle": {
    "color": "string (required)",
    "plate": "string (required)",
    "capacity": "number (required)",
    "vehicleType": "string (required)"
  }
}
```

### Field Validations

| Field | Type | Required | Validation Rules | Description |
|-------|------|----------|-------------------|-------------|
| `fullname.firstname` | String | ✅ Yes | Minimum 3 characters | Captain's first name |
| `fullname.lastname` | String | ❌ No | Minimum 3 characters | Captain's last name |
| `email` | String | ✅ Yes | Valid email format, Unique | Captain's email address |
| `password` | String | ✅ Yes | Minimum 6 characters | Captain's password (will be hashed) |
| `vehicle.color` | String | ✅ Yes | Minimum 3 characters | Vehicle color |
| `vehicle.plate` | String | ✅ Yes | Minimum 3 characters, Unique | Vehicle license plate number |
| `vehicle.capacity` | Number | ✅ Yes | Minimum 1 | Number of passengers the vehicle can accommodate |
| `vehicle.vehicleType` | String | ✅ Yes | One of: `car`, `motorcycle`, `auto`, `scooter` | Type of vehicle |

---

## Response Codes

### Success Response

**Status Code:** `201 Created`

**Response Body:**
```json
{
  "message": "Captain registered successfully",
  "captain": {
    "_id": "ObjectId",
    "fullname": {
      "firstname": "string",
      "lastname": "string"
    },
    "email": "string",
    "status": "inactive",
    "socketId": null,
    "vehicle": {
      "color": "string",
      "plate": "string",
      "capacity": "number",
      "vehicleType": "string"
    },
    "location": {
      "latitude": null,
      "longitude": null
    },
    "createdAt": "ISO 8601 timestamp",
    "updatedAt": "ISO 8601 timestamp"
  },
  "token": "JWT_TOKEN_STRING"
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

### Error Response - Captain Already Exists

**Status Code:** `400 Bad Request`

**Response Body:**
```json
{
  "message": "Captain with this email already exists"
}
```

---

## Error Scenarios

| Scenario | Status Code | Error Message |
|----------|-------------|---------------|
| Missing or invalid firstname | `400` | `First name is required` |
| Invalid email format | `400` | `Valid email is required` |
| Email already exists | `400` | `Captain with this email already exists` |
| Missing or invalid password | `400` | `Password must be at least 6 characters long` |
| Missing or invalid vehicle color | `400` | `Vehicle color is required` |
| Missing or invalid vehicle plate | `400` | `Vehicle plate is required` |
| Invalid vehicle capacity | `400` | `Vehicle capacity must be at least 1` |
| Invalid vehicle type | `400` | `Vehicle type must be one of car, motorcycle, auto, scooter` |

---

## Example Request

```bash
curl -X POST http://localhost:5000/captains/register \
  -H "Content-Type: application/json" \
  -d '{
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
  }'
```

---

## Example Response (Success)

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

---

## Example Response (Error - Validation)

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

---

## Example Response (Error - Email Already Exists)

```json
{
  "message": "Captain with this email already exists"
}
```

---

## Notes

- Passwords are automatically hashed using bcrypt before storage
- The returned JWT token can be used for subsequent authenticated requests
- Email addresses must be unique in the system
- Vehicle plate numbers must be unique
- By default, captain status is set to `inactive` upon registration
- By default, captain socket ID is set to `null` (will be assigned when captain comes online)
- By default, captain location is set to `null` (will be updated when captain starts receiving rides)
- Valid vehicle types are: `car`, `motorcycle`, `auto`, `scooter`
- JWT tokens expire after 1 hour from generation
- Passwords are never returned in responses for security reasons
- Email addresses are stored in lowercase for consistency

---

## Captain Model Schema

The captain model includes the following fields:

| Field | Type | Description | Required |
|-------|------|-------------|----------|
| `_id` | ObjectId | Unique identifier | Yes (auto-generated) |
| `fullname.firstname` | String | First name (min 3 chars) | Yes |
| `fullname.lastname` | String | Last name (min 3 chars) | No |
| `email` | String | Email address (unique, lowercase) | Yes |
| `password` | String | Hashed password (min 6 chars) | Yes |
| `status` | String | Status: `active`, `inactive`, `offline` | No (default: `inactive`) |
| `socketId` | String | WebSocket connection ID | No (default: `null`) |
| `vehicle.color` | String | Vehicle color (min 3 chars) | Yes |
| `vehicle.plate` | String | Vehicle plate number (unique, min 3 chars) | Yes |
| `vehicle.capacity` | Number | Passenger capacity (min 1) | Yes |
| `vehicle.vehicleType` | String | Vehicle type (`car`, `motorcycle`, `auto`, `scooter`) | Yes |
| `location.latitude` | Number | Current latitude coordinate | No |
| `location.longitude` | Number | Current longitude coordinate | No |
| `createdAt` | Timestamp | Account creation timestamp | Yes (auto-generated) |
| `updatedAt` | Timestamp | Last update timestamp | Yes (auto-generated) |

---

## Authentication & Authorization

Currently, the captain registration endpoint is **public** (no authentication required). Future endpoints for captain operations (profile, logout, etc.) will require valid JWT token authentication via:
- **Authorization Header:** `Authorization: Bearer <JWT_TOKEN>`
- **Cookie:** `token=<JWT_TOKEN>`

---

## Rate Limiting Recommendations

For production deployment, consider implementing rate limiting on the registration endpoint to prevent abuse:
- Limit registrations per IP address
- Limit registrations per email address
- Implement CAPTCHA verification for multiple failed attempts
