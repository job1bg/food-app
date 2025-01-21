import { createContext, useReducer } from "react";
import { Meal } from "src/interfaces/meal";

type CartAction =
  | { type: "ADD_ITEM"; item: Meal }
  | { type: "REMOVE_ITEM"; id: string };

interface CartState {
  items: Meal[];
}

const CartContext = createContext<{
  items: Meal[];
  addItem: (item: Meal) => void;
  removeItem: (id: string) => void;
}>({
  items: [],
  addItem: () => {},
  removeItem: () => {},
});

function cartReducer(
  state: { items: Meal[] },
  action: CartAction
): { items: Meal[] } {
  switch (action.type) {
    case "ADD_ITEM": {
      const existingItemIndex = state.items.findIndex(
        (item) => item.id === action.item.id
      );

      const updatedItems = [...state.items];
      if (existingItemIndex > -1) {
        // Update quantity if the item already exists
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + 1,
        };
      } else {
        // Add new item with quantity 1
        updatedItems.push({ ...action.item, quantity: 1 });
      }

      return { items: updatedItems };
    }

    case "REMOVE_ITEM": {
      const existingItemIndex = state.items.findIndex(
        (item) => item.id === action.id
      );

      if (existingItemIndex === -1) {
        return state; // Item not found, no changes
      }

      const updatedItems = [...state.items];
      const existingItem = updatedItems[existingItemIndex];

      if (existingItem.quantity > 1) {
        // Decrease quantity by 1 if greater than 1
        updatedItems[existingItemIndex] = {
          ...existingItem,
          quantity: existingItem.quantity - 1,
        };
      } else {
        // Remove item if quantity is 1
        updatedItems.splice(existingItemIndex, 1);
      }

      return { items: updatedItems };
    }

    default:
      return state;
  }
}

const CartContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cart, dispatchCartAction] = useReducer(cartReducer, { items: [] });

  const addItem = (item: Meal) => {
    dispatchCartAction({ type: "ADD_ITEM", item });
  };

  const removeItem = (id: string) => {
    dispatchCartAction({ type: "REMOVE_ITEM", id });
  };

  return (
    <CartContext.Provider value={{ items: cart.items, addItem, removeItem }}>
      {children}
    </CartContext.Provider>
  );
};

export { CartContext, CartContextProvider };
