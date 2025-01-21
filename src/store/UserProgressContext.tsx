import { createContext, useState } from "react";

const UserProgressContext = createContext<{
  progress: string;
  showCart: () => void;
  hideCart: () => void;
  showCheckout: () => void;
  hideCheckout: () => void;
}>({
  progress: "",
  showCart: () => {},
  hideCart: () => {},
  showCheckout: () => {},
  hideCheckout: () => {},
});

const UserProgressContextProivder: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [userProgress, setUserProgress] = useState<string>("");

  function showCart() {
    setUserProgress("cart");
  }

  function hideCart() {
    setUserProgress("");
  }

  function showCheckout() {
    setUserProgress("checkout");
  }

  function hideCheckout() {
    setUserProgress("");
  }

  return (
    <UserProgressContext.Provider
      value={{
        progress: userProgress,
        showCart,
        hideCart,
        showCheckout,
        hideCheckout,
      }}
    >
      {children}
    </UserProgressContext.Provider>
  );
};

export { UserProgressContext, UserProgressContextProivder };
