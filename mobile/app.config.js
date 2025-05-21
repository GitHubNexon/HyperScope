import "dotenv/config"; // loads .env into process.env at build time

export default ({ config }) => {
  return {
    ...config,
    extra: {
      NEWS_API_KEY:
        process.env.NEWS_API_KEY || "aa783906edfb425eb1f948d8c2902650",
      API_URL: process.env.API_URL || "https://newsapi.org/v2",
    },
  };
};
