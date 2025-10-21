import AddToCartDialog from "@/components/AddToCartDialog";
import Cart from "@/components/Cart";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartProvider";
import { useCategory } from "@/context/CategoryProvider";
import { useItem } from "@/context/ItemProvider";
import { useTheme } from "@/context/ThemeProvider";
import { CartItem, ItemSchema } from "@/lib/types";
import { handleImageSrc } from "@/utils/helpers";
import { motion } from "framer-motion";
import { ChevronLeft, Filter, Moon, Search, Star, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};
const MenusPage = () => {
  const [selectedItem, setSelectedItem] = useState<ItemSchema | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const { items } = useItem();
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const [cartModalVisible, setCartModalVisible] = useState(false);
  const { categories, getCategoryInfo } = useCategory();
  const [searchQuery, setSearchQuery] = useState("");
  const { fetchCategories } = useCategory();
  const { fetchItems } = useItem();
  const { setTheme, theme } = useTheme();
  const filteredItems = items.filter((item) => {
    const matchesCategory =
      selectedCategory === "All" ||
      getCategoryInfo(item.category_id ?? "").name === selectedCategory;
    const matchesSearch =
      item.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });
  useEffect(() => {
    const getItems = async () => {
      await fetchItems();
    };
    const getCategories = async () => {
      await fetchCategories();
    };
    getItems();
    getCategories();
  }, [fetchCategories, fetchItems]);

  const handleAddToCart = (item: CartItem) => {
    addToCart(item);
    setCartModalVisible(false);
    setSelectedItem(null);
  };
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-background"
    >
      <header className="bg-card/80 backdrop-blur-lg shadow-lg sticky top-0 z-40 py-4 sm:py-6 border-b border-primary/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2 sm:gap-4">
              <Button
                variant={"ghost"}
                onClick={() => navigate("/")}
                className="p-2 rounded-full hover:bg-primary/10 transition"
              >
                <ChevronLeft size={20} className="sm:w-6 sm:h-6" />
              </Button>
              <div>
                <h1 className="text-xl sm:text-2xl font-serif text-primary">
                  Our Menu
                </h1>
                <p className="text-xs sm:text-sm text-muted hidden sm:block">
                  Explore our handcrafted dishes
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Cart />
              <Button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                variant="ghost"
              >
                {theme === "light" ? (
                  <Sun size={20} className="text-foreground" />
                ) : (
                  <Moon size={20} className="text-foreground" />
                )}
              </Button>
            </div>
          </div>

          <div className="mt-4 sm:mt-6 space-y-3 sm:space-y-4">
            <div className="relative">
              <Search
                className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-muted"
                size={18}
              />
              <input
                type="text"
                placeholder="Search dishes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 sm:pl-12 pr-4 py-2 sm:py-3 bg-background border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground text-sm sm:text-base"
              />
            </div>

            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
              <Filter size={16} className="text-muted shrink-0" />
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory("All")}
                className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all whitespace-nowrap ${
                  selectedCategory === "All"
                    ? "bg-primary text-white"
                    : "bg-background border border-gray-300 dark:border-gray-700 text-foreground hover:bg-primary/10"
                }`}
              >
                All
              </motion.button>
              {categories.map((category) => (
                <motion.button
                  key={category.id}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedCategory(category.name)}
                  className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all whitespace-nowrap ${
                    selectedCategory === category.name
                      ? "bg-primary text-white"
                      : "bg-background border border-gray-300 dark:border-gray-700 text-foreground hover:bg-primary/10"
                  }`}
                >
                  {category.name}
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
        {filteredItems.length === 0 ? (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-muted mt-20"
          >
            No dishes found matching your filters
          </motion.p>
        ) : (
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8"
          >
            {filteredItems.map((item) => (
              <motion.div
                key={item.id}
                variants={fadeInUp}
                whileHover={{ y: -8 }}
                className="group bg-card rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all"
              >
                <div className="relative h-48 sm:h-60 overflow-hidden">
                  <img
                    src={
                      handleImageSrc(item.main_image ?? "") ??
                      "/images/item_image_placeholder.jpg"
                    }
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  {item.is_featured && (
                    <span className="absolute top-3 left-3 bg-primary text-white text-xs font-semibold px-2 sm:px-3 py-1 rounded-full">
                      Popular
                    </span>
                  )}
                  <div className="absolute top-3 right-3 bg-card/80 backdrop-blur-sm text-primary px-2 sm:px-3 py-1 rounded-full flex items-center gap-1 text-xs sm:text-sm">
                    <Star size={12} fill="currentColor" />
                    {item.rating}
                  </div>
                </div>
                <div className="p-4 sm:p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="text-base sm:text-lg font-serif text-foreground">
                      {item.name}
                    </h4>
                    <span className="text-primary font-semibold text-sm">
                      ${item.price}
                    </span>
                  </div>
                  <p className="text-muted text-xs sm:text-sm mb-4 line-clamp-2">
                    {item.description}
                  </p>
                  <div className="flex justify-between items-center gap-2">
                    <span className="text-xs bg-primary/10 text-primary px-2 sm:px-3 py-1 rounded-full">
                      {getCategoryInfo(item.category_id ?? "").name}
                    </span>
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        setSelectedItem(item);
                        setCartModalVisible(true);
                      }}
                      className="bg-primary hover:bg-primary-dark text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded text-xs sm:text-sm transition-all"
                    >
                      Add to Cart
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </main>

      <AddToCartDialog
        item={selectedItem}
        isOpen={cartModalVisible}
        openHandler={setCartModalVisible}
        onAddToCart={handleAddToCart}
      />
    </motion.div>
  );
};

export default MenusPage;
