# SampleSync API Documentation

This document provides detailed information about the SampleSync API endpoints and their usage.

## Base URL

```
https://api.samplesync.com
```

## Authentication

All API requests require authentication using a JWT token. Include the token in the `Authorization` header:

```
Authorization: Bearer <token>
```

To obtain a token, use the login or register endpoints.

## Error Handling

The API returns standard HTTP status codes:

- `200 OK`: Request successful
- `201 Created`: Resource created successfully
- `400 Bad Request`: Invalid request parameters
- `401 Unauthorized`: Authentication required or failed
- `403 Forbidden`: Insufficient permissions
- `404 Not Found`: Resource not found
- `500 Internal Server Error`: Server error

Error responses include a JSON object with an error message:

```json
{
  "message": "Error message details"
}
```

## API Endpoints

### Authentication

#### Login

```
POST /auth/login
```

Request body:
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

Response:
```json
{
  "token": "jwt-token",
  "user": {
    "userId": "user123",
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "subscriptionTier": "pro",
    "subscriptionStatus": "active"
  }
}
```

#### Register

```
POST /auth/register
```

Request body:
```json
{
  "email": "user@example.com",
  "password": "password123",
  "firstName": "John",
  "lastName": "Doe"
}
```

Response:
```json
{
  "token": "jwt-token",
  "user": {
    "userId": "user123",
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "subscriptionTier": "free",
    "subscriptionStatus": "inactive"
  }
}
```

#### Get Current User

```
GET /auth/me
```

Response:
```json
{
  "userId": "user123",
  "email": "user@example.com",
  "firstName": "John",
  "lastName": "Doe",
  "subscriptionTier": "pro",
  "subscriptionStatus": "active"
}
```

### Samples

#### Get All Samples

```
GET /samples
```

Query parameters:
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 20)
- `isPublic`: Filter by public status (true/false)

Response:
```json
[
  {
    "sampleId": "sample1",
    "title": "Funk Break 01",
    "artist": "Groove Masters",
    "description": "Classic funk drum break",
    "duration": 180,
    "bpm": 120,
    "key": "C",
    "genre": "Hip Hop",
    "tags": ["funk", "drums", "break"],
    "audioUrl": "https://example.com/samples/funk-break-01.mp3",
    "previewUrl": "https://example.com/samples/funk-break-01-preview.mp3",
    "licenseType": "standard",
    "clearedStatus": "cleared",
    "marketplacePrice": 29.99,
    "isPublic": true
  }
]
```

#### Get Sample by ID

```
GET /samples/:sampleId
```

Response:
```json
{
  "sampleId": "sample1",
  "title": "Funk Break 01",
  "artist": "Groove Masters",
  "description": "Classic funk drum break",
  "duration": 180,
  "bpm": 120,
  "key": "C",
  "genre": "Hip Hop",
  "tags": ["funk", "drums", "break"],
  "audioUrl": "https://example.com/samples/funk-break-01.mp3",
  "previewUrl": "https://example.com/samples/funk-break-01-preview.mp3",
  "licenseType": "standard",
  "clearedStatus": "cleared",
  "marketplacePrice": 29.99,
  "isPublic": true
}
```

#### Search Samples

```
GET /samples/search
```

Query parameters:
- `q`: Search query
- `genre`: Filter by genre
- `bpmMin`: Minimum BPM
- `bpmMax`: Maximum BPM
- `priceMin`: Minimum price
- `priceMax`: Maximum price
- `clearedOnly`: Filter by cleared status (true/false)

Response: Array of sample objects

#### Upload Sample

```
POST /samples/upload
```

Request: Multipart form data with:
- `file`: Audio file
- `sampleData`: JSON string with sample metadata

Response: Sample object

#### Verify Sample

```
POST /samples/verify
```

Request: Multipart form data with:
- `file`: Audio file to verify

Response:
```json
{
  "trackName": "My Track.mp3",
  "detectedSamples": [
    {
      "sampleId": "sample1",
      "title": "Funk Break 01",
      "artist": "Groove Masters",
      "confidence": 95,
      "timestamp": "0:15-0:30",
      "clearedStatus": "cleared",
      "riskLevel": "low"
    }
  ],
  "overallRisk": "medium"
}
```

### Projects

#### Get User Projects

