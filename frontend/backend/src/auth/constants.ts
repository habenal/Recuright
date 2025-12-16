export const jwtConstants = {
  secret: process.env.JWT_SECRET || 'supersecretkey', // store securely in production
  expiresIn: '1d',
};
