# Project Coding Rules

## Rules

1. Do not call database directly from components.
2. API routes must not contain business logic.
3. Business logic must be in services folder.
4. All APIs must have error handling.
5. Protected APIs must check authentication.
6. Use environment variables for secrets.
7. Use loading and error state.
8. Use reusable components.
9. Follow folder structure.
10. Write clean code.

## Service Layer Flow

Component → API Route → Service → Database

Never:
Component → Database

## Git Commit Convention

feat: add interview chat
fix: fix login bug
refactor: refactor interview service
style: update UI
docs: update documentation
