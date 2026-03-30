# Database Design (MongoDB)

## Collections

### Users

Store user information.

Fields:

- \_id
- name
- email
- password
- avatar
- createdAt
- updatedAt

---

### Interviews

Each interview session.

Fields:

- \_id
- userId
- position
- level
- score
- startedAt
- finishedAt
- createdAt

---

### Messages

Chat messages between AI and user.

Fields:

- \_id
- interviewId
- role (ai | user)
- content
- createdAt

---

### Questions

Interview questions and answers.

Fields:

- \_id
- interviewId
- question
- answer
- feedback
- score

---

### Reports

AI overall feedback after interview.

Fields:

- \_id
- interviewId
- strengths
- weaknesses
- suggestions
- overallFeedback
- createdAt

---

## Relationships

```
User → Interviews → Messages
                   → Questions
                   → Reports
```
