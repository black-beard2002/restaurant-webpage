import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Moon,
  Sun,
  Facebook,
  Instagram,
  X,
  ChevronLeft,
  ChevronRight,
  Filter,
  Search,
  Star,
  ShoppingCart,
  Minus,
  Plus,
  Trash2,
  Phone,
  Mail,
  MapPin,
  Clock,
  Calendar,
  Users,
  MessageSquare,
  Check,
} from "lucide-react";

// =========================
// Types
// =========================
interface MenuItem {
  id: number;
  name: string;
  category: string;
  price: number;
  description: string;
  image: string;
  is_popular: boolean;
  rating: number;
  ingredients: string[];
}

interface CartItem extends MenuItem {
  quantity: number;
  excludedIngredients: string[];
}

// =========================
// Data
// =========================
const menuItems: MenuItem[] = [
  {
    id: 1,
    name: "Grilled Ribeye Steak",
    category: "Main Course",
    price: 45.99,
    description: "Premium cut ribeye with herb butter and seasonal vegetables",
    image:
      "https://i.pinimg.com/1200x/8e/71/e4/8e71e4e586d5072a5f9aca8df7a03439.jpg",
    is_popular: true,
    rating: 4.9,
    ingredients: [
      "Ribeye Steak",
      "Herb Butter",
      "Garlic",
      "Rosemary",
      "Seasonal Vegetables",
      "Black Pepper",
    ],
  },
  {
    id: 2,
    name: "Truffle Pasta",
    category: "Main Course",
    price: 32.99,
    description: "Handmade pasta with black truffle and parmesan",
    image:
      "https://i.pinimg.com/1200x/00/89/dd/0089dd6468b09d60446048a6cff1131d.jpg",
    is_popular: true,
    rating: 4.8,
    ingredients: [
      "Fresh Pasta",
      "Black Truffle",
      "Parmesan",
      "Cream",
      "Garlic",
      "White Wine",
    ],
  },
  {
    id: 3,
    name: "Seafood Platter",
    category: "Main Course",
    price: 52.99,
    description: "Fresh lobster, prawns, and scallops with lemon garlic sauce",
    image:
      "https://i.pinimg.com/736x/ed/fc/6f/edfc6ff4bc092542d2fcce987044d4e1.jpg",
    is_popular: true,
    rating: 4.9,
    ingredients: [
      "Lobster",
      "Prawns",
      "Scallops",
      "Lemon",
      "Garlic Sauce",
      "Fresh Herbs",
    ],
  },
  {
    id: 4,
    name: "Caesar Salad",
    category: "Appetizers",
    price: 12.99,
    description: "Classic Caesar with crispy bacon and parmesan",
    image:
      "https://i.pinimg.com/1200x/58/4f/43/584f430dd54f19fd2a36e1391fcf7507.jpg",
    is_popular: false,
    rating: 4.5,
    ingredients: [
      "Romaine Lettuce",
      "Caesar Dressing",
      "Parmesan",
      "Croutons",
      "Bacon",
      "Anchovies",
    ],
  },
  {
    id: 5,
    name: "Chocolate Lava Cake",
    category: "Desserts",
    price: 14.99,
    description: "Warm chocolate cake with vanilla ice cream",
    image:
      "https://i.pinimg.com/1200x/07/9f/c0/079fc0ee7d9aa93e1d4f55f5e51c326c.jpg",
    is_popular: true,
    rating: 4.9,
    ingredients: [
      "Dark Chocolate",
      "Butter",
      "Eggs",
      "Sugar",
      "Vanilla Ice Cream",
      "Berry Compote",
    ],
  },
  {
    id: 6,
    name: "Lamb Chops",
    category: "Main Course",
    price: 42.99,
    description: "Herb-crusted lamb chops with mint jelly",
    image:
      "https://i.pinimg.com/1200x/eb/bc/76/ebbc76da153ac44d8baf7cf7e8bc4936.jpg",
    is_popular: false,
    rating: 4.7,
    ingredients: [
      "Lamb Chops",
      "Fresh Herbs",
      "Mint Jelly",
      "Garlic",
      "Olive Oil",
      "Lemon",
    ],
  },
  {
    id: 7,
    name: "Burrata Caprese",
    category: "Appetizers",
    price: 16.99,
    description: "Creamy burrata with heirloom tomatoes and basil",
    image:
      "https://i.pinimg.com/736x/66/ea/29/66ea29af98a522f598fea63c4d7a19c7.jpg",
    is_popular: false,
    rating: 4.6,
    ingredients: [
      "Burrata Cheese",
      "Heirloom Tomatoes",
      "Fresh Basil",
      "Olive Oil",
      "Balsamic Glaze",
      "Sea Salt",
    ],
  },
  {
    id: 8,
    name: "Tiramisu",
    category: "Desserts",
    price: 12.99,
    description: "Traditional Italian tiramisu with espresso",
    image:
      "https://i.pinimg.com/736x/82/b9/6a/82b96a6b8808fc27058ea3bf5aab56fe.jpg",
    is_popular: false,
    rating: 4.8,
    ingredients: [
      "Mascarpone",
      "Ladyfingers",
      "Espresso",
      "Cocoa Powder",
      "Marsala Wine",
      "Eggs",
    ],
  },
];

