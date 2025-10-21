import {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
  ReactNode,
} from "react";
import { ItemSchema } from "@/lib/types";
import { GetItems } from "@/api/items_api";

// Types
interface ApiResponse<T = never> {
  success: boolean;
  message: string;
  data?: T;
}

interface ItemContextType {
  items: ItemSchema[];
  items_loading: boolean;
  fetchItems: () => Promise<ApiResponse<ItemSchema[]>>;
}

interface ItemProviderProps {
  children: ReactNode;
}

const ITEM_TYPE = "PRODUCT";

// Constants
const ERROR_MESSAGES = {
  FETCH_ITEMS: "An unknown error occurred while fetching items",
} as const;

// Context
const ItemContext = createContext<ItemContextType | null>(null);

// Provider Component
export const ItemProvider: React.FC<ItemProviderProps> = ({ children }) => {
  // State
  const [items, setItems] = useState<ItemSchema[]>([]);
  const [items_loading, setLoading] = useState(false);

  // Utility Functions
  const handleApiError = (error: unknown, defaultMessage: string) => {
    console.error(defaultMessage, error);
    return { success: false, message: defaultMessage };
  };

  // API Methods
  const fetchItems = useCallback(async (): Promise<
    ApiResponse<ItemSchema[]>
  > => {
    setLoading(true);
    try {
      const response = await GetItems(ITEM_TYPE);

      if (response.success) {
        const itemsData = response.data ?? [];
        setItems(itemsData);
        return {
          success: true,
          message: "Items fetched successfully",
          data: itemsData,
        };
      }

      setItems([]);
      return {
        success: false,
        message: response.message || "Failed to fetch items",
      };
    } catch (error) {
      setItems([]);
      return handleApiError(error, ERROR_MESSAGES.FETCH_ITEMS);
    } finally {
      setLoading(false);
    }
  }, []);

  // Context Value
  const contextValue = useMemo(
    () => ({
      items,
      items_loading,
      fetchItems,
    }),
    [items, items_loading, fetchItems]
  );

  return (
    <ItemContext.Provider value={contextValue}>{children}</ItemContext.Provider>
  );
};

// Custom Hook
export const useItem = (): ItemContextType => {
  const context = useContext(ItemContext);

  if (!context) {
    throw new Error("useItem must be used within an ItemProvider");
  }

  return context;
};
