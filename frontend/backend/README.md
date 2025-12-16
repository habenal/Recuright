# RECURIGHT Backend (NestJS + Prisma) - Fresh Start

This is a production-ready NestJS backend scaffold for RECURIGHT.

## Quickstart (local using docker-compose)

1. Copy `.env.example` to `.env` and edit values.
2. Start Postgres and Redis: `docker-compose up -d`.
3. Install dependencies: `npm install`.
4. Generate Prisma client: `npm run prisma:generate`.
5. Run migrations: `npm run prisma:migrate`.
6. Seed database (optional): `npm run prisma:seed`.
7. Run dev server: `npm run start:dev`

Health endpoints: `/health/healthz`, `/health/readiness`.

Notes: Webhook raw body handling for Stripe requires configuration in main to capture raw body.
