export default {
  jwt: {
    secret: process.env.APP_SECRET || 'app-secret-key',
    expiresIn: '1d',
  },
};
