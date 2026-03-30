# Coding Style Guide

## General Rules

- Use TypeScript
- Use async/await
- Use arrow functions
- Use try/catch for API calls
- Keep functions small
- Use reusable components
- Use service layer
- Do not call database directly from components

## Naming Convention

### Variables

camelCase
example:
userData
interviewScore

### Components

PascalCase
example:
InterviewChat.tsx
DashboardCard.tsx

### Files

camelCase
example:
interviewService.ts
authMiddleware.ts

### Constants

UPPER_CASE
example:
MAX_QUESTIONS

## Component Structure

1. Imports
2. Hooks
3. Functions
4. Return JSX
5. Export
