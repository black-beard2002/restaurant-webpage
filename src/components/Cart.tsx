import { useCart } from "@/context/CartProvider";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from "@/components/ui/sheet";
import { ImageIcon, Minus, Plus, ShoppingCart, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { handleImageSrc } from "@/utils/helpers";

const Cart = () => {
  const { cart, updateQuantity, clearCart, removeFromCart, getTotal } =
    useCart();

  return (
    <Sheet>
      <SheetTrigger className="relative hover:bg-accent/60 cursor-pointer p-2 rounded-md hover:scale-105 transition">
        <ShoppingCart size={18} />
        {cart.length > 0 && (
          <span className="absolute -top-1 -right-1 bg-primary text-foreground text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center">
            {cart.length}
          </span>
        )}
      </SheetTrigger>

      <SheetContent className="flex flex-col p-0">
        <div className="p-6 border-b">
          <SheetHeader>
            <SheetTitle className="text-lg font-semibold text-foreground">
              Your Cart
            </SheetTitle>
          </SheetHeader>
        </div>

        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <ShoppingCart
                size={48}
                className="mx-auto text-muted-foreground mb-4 opacity-50"
              />
              <p className="text-muted-foreground text-sm">
                Your cart is empty. Add something delicious!
              </p>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={item.item.id}
                className="flex flex-col sm:flex-row sm:items-center gap-4 bg-card rounded-xl shadow-sm p-4 border border-border/40 hover:shadow-md transition-shadow"
              >
                {item.item.main_image ? (
                  <img
                    src={handleImageSrc(item.item.main_image)}
                    alt={item.item.name}
                    className="w-20 h-20 rounded-lg object-cover"
                  />
                ) : (
                  <ImageIcon />
                )}

                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <h3 className="font-medium text-base text-foreground truncate">
                      {item.item.name}
                    </h3>
                    <p className="text-primary font-semibold text-sm">
                      ${item.item.price?.toFixed(2)}
                    </p>
                  </div>

                  {item.excludedIngredients?.length > 0 && (
                    <p className="text-xs text-muted-foreground mt-1">
                      No: {item.excludedIngredients.join(", ")}
                    </p>
                  )}

                  <div className="flex justify-between items-center mt-3">
                    <div className="flex items-center gap-2 bg-accent rounded-full px-2 py-1">
                      <button
                        onClick={() => updateQuantity(item, "minus")}
                        className="p-1 hover:bg-primary/10 rounded-full transition"
                      >
                        <Minus size={14} className="text-primary" />
                      </button>
                      <span className="w-6 text-center text-sm font-medium text-foreground">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item, "plus")}
                        className="p-1 hover:bg-primary/10 rounded-full transition"
                      >
                        <Plus size={14} className="text-primary" />
                      </button>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.item.id)}
                      className="p-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-full transition"
                    >
                      <Trash2 size={16} className="text-red-500" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <SheetFooter className="border-t p-4 sm:p-6 bg-background">
            <div className="w-full flex flex-col gap-4">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-semibold text-foreground">
                  ${getTotal().toFixed(2)}
                </span>
              </div>

              <div className="flex gap-3">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={clearCart}
                >
                  Clear
                </Button>
                <Button className="flex-1 bg-primary hover:bg-primary/90">
                  Checkout
                </Button>
              </div>
            </div>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default Cart;
