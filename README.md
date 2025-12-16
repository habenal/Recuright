# RecuRight

RecuRight is a premium AI-powered recruitment platform (fullstack monorepo).

Overview
- Backend: NestJS + Prisma (Postgres), background workers, Redis.
- Frontend: Next.js (App Router), Tailwind CSS, React components and design system.

Getting started (development)
1. Install dependencies

```bash
# from repo root
cd backend && npm install
cd ../frontend && npm install
```

2. Start services
- Prefer running PostgreSQL and Redis (docker-compose included for development).

3. Run apps

```bash
# backend
cd backend
npm run dev

# frontend
cd frontend
npm run dev
```

Design system
- Tokens and examples live under `frontend/src/styles` and `frontend/src/design-system`.

Contributing
- Please open issues or PRs for changes. Follow existing code style and run linters/tests.

License
- This repository is licensed under the MIT License (see LICENSE file).
