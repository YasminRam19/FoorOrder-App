import { createContext, useState } from "react";

//The progress could be later "cart" or "checkout"
const UserProgressContext = createContext({
  progress: "",
  showCart: () => {},
  hideCart: () => {},
  showCheckout: () => {},
  hideCheckout: () => {},
});

export default UserProgressContext;

export const UserProgressContextProvider = ({ children }) => {
  const [userProgress, setUserProgress] = useState("");

  const showCart = () => {
    setUserProgress("cart");
  };
  const hideCart = () => {
    setUserProgress("");
  };
  const showCheckout = () => {
    setUserProgress("checkout");
  };
  const hideCheckout = () => {
    setUserProgress("");
  };

  const userProgressCtx = {
    progress: userProgress,
    showCart,
    hideCart,
    showCheckout,
    hideCheckout,
  };

  return (
    <UserProgressContext.Provider value={userProgressCtx}>
      {children}
    </UserProgressContext.Provider>
  );
};
