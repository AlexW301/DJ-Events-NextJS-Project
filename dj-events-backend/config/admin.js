module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', 'ee6d403e4220007cd6771cb3d736d1e5'),
  },
});
