// app.config.js
import "dotenv/config";

export default ({ config }) => ({
  ...config,
  extra: {
    SERVICE_KEY_DECODING: process.env.SERVICE_KEY_DECODING,
    SERVICE_KEY_ENCODING: process.env.SERVICE_KEY_ENCODING,
  },
});
