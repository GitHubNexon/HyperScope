import "dotenv/config";

export default ({ config }) => ({
  ...config,
  projectId: "6b1e1e30-9c21-4329-a3a8-4b8ac9dce0e8",
  extra: {
    ...config.extra,
    NEWS_API_KEY:
      process.env.NEWS_API_KEY || "aa783906edfb425eb1f948d8c2902650",
    API_URL: process.env.API_URL || "https://newsapi.org/v2",
  },
});