```
GET /projects
```

Response: Array of project objects

#### Get Project by ID

```
GET /projects/:projectId
```

Response: Project object

#### Create Project

```
POST /projects
```

Request body:
```json
{
  "projectName": "Summer Vibes Remix",
  "trackTitle": "Summer Vibes (Remix)",
  "artist": "Demo User",
  "description": "Summer-themed remix",
  "genre": "Electronic",
  "bpm": 128,
  "key": "Am"
}
```

Response: Project object

#### Update Project

```
PUT /projects/:projectId
```

Request body: Project data to update
Response: Updated project object

#### Add Collaborator

```
POST /projects/:projectId/collaborators
```

Request body:
```json
{
  "name": "Collaborator Name",
  "email": "collaborator@example.com",
  "split": 30
}
```

Response: Updated project object

#### Update Collaborator Split

```
PUT /projects/:projectId/collaborators/:collaboratorId
```

Request body:
```json
{
  "split": 40
}
```

Response: Updated project object

### Licenses

#### Get User Licenses

```
GET /licenses
```

Response: Array of license objects

#### Get License by ID

```
GET /licenses/:licenseId
```

Response: License object

#### Create License

```
POST /licenses
```

Request body:
```json
{
  "sampleId": "sample1",
  "projectId": "project1",
  "licenseType": "standard",
  "fee": 29.99,
  "royaltyRate": 15
}
```

Response: License object

#### Complete License Payment

```
POST /licenses/:licenseId/payment
```

Request body:
```json
{
  "paymentMethod": "credit_card",
  "transactionId": "txn_123456789"
}
```

Response: Updated license object

### Concierge Service

#### Get User Requests

```
GET /concierge/requests
```

Response: Array of concierge request objects

#### Create Request

```
POST /concierge/requests
```

Request body:
```json
{
  "sampleArtist": "Classic Soul Band",
  "sampleTitle": "Summer Nights",
  "sampleLink": "https://example.com/song",
  "projectName": "Urban Remix Project",
  "additionalInfo": "Need help clearing this sample for my upcoming release."
}
```

Response: Concierge request object

#### Get Request Messages

```
GET /concierge/requests/:requestId/messages
```

Response: Array of message objects

#### Send Message

```
POST /concierge/requests/:requestId/messages
```

Request body:
```json
{
  "message": "Any updates on my request?"
}
```

Response: Message object

### Royalties

#### Get User Statements

```
GET /royalties/statements
```

Query parameters:
- `period`: Filter by period (e.g., '2023-01')
- `startDate`: Filter by start date
- `endDate`: Filter by end date

Response: Array of royalty statement objects

#### Get Project Statements

```
GET /royalties/projects/:projectId/statements
```

Response: Array of royalty statement objects for the project

#### Get Earnings Summary

```
GET /royalties/summary
```

Query parameters:
- `period`: Filter by period (e.g., '2023-01')
- `startDate`: Filter by start date
- `endDate`: Filter by end date

Response:
```json
{
  "totalEarnings": 5672.25,
  "monthlyEarnings": 892.10,
  "streamCount": 45000,
  "downloadCount": 1200,
  "topPlatforms": [
    {
      "name": "Spotify",
      "earnings": 3245.75,
      "streams": 28000
    },
    {
      "name": "Apple Music",
      "earnings": 1850.50,
      "streams": 15000
    }
  ]
}
```

## Webhooks

SampleSync provides webhooks for real-time notifications about events:

### Webhook Events

- `license.created`: New license created
- `license.payment_completed`: License payment completed
- `project.earnings_updated`: Project earnings updated
- `concierge.request_updated`: Concierge request status updated
- `concierge.message_received`: New message received for concierge request

### Webhook Payload

```json
{
  "event": "license.created",
  "timestamp": "2023-01-15T12:00:00Z",
  "data": {
    // Event-specific data
  }
}
```

## Rate Limiting

API requests are rate-limited to prevent abuse. The current limits are:

- 100 requests per minute per IP address
- 1000 requests per hour per user

When a rate limit is exceeded, the API returns a `429 Too Many Requests` status code.

## Versioning

The API is versioned using URL path versioning. The current version is v1:

```
https://api.samplesync.com/v1/samples
```

## Support

For API support, please contact api-support@samplesync.com.

