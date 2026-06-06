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

## Notes

- Passwords are automatically hashed using bcrypt before storage
- The returned JWT token can be used for subsequent authenticated requests
- Email addresses should be unique in the system (validation not shown in current code but recommended)
