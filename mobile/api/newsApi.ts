import Constants from "expo-constants";
import axios from "axios";

const { API_URL, NEWS_API_KEY } =
  Constants.manifest?.extra || Constants.expoConfig?.extra || {};

if (!API_URL || !NEWS_API_KEY) {
  throw new Error("API_URL or NEWS_API_KEY not set in app config.");
}

const newsApi = {
  getLatestNews: async ({ pageSize = 20 } = {}) => {
    try {
      const response = await axios.get(`${API_URL}/top-headlines`, {
        params: {
          apiKey: NEWS_API_KEY,
          country: "us",
          pageSize,
        },
      });
      console.log("Latest News:", response.data.articles);
      return response.data.articles;
    } catch (error: any) {
      if (error.response) {
        console.error("API response error:", error.response.data);
      } else if (error.request) {
        console.error("No response received:", error.request);
      } else {
        console.error("Error setting up request:", error.message);
      }
      return null;
    }
  },

  getCountryNews: async (countryCode = "us") => {
    try {
      const response = await axios.get(`${API_URL}/top-headlines`, {
        params: {
          apiKey: NEWS_API_KEY,
          country: countryCode,
        },
      });
      console.log(`News for country ${countryCode}:`, response.data.articles);
      return response.data.articles;
    } catch (error: any) {
      console.error(`Error fetching news for ${countryCode}:`, error.message);
      return null;
    }
  },

  getCategoriesNews: async (category = "technology") => {
    try {
      const response = await axios.get(`${API_URL}/top-headlines`, {
        params: {
          apiKey: NEWS_API_KEY,
          country: "us",
          category,
        },
      });
      console.log(`News in category "${category}":`, response.data.articles);
      return response.data.articles;
    } catch (error: any) {
      console.error(`Error fetching category "${category}":`, error.message);
      return null;
    }
  },

  searchNews: async (query = "") => {
    try {
      const response = await axios.get(`${API_URL}/everything`, {
        params: {
          apiKey: NEWS_API_KEY,
          q: query,
        },
      });
      console.log(`Search results for "${query}":`, response.data.articles);
      return response.data.articles;
    } catch (error: any) {
      console.error(`Error searching for "${query}":`, error.message);
      return null;
    }
  },
};

export default newsApi;