// =========================
// Animation Variants
// =========================
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

// =========================
// Cart Component
// =========================
const Cart: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  updateQuantity: (id: number, delta: number) => void;
  removeItem: (id: number) => void;
  darkMode: boolean;
}> = ({ isOpen, onClose, cart, updateQuantity, removeItem }) => {
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25 }}
            className="fixed right-0 top-0 h-full w-full sm:w-96 bg-card shadow-2xl z-50 flex flex-col"
          >
            <div className="p-4 sm:p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
              <h2 className="text-xl sm:text-2xl font-serif text-foreground">
                Your Cart
              </h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-background rounded-full transition"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 sm:p-6">
              {cart.length === 0 ? (
                <div className="text-center py-12">
                  <ShoppingCart size={48} className="mx-auto text-muted mb-4" />
                  <p className="text-muted">Your cart is empty</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {cart.map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="bg-background rounded-lg p-3 sm:p-4"
                    >
                      <div className="flex gap-3 sm:gap-4">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg object-cover"
                        />
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium text-foreground text-sm sm:text-base truncate">
                            {item.name}
                          </h3>
                          <p className="text-primary font-semibold text-sm sm:text-base">
                            ${item.price}
                          </p>
                          {item.excludedIngredients.length > 0 && (
                            <p className="text-xs text-muted mt-1">
                              No: {item.excludedIngredients.join(", ")}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="flex justify-between items-center mt-3">
                        <div className="flex items-center gap-2 sm:gap-3 bg-card rounded-full p-1">
                          <button
                            onClick={() => updateQuantity(item.id, -1)}
                            className="p-1 hover:bg-primary/10 rounded-full transition"
                          >
                            <Minus size={14} className="text-primary" />
                          </button>
                          <span className="text-foreground font-medium w-6 text-center text-sm">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, 1)}
                            className="p-1 hover:bg-primary/10 rounded-full transition"
                          >
                            <Plus size={14} className="text-primary" />
                          </button>
                        </div>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="p-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-full transition"
                        >
                          <Trash2 size={16} className="text-red-500" />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {cart.length > 0 && (
              <div className="border-t border-gray-200 dark:border-gray-700 p-4 sm:p-6 space-y-4">
                <div className="flex justify-between items-center text-base sm:text-lg">
                  <span className="font-serif text-foreground">Total</span>
                  <span className="font-bold text-primary">
                    ${total.toFixed(2)}
                  </span>
                </div>
                <button className="w-full bg-primary hover:bg-primary-dark text-white py-3 sm:py-4 rounded-lg transition-all transform hover:scale-[1.02] font-medium text-sm sm:text-base">
                  Proceed to Checkout
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

// =========================
// Add to Cart Modal
// =========================
const AddToCartModal: React.FC<{
  item: MenuItem | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (item: MenuItem, excludedIngredients: string[]) => void;
}> = ({ item, isOpen, onClose, onAddToCart }) => {
  const [excludedIngredients, setExcludedIngredients] = useState<string[]>([]);

  useEffect(() => {
    if (!isOpen) setExcludedIngredients([]);
  }, [isOpen]);

  if (!item) return null;

  const toggleIngredient = (ingredient: string) => {
    setExcludedIngredients((prev) =>
      prev.includes(ingredient)
        ? prev.filter((i) => i !== ingredient)
        : [...prev, ingredient]
    );
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          />

          {/* Centered Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
          >
            <div className="relative w-full max-w-4xl bg-card rounded-2xl shadow-2xl overflow-hidden">
              {/* Grid Layout */}
              <div className="grid md:grid-cols-2 h-full">
                {/* Left Side - Image */}
                <div className="relative h-56 md:h-auto">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                  <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 bg-card/80 backdrop-blur-sm rounded-full hover:bg-card transition"
                  >
                    <X className="text-red-500 p-1 w-5 h-5 rounded-full bg-card" />
                  </button>
                </div>

                {/* Right Side - Content */}
                <div className="flex flex-col justify-between max-h-[80vh] overflow-y-auto">
                  <div className="p-4 sm:p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl sm:text-2xl font-serif text-foreground">
                          {item.name}
                        </h3>
                        <p className="text-primary font-semibold text-lg sm:text-xl mt-1">
                          ${item.price}
                        </p>
                      </div>
                      <div className="flex items-center gap-1 bg-primary/10 text-primary px-2 sm:px-3 py-1 rounded-full text-sm">
                        <Star size={14} fill="currentColor" />
                        {item.rating}
                      </div>
                    </div>

                    <p className="text-muted mb-6 text-sm sm:text-base">
                      {item.description}
                    </p>

                    <div>
                      <h4 className="font-semibold text-foreground mb-3 text-sm sm:text-base">
                        Customize Your Order
                      </h4>
                      <p className="text-xs sm:text-sm text-muted mb-3">
                        Select ingredients to exclude:
                      </p>

                      {/* Ingredients with flex-wrap */}
                      <div className="flex flex-wrap gap-2 max-h-28 overflow-auto">
                        {item.ingredients.map((ingredient: string) => {
                          const excluded =
                            excludedIngredients.includes(ingredient);
                          return (
                            <button
                              key={ingredient}
                              onClick={() => toggleIngredient(ingredient)}
                              className={`px-3 py-2 rounded-full border-2 transition-all text-sm sm:text-base flex items-center gap-1 ${
                                excluded
                                  ? "border-red-500 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 line-through"
                                  : "border-gray-200 dark:border-gray-700 hover:border-primary text-foreground"
                              }`}
                            >
                              {ingredient}
                              {excluded && (
                                <X size={14} className="text-red-500" />
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="p-4 sm:p-6 border-t border-gray-200 dark:border-gray-700">
                    <button
                      onClick={() => {
                        onAddToCart(item, excludedIngredients);
                        onClose();
                      }}
                      className="w-full bg-primary hover:bg-primary-dark text-white py-3 sm:py-4 rounded-lg transition-all transform hover:scale-[1.02] font-medium flex items-center justify-center gap-2 text-sm sm:text-base"
                    >
                      <ShoppingCart size={20} />
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

// =========================
// Menu Page Component
// =========================
const MenusPage: React.FC<{
  items: MenuItem[];
  categories: string[];
  selectedCategory: string;
  setSelectedCategory: (value: string) => void;
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  onBack: () => void;
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;
  onAddToCart: (item: MenuItem, excludedIngredients: string[]) => void;
  cartItemCount: number;
  onOpenCart: () => void;
}> = ({
  items,
  categories,
  selectedCategory,
  setSelectedCategory,
  searchQuery,
  setSearchQuery,
  onBack,
  darkMode,
  setDarkMode,
  onAddToCart,
  cartItemCount,
  onOpenCart,
}) => {
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);

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
              <button
                onClick={onBack}
                className="p-2 rounded-full hover:bg-primary/10 transition"
              >
                <ChevronLeft size={20} className="sm:w-6 sm:h-6" />
              </button>
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
              <button
                onClick={onOpenCart}
                className="relative p-2 rounded-full bg-background hover:bg-primary/10 transition"
              >
                <ShoppingCart size={20} className="text-foreground" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                    {cartItemCount}
                  </span>
                )}
              </button>
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 rounded-full bg-background hover:bg-primary/10 transition"
              >
                {darkMode ? (
                  <Sun size={20} className="text-foreground" />
                ) : (
                  <Moon size={20} className="text-foreground" />
                )}
              </button>
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
              <Filter size={16} className="text-muted flex-shrink-0" />
              {categories.map((category) => (
                <motion.button
                  key={category}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all whitespace-nowrap ${
                    selectedCategory === category
                      ? "bg-primary text-white"
                      : "bg-background border border-gray-300 dark:border-gray-700 text-foreground hover:bg-primary/10"
                  }`}
                >
                  {category}
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
        {items.length === 0 ? (
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
            {items.map((item) => (
              <motion.div
                key={item.id}
                variants={fadeInUp}
                whileHover={{ y: -8 }}
                className="group bg-card rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all"
              >
                <div className="relative h-48 sm:h-60 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  {item.is_popular && (
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
                      {item.category}
                    </span>
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSelectedItem(item)}
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

      <AddToCartModal
        item={selectedItem}
        isOpen={!!selectedItem}
        onClose={() => setSelectedItem(null)}
        onAddToCart={onAddToCart}
      />
    </motion.div>
  );
};

// =========================
// Contact Section
// =========================
const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log(formData);
  };

  return (
    <section id="contact" className="py-12 sm:py-20 px-4 bg-background">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8 sm:mb-12"
        >
          <p className="text-primary text-xs sm:text-sm tracking-widest uppercase mb-2">
            Get In Touch
          </p>
          <h3 className="text-3xl sm:text-4xl md:text-5xl font-serif text-foreground">
            Contact Us
          </h3>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 sm:gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6 sm:space-y-8"
          >
            <div>
              <h4 className="text-xl sm:text-2xl font-serif text-foreground mb-4 sm:mb-6">
                Visit Us
              </h4>
              <div className="space-y-4">
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="p-2 sm:p-3 bg-primary/10 rounded-lg">
                    <MapPin size={20} className="text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground text-sm sm:text-base">
                      Address
                    </p>
                    <p className="text-muted text-sm sm:text-base">
                      123 Gourmet Street, Culinary District
                      <br />
                      New York, NY 10001
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="p-2 sm:p-3 bg-primary/10 rounded-lg">
                    <Phone size={20} className="text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground text-sm sm:text-base">
                      Phone
                    </p>
                    <p className="text-muted text-sm sm:text-base">
                      +1 (555) 123-4567
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="p-2 sm:p-3 bg-primary/10 rounded-lg">
                    <Mail size={20} className="text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground text-sm sm:text-base">
                      Email
                    </p>
                    <p className="text-muted text-sm sm:text-base">
                      info@wilmarestaurant.com
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="p-2 sm:p-3 bg-primary/10 rounded-lg">
                    <Clock size={20} className="text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground text-sm sm:text-base">
                      Hours
                    </p>
                    <p className="text-muted text-sm sm:text-base">
                      Mon-Fri: 11:00 AM - 10:00 PM
                      <br />
                      Sat-Sun: 10:00 AM - 11:00 PM
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              <div>
                <label className="block text-foreground mb-2 font-medium text-sm sm:text-base">
                  Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full px-4 py-2 sm:py-3 bg-card border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground text-sm sm:text-base"
                  required
                />
              </div>

              <div>
                <label className="block text-foreground mb-2 font-medium text-sm sm:text-base">
                  Email
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full px-4 py-2 sm:py-3 bg-card border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground text-sm sm:text-base"
                  required
                />
              </div>

              <div>
                <label className="block text-foreground mb-2 font-medium text-sm sm:text-base">
                  Phone
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  className="w-full px-4 py-2 sm:py-3 bg-card border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground text-sm sm:text-base"
                  required
                />
              </div>

              <div>
                <label className="block text-foreground mb-2 font-medium text-sm sm:text-base">
                  Message
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  rows={4}
                  className="w-full px-4 py-2 sm:py-3 bg-card border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground resize-none text-sm sm:text-base"
                  required
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full bg-primary hover:bg-primary-dark text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg transition-all font-medium flex items-center justify-center gap-2 text-sm sm:text-base"
              >
                <MessageSquare size={20} />
                Send Message
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// =========================
// Reservation Section
// =========================
const ReservationSection: React.FC = () => {
  const [reservationData, setReservationData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    guests: "2",
    specialRequests: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    console.log(reservationData);
  };

  return (
    <section id="reservation" className="py-12 sm:py-20 px-4 bg-card">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8 sm:mb-12"
        >
          <p className="text-primary text-xs sm:text-sm tracking-widest uppercase mb-2">
            Book Your Table
          </p>
          <h3 className="text-3xl sm:text-4xl md:text-5xl font-serif text-foreground mb-4">
            Make a Reservation
          </h3>
          <p className="text-muted max-w-2xl mx-auto text-sm sm:text-base">
            Reserve your table for an unforgettable dining experience
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-background rounded-2xl p-6 sm:p-8 shadow-lg"
        >
          {submitted ? (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-center py-8 sm:py-12"
            >
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check
                  size={32}
                  className="text-green-600 dark:text-green-400"
                />
              </div>
              <h4 className="text-xl sm:text-2xl font-serif text-foreground mb-2">
                Reservation Confirmed!
              </h4>
              <p className="text-muted text-sm sm:text-base">
                We'll send you a confirmation email shortly.
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label className="block text-foreground mb-2 font-medium text-sm sm:text-base">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={reservationData.name}
                    onChange={(e) =>
                      setReservationData({
                        ...reservationData,
                        name: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2 sm:py-3 bg-card border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground text-sm sm:text-base"
                    required
                  />
                </div>

                <div>
                  <label className="block text-foreground mb-2 font-medium text-sm sm:text-base">
                    Email
                  </label>
                  <input
                    type="email"
                    value={reservationData.email}
                    onChange={(e) =>
                      setReservationData({
                        ...reservationData,
                        email: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2 sm:py-3 bg-card border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground text-sm sm:text-base"
                    required
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label className="block text-foreground mb-2 font-medium text-sm sm:text-base">
                    Phone
                  </label>
                  <input
                    type="tel"
                    value={reservationData.phone}
                    onChange={(e) =>
                      setReservationData({
                        ...reservationData,
                        phone: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2 sm:py-3 bg-card border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground text-sm sm:text-base"
                    required
                  />
                </div>

                <div>
                  <label className="block text-foreground mb-2 font-medium text-sm sm:text-base">
                    Number of Guests
                  </label>
                  <div className="relative">
                    <Users
                      size={18}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-muted"
                    />
                    <select
                      value={reservationData.guests}
                      onChange={(e) =>
                        setReservationData({
                          ...reservationData,
                          guests: e.target.value,
                        })
                      }
                      className="w-full pl-10 pr-4 py-2 sm:py-3 bg-card border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground appearance-none text-sm sm:text-base"
                      required
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                        <option key={num} value={num}>
                          {num} {num === 1 ? "Guest" : "Guests"}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label className="block text-foreground mb-2 font-medium text-sm sm:text-base">
                    Date
                  </label>
                  <div className="relative">
                    <Calendar
                      size={18}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-muted pointer-events-none"
                    />
                    <input
                      type="date"
                      value={reservationData.date}
                      onChange={(e) =>
                        setReservationData({
                          ...reservationData,
                          date: e.target.value,
                        })
                      }
                      min={new Date().toISOString().split("T")[0]}
                      className="w-full pl-10 pr-4 py-2 sm:py-3 bg-card border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground text-sm sm:text-base"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-foreground mb-2 font-medium text-sm sm:text-base">
                    Time
                  </label>
                  <div className="relative">
                    <Clock
                      size={18}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-muted pointer-events-none"
                    />
                    <input
                      type="time"
                      value={reservationData.time}
                      onChange={(e) =>
                        setReservationData({
                          ...reservationData,
                          time: e.target.value,
                        })
                      }
                      className="w-full pl-10 pr-4 py-2 sm:py-3 bg-card border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground text-sm sm:text-base"
                      required
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-foreground mb-2 font-medium text-sm sm:text-base">
                  Special Requests (Optional)
                </label>
                <textarea
                  value={reservationData.specialRequests}
                  onChange={(e) =>
                    setReservationData({
                      ...reservationData,
                      specialRequests: e.target.value,
                    })
                  }
                  rows={3}
                  placeholder="Dietary restrictions, allergies, special occasions..."
                  className="w-full px-4 py-2 sm:py-3 bg-card border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground resize-none text-sm sm:text-base"
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full bg-primary hover:bg-primary-dark text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg transition-all font-medium flex items-center justify-center gap-2 text-sm sm:text-base"
              >
                <Calendar size={20} />
                Confirm Reservation
              </motion.button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
};

// =========================
// Main Component
// =========================
const WilmaRestaurant = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showMenusPage, setShowMenusPage] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);

  const carouselImages = [
    {
      src: "https://i.pinimg.com/1200x/29/fb/21/29fb2117c66ff0ee0f64a1b496c56615.jpg",
      title: "AMBIANCE",
      description: "Experience luxury dining",
    },
    {
      src: "https://i.pinimg.com/1200x/85/5b/86/855b861e124ff5556b1f9203f20d52a1.jpg",
      title: "INTERIOR",
      description: "Elegant atmosphere",
    },
    {
      src: "https://i.pinimg.com/1200x/3f/67/39/3f6739c5a54ce6998f76a87de6ca2ee4.jpg",
      title: "DINING",
      description: "Premium experience",
    },
  ];

  const popularItems = menuItems.filter((item) => item.is_popular);
  const categories = [
    "All",
    ...Array.from(new Set(menuItems.map((item) => item.category))),
  ];

  const filteredMenuItems = menuItems.filter((item) => {
    const matchesCategory =
      selectedCategory === "All" || item.category === selectedCategory;
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });
  const itemVariants = {
    rest: { scaleX: 0 },
    hover: { scaleX: 1 },
  };

  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const addToCart = (item: MenuItem, excludedIngredients: string[]) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(
        (cartItem) =>
          cartItem.id === item.id &&
          JSON.stringify(cartItem.excludedIngredients.sort()) ===
            JSON.stringify(excludedIngredients.sort())
      );

      if (existingItem) {
        return prevCart.map((cartItem) =>
          cartItem.id === existingItem.id &&
          JSON.stringify(cartItem.excludedIngredients.sort()) ===
            JSON.stringify(excludedIngredients.sort())
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }

      return [...prevCart, { ...item, quantity: 1, excludedIngredients }];
    });
  };

  const updateQuantity = (id: number, delta: number) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.id === id
            ? { ...item, quantity: Math.max(0, item.quantity + delta) }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeItem = (id: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [carouselImages.length]);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  if (showMenusPage) {
    return (
      <>
        <style>{styles}</style>
        <MenusPage
          items={filteredMenuItems}
          categories={categories}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onBack={() => setShowMenusPage(false)}
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          onAddToCart={addToCart}
          cartItemCount={cartItemCount}
          onOpenCart={() => setCartOpen(true)}
        />
        <Cart
          isOpen={cartOpen}
          onClose={() => setCartOpen(false)}
          cart={cart}
          updateQuantity={updateQuantity}
          removeItem={removeItem}
          darkMode={darkMode}
        />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <style>{styles}</style>

      {/* Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed w-full z-50 transition-all duration-300 ${
          scrolled ? "nav-blur shadow-lg" : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 sm:h-20">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex-shrink-0"
            >
              <h1 className="text-2xl sm:text-3xl font-serif text-primary">
                Wilma
              </h1>
              <p className="text-xs tracking-widest text-muted">RESTAURANT</p>
            </motion.div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
              {["Home", "About", "Our Menus", "Reservation", "Contact"].map(
                (item, idx) => (
                  <motion.div
                    // parent handles hover state
                    initial="rest"
                    whileHover="hover"
                    animate="rest"
                    className="flex flex-col items-start"
                  >
                    <motion.a
                      key={item}
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.06 }}
                      href={`#${item.toLowerCase().replace(/\s+/g, "")}`}
                      className={`${
                        scrolled ? "text-foreground" : "text-white"
                      } transition-colors duration-300 text-sm lg:text-base hover:text-primary`}
                    >
                      {item}
                    </motion.a>

                    {/* underline - child uses the parent's hover state via variants */}
                    <motion.div
                      variants={itemVariants}
                      transition={{ duration: 0.35, ease: "easeInOut" }}
                      style={{ transformOrigin: "left" }} // ensure origin-left for transform
                      className="w-full h-0.5 bg-primary mt-1 origin-left"
                    />
                  </motion.div>
                )
              )}
            </div>

            {/* Right Side Icons */}
            <div className="flex items-center gap-2 sm:gap-4">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setCartOpen(true)}
                className="relative p-2 rounded-full bg-card hover:bg-primary/10 transition-all"
              >
                <ShoppingCart size={20} />
                {cartItemCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 bg-primary text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-semibold"
                  >
                    {cartItemCount}
                  </motion.span>
                )}
              </motion.button>

              <div className="hidden md:flex items-center space-x-2">
                <a
                  href="#"
                  className="text-foreground hover:text-primary transition-colors duration-300"
                >
                  <Facebook size={20} />
                </a>
                <a
                  href="#"
                  className="text-foreground hover:text-primary transition-colors duration-300"
                >
                  <Instagram size={20} />
                </a>
              </div>

              <motion.button
                whileHover={{ rotate: 180 }}
                transition={{ duration: 0.3 }}
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 rounded-full bg-card hover:bg-primary/10 transition-all"
              >
                {darkMode ? <Sun size={20} /> : <Moon size={20} />}
              </motion.button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2"
              >
                <motion.div
                  animate={mobileMenuOpen ? "open" : "closed"}
                  variants={{
                    open: { rotate: 90 },
                    closed: { rotate: 0 },
                  }}
                >
                  {mobileMenuOpen ? (
                    <X size={24} />
                  ) : (
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 6h16M4 12h16M4 18h16"
                      />
                    </svg>
                  )}
                </motion.div>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden nav-blur border-t border-gray-200 dark:border-gray-700"
            >
              <div className="px-4 pt-2 pb-4 space-y-3">
                {["Home", "About", "Our Menus", "Reservation", "Contact"].map(
                  (item) => (
                    <motion.a
                      key={item}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      href={`#${item.toLowerCase().replace(" ", "")}`}
                      onClick={() => setMobileMenuOpen(false)}
                      className="block py-2 text-foreground hover:text-primary transition-colors"
                    >
                      {item}
                    </motion.a>
                  )
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Hero Section */}
      <section
        id="home"
        className="min-h-screen flex items-center justify-center relative overflow-hidden"
      >
        <div className="absolute inset-0">
          <img
            src="/main_section_background2.jpg"
            alt="Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/50" />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center z-10 px-4"
        >
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-primary text-xs sm:text-sm tracking-widest mb-4 uppercase"
          >
            More Flavor For Less
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-4xl sm:text-5xl md:text-7xl font-serif text-white mb-6"
          >
            Taste The
            <br />
            Difference
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-gray-200 max-w-2xl mx-auto mb-8 text-sm sm:text-base px-4"
          >
            When the going gets tough, the tough get grilling. Bringing heat to
            your meat. No one can compete with our meat
          </motion.p>
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowMenusPage(true)}
            className="bg-primary hover:bg-primary-dark text-white px-6 sm:px-8 py-3 rounded-sm transition-all uppercase tracking-wider text-sm"
          >
            Our Menus
          </motion.button>
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" className="py-12 sm:py-20 px-4 bg-background">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8 sm:gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative bg-card rounded-lg overflow-hidden shadow-2xl group">
              <div className="absolute inset-0 bg-gradient-to-t from-accent/80 via-transparent to-primary/30 opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-10"></div>
              <div className="bg-gradient-to-br from-accent to-primary p-4 sm:p-8 relative">
                <motion.img
                  src={carouselImages[currentSlide].src}
                  alt={carouselImages[currentSlide].title}
                  className="w-full h-[300px] sm:h-[500px] object-cover rounded-lg"
                  animate={{
                    scale: [1, 1.05, 1],
                    filter: [
                      "brightness(1) contrast(1)",
                      "brightness(1.1) contrast(1.05)",
                      "brightness(1) contrast(1)",
                    ],
                  }}
                  transition={{ duration: 6, repeat: Infinity }}
                />
                <button
                  onClick={() =>
                    setCurrentSlide(
                      (prev) =>
                        (prev - 1 + carouselImages.length) %
                        carouselImages.length
                    )
                  }
                  className="absolute left-4 sm:left-12 top-1/2 -translate-y-1/2 bg-card/80 hover:bg-card text-foreground p-2 sm:p-3 rounded-full transition-all z-20 backdrop-blur-sm"
                >
                  <ChevronLeft size={20} className="sm:w-6 sm:h-6" />
                </button>
                <button
                  onClick={() =>
                    setCurrentSlide(
                      (prev) => (prev + 1) % carouselImages.length
                    )
                  }
                  className="absolute right-4 sm:right-12 top-1/2 -translate-y-1/2 bg-card/80 hover:bg-card text-foreground p-2 sm:p-3 rounded-full transition-all z-20 backdrop-blur-sm"
                >
                  <ChevronRight size={20} className="sm:w-6 sm:h-6" />
                </button>
              </div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileHover={{ opacity: 1, y: 0 }}
                className="absolute bottom-4 sm:bottom-8 left-4 sm:left-8 right-4 sm:right-8 opacity-0 transition-all z-20"
              >
                <div className="bg-card/90 backdrop-blur-sm p-4 sm:p-6 rounded-lg">
                  <p className="text-foreground font-serif text-xs sm:text-sm tracking-widest">
                    {carouselImages[currentSlide].title}
                  </p>
                  <p className="text-muted mt-2 text-sm sm:text-base">
                    {carouselImages[currentSlide].description}
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-4 sm:space-y-6"
          >
            <p className="text-primary text-xs sm:text-sm tracking-widest uppercase">
              Your Special Occasion Destination
            </p>
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-serif text-foreground leading-tight">
              The Wilma is a premium taste that yearns to be{" "}
              <span className="text-primary italic">savored</span>, ground beef
              between your <span className="italic">teeth</span>
            </h3>
            <div className="flex space-x-2 pt-4">
              {carouselImages.map((_img, idx) => (
                <motion.button
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  whileHover={{ scale: 1.2 }}
                  className={`h-1 bg-primary rounded transition-all duration-300 ${
                    idx === currentSlide ? "w-10 opacity-100" : "w-5 opacity-40"
                  }`}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Popular Dishes */}
      <section id="ourmenus" className="py-12 sm:py-20 px-4 bg-card">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8 sm:mb-12"
          >
            <p className="text-primary text-xs sm:text-sm tracking-widest uppercase mb-2">
              Customer Favorites
            </p>
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-serif text-foreground mb-4">
              Popular Dishes
            </h3>
            <p className="text-muted max-w-2xl mx-auto text-sm sm:text-base">
              Discover our most loved dishes, carefully crafted by our expert
              chefs
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-12"
          >
            {popularItems.map((item) => (
              <motion.div
                key={item.id}
                variants={fadeInUp}
                whileHover={{ y: -8, scale: 1.02 }}
                className="bg-background rounded-lg overflow-hidden shadow-lg cursor-pointer"
              >
                <div className="relative h-48 sm:h-56 overflow-hidden">
                  <motion.img
                    src={item.image}
                    alt={item.name}
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.4 }}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-primary text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm flex items-center gap-1">
                    <Star size={12} fill="currentColor" />
                    {item.rating}
                  </div>
                </div>
                <div className="p-4 sm:p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="text-base sm:text-lg font-serif text-foreground">
                      {item.name}
                    </h4>
                    <span className="text-primary font-semibold text-sm sm:text-base">
                      ${item.price}
                    </span>
                  </div>
                  <p className="text-muted text-xs sm:text-sm mb-4 line-clamp-2">
                    {item.description}
                  </p>
                  <span className="inline-block text-xs text-primary bg-primary/10 px-2 sm:px-3 py-1 rounded-full">
                    {item.category}
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowMenusPage(true)}
              className="bg-primary hover:bg-primary-dark text-white px-6 sm:px-8 py-3 rounded-sm transition-all uppercase tracking-wider text-sm"
            >
              View Full Menu
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Chef Recommend */}
      <section className="py-12 sm:py-20 px-4 bg-background">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8 sm:gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-4 sm:space-y-6 order-2 md:order-1"
          >
            <p className="text-primary text-xs sm:text-sm tracking-widest uppercase">
              Delight In Every Bite
            </p>
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-serif text-foreground">
              Our Chef
              <br />
              Recommend
            </h3>
            <p className="text-muted leading-relaxed text-sm sm:text-base">
              Exercitation photo booth stumptown tote bag Banksy, elit small
              batch freegan sed. Craft beer elit seitan exercitation
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowMenusPage(true)}
              className="border-2 border-primary text-primary hover:bg-primary hover:text-white px-6 sm:px-8 py-3 rounded-sm transition-all uppercase tracking-wider text-sm"
            >
              View Menus
            </motion.button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="order-1 md:order-2"
          >
            <div className="bg-card rounded-lg overflow-hidden shadow-2xl group">
              <div className="h-64 sm:h-96 bg-gradient-to-br from-primary to-accent flex items-center justify-center relative overflow-hidden">
                <motion.div
                  initial={{ opacity: 0.3 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 1 }}
                  className="absolute inset-0"
                >
                  <img
                    src="/recommended_chef_plate.jpg"
                    className="object-center w-full h-full object-cover"
                    alt="Chef's recommendation"
                  />
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Reservation Section */}
      <ReservationSection />

      {/* Contact Section */}
      <ContactSection />

      {/* Footer */}
      <footer className="bg-card py-8 sm:py-12 px-4 border-t border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl sm:text-3xl font-serif text-primary mb-2">
              Wilma
            </h2>
            <p className="text-xs tracking-widest text-muted mb-6">
              RESTAURANT
            </p>
            <div className="flex justify-center space-x-6 mb-6">
              <motion.a
                whileHover={{ scale: 1.2, color: "var(--primary)" }}
                href="#"
                className="text-foreground transition-colors duration-300"
              >
                <Facebook size={24} />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.2, color: "var(--primary)" }}
                href="#"
                className="text-foreground transition-colors duration-300"
              >
                <Instagram size={24} />
              </motion.a>
            </div>
            <p className="text-muted text-xs sm:text-sm">
              © 2024 Wilma Restaurant. All rights reserved.
            </p>
          </motion.div>
        </div>
      </footer>

      {/* Cart */}
      <Cart
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        cart={cart}
        updateQuantity={updateQuantity}
        removeItem={removeItem}
        darkMode={darkMode}
      />
    </div>
  );
};

// =========================
// Styles
// =========================
const styles = `
  :root {
    --background: #f5f1eb;
    --foreground: #1a1a1a;
    --card: #ffffff;
    --card-foreground: #1a1a1a;
    --primary: #d4a574;
    --primary-dark: #b8935f;
    --accent: #2d4a3e;
    --muted: #6b7280;
  }

  .dark {
    --background: #0f1419;
    --foreground: #e5e7eb;
    --card: #1a2332;
    --card-foreground: #e5e7eb;
    --primary: #d4a574;
    --primary-dark: #b8935f;
    --accent: #3d5a4d;
    --muted: #9ca3af;
  }

  .bg-background { background-color: var(--background); }
  .text-foreground { color: var(--foreground); }
  .bg-card { background-color: var(--card); }
  .text-card-foreground { color: var(--card-foreground); }
  .text-primary { color: var(--primary); }
  .bg-primary { background-color: var(--primary); }
  .bg-primary-dark { background-color: var(--primary-dark); }
  .hover\\:bg-primary-dark:hover { background-color: var(--primary-dark); }
  .text-accent { color: var(--accent); }
  .text-muted { color: var(--muted); }
  
  .nav-blur {
    backdrop-filter: blur(12px);
    background-color: var(--card);
    opacity: 0.95;
  }

  .scrollbar-hide::-webkit-scrollbar {
    display: none;
  }
  
  .scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }

  * {
    transition-property: background-color, border-color, color, fill, stroke;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 300ms;
  }

  @media (max-width: 640px) {
    .line-clamp-2 {
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
  }
`;

export default WilmaRestaurant;
