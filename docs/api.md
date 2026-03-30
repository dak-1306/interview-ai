# API Design

Base URL:
/api/

## Auth APIs

POST /api/auth/register
POST /api/auth/login
GET /api/auth/me
POST /api/auth/logout

## Interview APIs

POST /api/interview/start
POST /api/interview/answer
POST /api/interview/finish
GET /api/interview/history
GET /api/interview/:id

## AI APIs

POST /api/ai/question
POST /api/ai/feedback
POST /api/ai/report

## User APIs

GET /api/user/profile
PUT /api/user/profile
POST /api/user/avatar

---

## Example Request

POST /api/interview/start

Body:

```json
{
  "position": "Frontend",
  "level": "Intern"
}
```

Response:

```json
{
  "interviewId": "123",
  "firstQuestion": "Explain React hooks."
}
```
