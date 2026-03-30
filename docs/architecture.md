# System Architecture

## Overview

This project uses Next.js as a fullstack framework.

Next.js handles:

- Frontend UI
- Backend API routes
- Authentication
- AI API calls

MongoDB is used as database.

## Architecture Flow

```
Client (Browser)
        ↓
Next.js Frontend
        ↓
Next.js API Routes
        ↓
Services Layer
        ↓
MongoDB
        ↓
AI API (Gemini/OpenAI)
```

## Layer Architecture

Components → API Routes → Services → Models → Database
