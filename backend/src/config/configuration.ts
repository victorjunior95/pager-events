export default () => ({
  port: parseInt(process.env.BACKEND_PORT ?? '3000', 10),
});
