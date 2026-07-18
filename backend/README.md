# UBER 2.0 Backend API Documentation

## Overview

This document describes the backend API for the UBER 2.0 app.

## Base URL

```text
http://localhost:5000
```

## Authentication

Some endpoints require a JWT token.

- Register and login return a token.
- Send the token in the `Authorization` header:

```http
Authorization: Bearer <JWT_TOKEN>
```

You can also use a cookie named `token` for authenticated requests.

---

## Endpoint Summary

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| POST | `/users/register` | No | Create a new user account |
| POST | `/users/login` | No | Authenticate a user |
| GET | `/users/profile` | Yes | Get the logged-in user's profile |
| GET | `/users/logout` | Yes | Log out the current user |
| POST | `/rides/get-fare` | Yes | Estimate fare for a trip |

---

## 1. Register User

### Endpoint

```http
POST /users/register
```

### Description

Creates a new user account and returns a JWT token.

### Request Structure

#### Headers

```http
Content-Type: application/json
```

#### Body

```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john@example.com",
  "password": "password123"
}
```

#### Validation Rules

| Field | Required | Rules |
|-------|----------|-------|
| `fullname.firstname` | Yes | Minimum 3 characters |
| `fullname.lastname` | No | Minimum 3 characters if provided |
| `email` | Yes | Valid email format |
| `password` | Yes | Minimum 6 characters |

### Response Structure

#### Success Response

```json
{
  "user": {
    "_id": "ObjectId",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john@example.com",
    "socketId": null,
    "createdAt": "2026-06-06T10:30:00Z",
    "updatedAt": "2026-06-06T10:30:00Z"
  },
  "token": "JWT_TOKEN"
}
```

#### Example Request

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

## 2. Login User

### Endpoint

```http
POST /users/login
```

### Description

Authenticates a user and returns a JWT token.

### Request Structure

#### Headers

```http
Content-Type: application/json
```

#### Body

```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

### Response Structure

#### Success Response

```json
{
  "token": "JWT_TOKEN",
  "user": {
    "_id": "ObjectId",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john@example.com"
  }
}
```

#### Example Request

```bash
curl -X POST http://localhost:5000/users/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

---

## 3. Get User Profile

### Endpoint

```http
GET /users/profile
```

### Description

Returns the authenticated user's profile.

### Request Structure

#### Headers

```http
Authorization: Bearer <JWT_TOKEN>
```

### Response Structure

#### Success Response

```json
{
  "user": {
    "_id": "ObjectId",
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

#### Example Request

```bash
curl -X GET http://localhost:5000/users/profile \
  -H "Authorization: Bearer <JWT_TOKEN>"
```

---

## 4. Logout User

### Endpoint

```http
GET /users/logout
```

### Description

Logs out the current authenticated user.

### Request Structure

#### Headers

```http
Authorization: Bearer <JWT_TOKEN>
```

### Response Structure

#### Success Response

```json
{
  "message": "Logged out successfully"
}
```

#### Example Request

```bash
curl -X GET http://localhost:5000/users/logout \
  -H "Authorization: Bearer <JWT_TOKEN>"
```

---

## 5. Get Fare Estimate

### Endpoint

```http
POST /rides/get-fare
```

### Description

Estimates fares for a trip based on pickup and destination.

### Request Structure

#### Headers

```http
Authorization: Bearer <JWT_TOKEN>
Content-Type: application/json
```

#### Body

```json
{
  "pickup": "Hyderabad",
  "destination": "Secunderabad"
}
```

#### Validation Rules

| Field | Required | Rules |
|-------|----------|-------|
| `pickup` | Yes | Minimum 2 characters, maximum 100 |
| `destination` | Yes | Minimum 2 characters, maximum 100 |

### Response Structure

#### Success Response

```json
{
  "auto": 123,
  "car": 176,
  "moto": 92
}
```

#### Example Request

```bash
curl -X POST http://localhost:5000/rides/get-fare \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <JWT_TOKEN>" \
  -d '{
    "pickup": "Hyderabad",
    "destination": "Secunderabad"
  }'
```

---

## Notes

- Passwords are hashed before storage.
- JWT tokens are required for protected routes.
- Logout invalidates the current token.
