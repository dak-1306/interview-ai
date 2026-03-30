# Project Structure

## Folder Structure

```
src/
    app/
        (auth)/
            login/
            register/
        dashboard/
        interview/
            start/
            chat/
            result/
        history/
        profile/
        api/
            auth/
            interview/
            ai/
            user/
    components/
        ui/
        forms/
        chat/
        dashboard/
    services/
    models/
    lib/
    store/
    hooks/
    types/
    utils/
    constants/
    styles/
```

## Folder Description

```
| Folder     | Description              |
| ---------- | ------------------------ |
| app        | Pages and API routes     |
| components | Reusable UI components   |
| services   | Business logic           |
| models     | MongoDB models           |
| lib        | Database, auth, AI setup |
| store      | Zustand state            |
| hooks      | Custom hooks             |
| types      | TypeScript interfaces    |
| utils      | Helper functions         |
| constants  | Constants                |
| styles     | Global styles            |
```

## Architecture Flow

```
Frontend → API Routes → Services → Database
                                → AI API
```
