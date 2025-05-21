// components/NotificationsContainer.tsx
import React, { useEffect, useState } from "react";
import {
  View,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  RefreshControl,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import newsApi from "../api/newsApi";
import colors from "../utils/colors";
import { useAppTheme } from "../contexts/AppThemeContext";
import AppText from "../components/AppText";
import CardContainer from "../components/CardContainer";
import PaginationComponent from "../components/PaginationComponent";
import { Toast } from "../components/Toast";

type Article = {
  title: string;
  description?: string;
  url: string;
  urlToImage?: string;
  publishedAt?: string;
  source: { name: string };
};

const CACHE_KEY = "cachedNotificationsArticles";
const CACHE_TIME_KEY = "cachedNotificationsTimestamp";
const CACHE_DURATION = 12 * 60 * 60 * 1000; // 12 hours
const PAGE_SIZE = 10;

const NotificationsContainer = () => {
  const { theme } = useAppTheme();

  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [toast, setToast] = useState<{
    message: string;
    type: "info" | "success" | "error";
  } | null>(null);

  const bgColor =
    theme === "light" ? colors.lightBackground : colors.darkBackground;

  // Check if cached data is valid (within 12 hours)
  const isCacheValid = async () => {
    try {
      const timestampStr = await AsyncStorage.getItem(CACHE_TIME_KEY);
      if (!timestampStr) return false;
      const timestamp = parseInt(timestampStr, 10);
      return Date.now() - timestamp < CACHE_DURATION;
    } catch {
      return false;
    }
  };

  // Load cached articles from AsyncStorage
  const loadFromCache = async () => {
    try {
      const cachedStr = await AsyncStorage.getItem(CACHE_KEY);
      if (cachedStr) {
        const cachedData: Article[] = JSON.parse(cachedStr);
        setArticles(cachedData);
        return true;
      }
      return false;
    } catch {
      return false;
    }
  };

  // Save articles and timestamp to AsyncStorage
  const saveToCache = async (data: Article[]) => {
    try {
      await AsyncStorage.setItem(CACHE_KEY, JSON.stringify(data));
      await AsyncStorage.setItem(CACHE_TIME_KEY, Date.now().toString());
    } catch (err) {
      console.error("Failed to save notifications cache", err);
    }
  };

  // Show toast helper
  const showToast = (
    message: string,
    type: "info" | "success" | "error" = "info"
  ) => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  // Fetch notifications news from API
  const fetchNotifications = async (showNotification = false) => {
    setLoading(true);
    setError(null);
    try {
      const response = await newsApi.getLatestNews({ page: 1, pageSize: 100 });
      if (response && response.articles && response.articles.length > 0) {
        setArticles(response.articles);
        await saveToCache(response.articles);
        if (showNotification) {
          showToast("New notifications available!", "success");
        }
      } else {
        setError("No notifications found.");
      }
    } catch {
      setError("Failed to fetch notifications.");
    } finally {
      setLoading(false);
    }
  };

  // Initial load: try cache first, if expired fetch new and notify
  useEffect(() => {
    (async () => {
      const cacheValid = await isCacheValid();
      if (cacheValid) {
        const loaded = await loadFromCache();
        if (!loaded) {
          // Cache missing, fetch fresh data silently
          fetchNotifications(false);
        }
      } else {
        // Cache expired or missing - fetch fresh and show toast
        fetchNotifications(true);
      }
    })();
  }, []);

  // Pagination for display
  const totalPages = Math.ceil(articles.length / PAGE_SIZE);
  const paginatedArticles = articles.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  // Pull-to-refresh to fetch latest notifications explicitly
  const onRefresh = async () => {
    setRefreshing(true);
    await fetchNotifications(true);
    setCurrentPage(1);
    setRefreshing(false);
  };

  const renderItem = ({ item }: { item: Article }) => (
    <CardContainer
      title={item.title}
      description={item.description}
      imageUrl={item.urlToImage}
      source={item.source.name}
      publishedAt={item.publishedAt}
      onPress={() => {
        // Optional: navigate to details
      }}
    />
  );

  // Load more articles pagination
  const loadMore = () => {
    if (!loading && currentPage < totalPages) {
      setCurrentPage((p) => p + 1);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: bgColor }]}>
      {toast && (
        <Toast
          message={toast.message}
          isSuccess={toast.type === "success"}
          isError={toast.type === "error"}
          isInfo={toast.type === "info"}
          onHide={() => setToast(null)}
        />
      )}

      {loading && currentPage === 1 ? (
        <ActivityIndicator
          size="large"
          color={colors.accent}
          style={{ marginTop: 20 }}
        />
      ) : error ? (
        <AppText style={[styles.errorText, { color: colors.accent }]}>
          {error}
        </AppText>
      ) : (
        <FlatList
          data={paginatedArticles}
          keyExtractor={(item) => item.url}
          renderItem={renderItem}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          onEndReached={loadMore}
          onEndReachedThreshold={0.5}
          ListFooterComponent={
            loading && currentPage > 1 ? (
              <ActivityIndicator color={colors.accent} />
            ) : null
          }
          contentContainerStyle={{ paddingBottom: 80 }}
        />
      )}

      {articles.length > 0 && (
        <PaginationComponent
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  errorText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
  },
});

export default NotificationsContainer;
