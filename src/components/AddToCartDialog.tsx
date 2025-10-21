import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Minus, Plus, Check, X } from "lucide-react";
import { CartItem, ItemSchema } from "@/lib/types";
import { handleImageSrc } from "@/utils/helpers";

const AddToCartDialog: React.FC<{
  item: ItemSchema | null;
  isOpen: boolean;
  openHandler: (open: boolean) => void;
  onAddToCart: (item: CartItem) => void;
}> = ({ item, isOpen, openHandler, onAddToCart }) => {
  const [excludedIngredients, setExcludedIngredients] = useState<string[]>([]);
  const [quantity, setQuantity] = useState<number>(1);
  const [ingredientsList, setIngredientsList] = useState<string[]>([]);
  useEffect(() => {
    setExcludedIngredients([]);
    setQuantity(1);

    if (
      item?.custom_properties &&
      Array.isArray(item.custom_properties.ingredients) &&
      item.custom_properties.ingredients.every((i) => typeof i === "string")
    ) {
      setIngredientsList(item.custom_properties.ingredients);
    } else {
      setIngredientsList([]);
    }
  }, [item]);
  if (!item) return null;

  const toggleIngredient = (ingredient: string) => {
    setExcludedIngredients((prev) =>
      prev.includes(ingredient)
        ? prev.filter((i) => i !== ingredient)
        : [...prev, ingredient]
    );
  };

  const handleAdd = () => {
    onAddToCart({ item, quantity, excludedIngredients });
  };

  const increase = () => setQuantity((q) => q + 1);
  const decrease = () => setQuantity((q) => (q > 1 ? q - 1 : 1));

  return (
    <Dialog open={isOpen} onOpenChange={openHandler}>
      <DialogContent className="max-w-lg sm:max-w-xl md:max-w-2xl rounded-2xl overflow-hidden p-0">
        {/* Header Section */}
        <div className="relative w-full h-48 sm:h-60 md:h-72 overflow-hidden">
          <img
            src={
              handleImageSrc(item.main_image ?? "") ??
              "/images/item_image_placeholder.jpg"
            }
            alt={item.name}
            className="object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent"></div>
          <div className="absolute bottom-4 left-4 text-foreground">
            <h2 className="text-lg sm:text-xl font-semibold">{item.name}</h2>
            <p className="text-sm opacity-80">
              ${(item.sale_price ?? item.price)?.toFixed(2)}
            </p>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-5 sm:p-6 space-y-6">
          <div>
            <DialogHeader>
              <DialogTitle className="text-lg font-semibold">
                Customize your order
              </DialogTitle>
              <DialogDescription className="text-sm text-muted-foreground">
                You can exclude ingredients or adjust quantity before adding to
                cart.
              </DialogDescription>
            </DialogHeader>
          </div>

          {/* Ingredients Section */}
          {ingredientsList && ingredientsList.length > 0 && (
            <div>
              <h4 className="text-sm font-medium mb-2">Exclude Ingredients:</h4>
              <div className="flex flex-wrap gap-2">
                {ingredientsList.map((ingredient) => {
                  const isExcluded = excludedIngredients.includes(ingredient);
                  return (
                    <button
                      key={ingredient}
                      onClick={() => toggleIngredient(ingredient)}
                      className={`px-3 py-1.5 rounded-full text-xs sm:text-sm border transition-all ${
                        isExcluded
                          ? "bg-red-500/10 text-red-600 border-red-300 dark:border-red-800"
                          : "bg-accent text-accent-foreground hover:bg-accent/80 border-border"
                      }`}
                    >
                      {isExcluded ? (
                        <span className="flex items-center gap-1">
                          <X size={12} /> {ingredient}
                        </span>
                      ) : (
                        <span className="flex items-center gap-1">
                          <Check size={12} /> {ingredient}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Quantity Controls */}
          <div className="flex items-center justify-between mt-4">
            <span className="text-sm font-medium">Quantity</span>
            <div className="flex items-center gap-2 bg-accent rounded-full px-3 py-1.5">
              <button
                onClick={decrease}
                className="p-1 hover:bg-primary/10 rounded-full transition"
              >
                <Minus size={14} className="text-primary" />
              </button>
              <span className="text-accent-foreground font-medium w-6 text-center">
                {quantity}
              </span>
              <button
                onClick={increase}
                className="p-1 hover:bg-primary/10 rounded-full transition"
              >
                <Plus size={14} className="text-primary" />
              </button>
            </div>
          </div>
        </div>

        {/* Footer Section */}
        <DialogFooter className="bg-muted/30 px-5 sm:px-6 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-t">
          <div className="text-sm font-medium text-foreground">
            Total:{" "}
            <span className="text-primary font-semibold">
              ${((item.sale_price ?? item.price ?? 1) * quantity).toFixed(2)}
            </span>
          </div>
          <Button
            className="w-full sm:w-auto bg-primary text-white hover:bg-primary/90"
            onClick={handleAdd}
          >
            Add to Cart
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddToCartDialog;
