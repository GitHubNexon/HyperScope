import React, { useEffect, useState } from "react";
import {
  View,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  RefreshControl,
  TouchableOpacity,
  Text,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CardContainer from "../components/CardContainer";
import PaginationComponent from "../components/PaginationComponent";
import newsApi from "../api/newsApi";
import colors from "../utils/colors";
import { useAppTheme } from "../contexts/AppThemeContext";
import AppText from "../components/AppText";
import { Toast } from "../components/Toast";
// Remove direct CountryPicker, CategoriesPicker imports
// We'll use them inside the modal only
import ConfigurationPopOver from "../components/ConfigurationPopOver";

interface Article {
  title: string;
  urlToImage?: string;
  description?: string;
  author?: string;
  publishedAt?: string;
  url?: string;
}

const CACHE_KEY = "cachedNewsArticles";
const CACHE_TIME_KEY = "cachedNewsTimestamp";
const CACHE_DURATION = 12 * 60 * 60 * 1000; // 12 hours

const PAGE_SIZE = 10;

const NewsContainer = () => {
  const { theme } = useAppTheme();
  const [country, setCountry] = useState("us");
  const [category, setCategory] = useState("general");

  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [toast, setToast] = useState<{
    message: string;
    type: "error" | "success" | "info" | "warning";
  } | null>(null);

  const [currentPage, setCurrentPage] = useState(1);

  // New state: modal visibility
  const [configModalVisible, setConfigModalVisible] = useState(false);

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

  const loadFromCache = async () => {
    try {
      const cachedDataStr = await AsyncStorage.getItem(CACHE_KEY);
      if (cachedDataStr) {
        const cachedData = JSON.parse(cachedDataStr);
        setArticles(cachedData);
        return true;
      }
      return false;
    } catch {
      return false;
    }
  };

  const saveToCache = async (data: Article[]) => {
    try {
      await AsyncStorage.setItem(CACHE_KEY, JSON.stringify(data));
      await AsyncStorage.setItem(CACHE_TIME_KEY, Date.now().toString());
    } catch (error) {
      console.error("Failed to save to cache:", error);
      showToast("Failed to save articles to cache.", "error");
    }
  };

  const showToast = (
    message: string,
    type: "error" | "success" | "info" | "warning" = "info"
  ) => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 5000);
  };

  const fetchNews = async () => {
    setLoading(true);
    try {
      const data = await newsApi.getCategoriesNews(category, country);
      if (data && Array.isArray(data)) {
        const limitedData = data.slice(0, 100);
        setArticles(limitedData);
        await saveToCache(limitedData);
        showToast("News loaded successfully", "success");
      } else {
        showToast("No articles found.", "warning");
      }
    } catch {
      showToast("Failed to fetch news.", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      const data = await newsApi.getCategoriesNews(category, country);
      if (data && Array.isArray(data)) {
        const limitedData = data.slice(0, 100);
        setArticles(limitedData);
        await saveToCache(limitedData);
        setCurrentPage(1);
        showToast("News refreshed", "success");
      } else {
        showToast("No articles found.", "warning");
      }
    } catch {
      showToast("Refresh failed.", "error");
    }
    setRefreshing(false);
  };

  const backgroundColor =
    theme === "light" ? colors.lightBackground : colors.darkBackground;

  const totalPages = Math.ceil(articles.length / PAGE_SIZE);
  const paginatedArticles = articles.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  const renderItem = ({ item }: { item: Article }) => {
    const descriptionWithAuthor = item.author
      ? `${item.description || ""}\n\nBy: ${item.author}`
      : item.description || "";

    return (
      <CardContainer
        title={item.title}
        image={item.urlToImage}
        description={descriptionWithAuthor}
        date={item.publishedAt ? new Date(item.publishedAt) : undefined}
        link={item.url}
        icon={null}
      />
    );
  };

  if (loading) {
    return (
      <View style={[styles.center, { backgroundColor }]}>
        <ActivityIndicator size="large" color={colors.accent} />
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor }]}>
      {toast && (
        <Toast
          message={toast.message}
          isError={toast.type === "error"}
          isSuccess={toast.type === "success"}
          isInfo={toast.type === "info"}
          isWarning={toast.type === "warning"}
        />
      )}

      {/* Replace pickers with a button to open modal */}
      <TouchableOpacity
        style={styles.configButton}
        onPress={() => setConfigModalVisible(true)}
      >
        <Text style={styles.configButtonText}>Configure Filters</Text>
      </TouchableOpacity>

      {/* Modal for configuration */}
      <ConfigurationPopOver
        visible={configModalVisible}
        onClose={() => setConfigModalVisible(false)}
        selectedCountry={country}
        selectedCategory={category}
        onCountryChange={(val) => {
          setCountry(val);
          fetchNews();
        }}
        onCategoryChange={(val) => {
          setCategory(val);
          fetchNews();
        }}
      />

      {/* News List */}
      <FlatList
        data={paginatedArticles}
        keyExtractor={(item, index) => item.url || index.toString()}
        renderItem={renderItem}
        contentContainerStyle={{ padding: 16 }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <AppText
            style={{ textAlign: "center", marginTop: 20 }}
            color={colors.accent}
          >
            No news articles available.
          </AppText>
        }
      />

      {/* Pagination */}
      {articles.length > 0 && (
        <PaginationComponent
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => setCurrentPage(page)}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  configButton: {
    backgroundColor: colors.accent,
    marginHorizontal: 16,
    marginTop: 12,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  configButtonText: {
    color: colors.lightBackground,
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default NewsContainer;
