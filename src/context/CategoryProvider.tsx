import {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
  ReactNode,
} from "react";
import { Configuration } from "@/lib/types";
import { GetCategories } from "@/api/categories_api";

// Types
interface ApiResponse<T = never> {
  success: boolean;
  message: string;
  data?: T;
}

interface CategoryInfo {
  name: string;
  description: string;
  image?: string;
}

interface CategoryContextType {
  categories: Configuration[];
  categories_loading: boolean;
  fetchCategories: () => Promise<ApiResponse<Configuration[]>>;
  getCategoryInfo: (id: string) => CategoryInfo;
}

interface CategoryProviderProps {
  children: ReactNode;
}

const CONFIGURATION_TYPE = "CATEGORY";

// Constants
const ERROR_MESSAGES = {
  FETCH_CATEGORIES: "An unknown error occurred while fetching categories",
} as const;

// Context
const CategoryContext = createContext<CategoryContextType | null>(null);

// Provider Component
export const CategoryProvider: React.FC<CategoryProviderProps> = ({
  children,
}) => {
  // State
  const [categories, setCategories] = useState<Configuration[]>([]);
  const [categories_loading, setLoading] = useState(false);

  // Utility Functions
  const handleApiError = (error: unknown, defaultMessage: string) => {
    console.error(defaultMessage, error);
    return { success: false, message: defaultMessage };
  };

  // API Methods
  const fetchCategories = useCallback(async (): Promise<
    ApiResponse<Configuration[]>
  > => {
    setLoading(true);
    try {
      const response = await GetCategories(CONFIGURATION_TYPE);

      if (response.success) {
        const categories = response.data ?? [];
        setCategories(categories);
        return {
          success: true,
          message: "Categories fetched successfully",
          data: categories,
        };
      }

      setCategories([]);
      return {
        success: false,
        message: response.message || "Failed to fetch categories",
      };
    } catch (error) {
      setCategories([]);
      return handleApiError(error, ERROR_MESSAGES.FETCH_CATEGORIES);
    } finally {
      setLoading(false);
    }
  }, []);
  const getCategoryInfo = useCallback(
    (id: string) => {
      const category = categories.find((cat) => cat.id === id);
      return {
        name: category?.name ?? "uncategorized",
        description: category?.description ?? "no category description",
        image: category?.main_image,
      };
    },
    [categories]
  );

  // Context Value
  const contextValue = useMemo(
    () => ({
      categories,
      categories_loading,
      fetchCategories,
      getCategoryInfo,
    }),
    [categories, categories_loading, fetchCategories, getCategoryInfo]
  );

  return (
    <CategoryContext.Provider value={contextValue}>
      {children}
    </CategoryContext.Provider>
  );
};

// Custom Hook
export const useCategory = (): CategoryContextType => {
  const context = useContext(CategoryContext);

  if (!context) {
    throw new Error("useCategory must be used within an CategoryProvider");
  }

  return context;
};
