// prisma.config.js
module.exports = {
  schema: './backend/prisma/schema.prisma',
  datasources: {
    db: {
      provider: 'postgresql',
      url: process.env.DATABASE_URL,
    },
  },
};
