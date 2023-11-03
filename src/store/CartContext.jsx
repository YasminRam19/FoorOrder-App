import React, { useReducer } from "react";

const CartContext = React.createContext({
  items: [],
  addItem: (item) => {},
  removeItem: (id) => {},
});
export default CartContext;

const cartReducer = (state, action) => {
  if (action.type === "ADD_ITEM") {
    //Update the state to add a meal item
    //Check if the item we receive is already in the cart
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );

    const updatedItems = [...state.items];

    //If the item already exists in the cart
    if (existingCartItemIndex > -1) {
      const existingItem = state.items[existingCartItemIndex];
      const updatedItem = {
        ...existingItem,
        quantity: existingItem.quantity + 1,
      };

      updatedItems[existingCartItemIndex] = updatedItem;
    }
    //If the item is new (does not exist in the cart yet)
    else {
      updatedItems.push({ ...action.item, quantity: 1 });
    }
    return { ...state, items: updatedItems };
  }
  if (action.type === "REMOVE_ITEM") {
    //update the state to remove a meal item
    //Check if the item we receive is already in the cart
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );
    //We just remove items of existing items
    const existingCartItem = state.item[existingCartItemIndex];
    const updatedItems = [...state.items];

    //If there is only one quantity, we will remove the item from the cart
    if (existingCartItem.quantity == 1) {
      updatedItems.splice((existingCartItemIndex, 1));
    } else {
      const updatedItem = {
        ...existingCartItem,
        quantity: existingCartItem.quantity - 1,
      };
      updatedItems[existingCartItemIndex] = updatedItem;
    }
    return { ...state, items: updatedItems };
  }
  return state;
};

export const CartContextProvider = ({ children }) => {
  const [cart, dispatchCartAction] = useReducer(cartReducer, { items: [] });

  const addItem = (item) => {
    dispatchCartAction({ type: "ADD_ITEM", item: item });
  };
  const removeItem = (id) => {
    dispatchCartAction({ type: "REMOVE_ITEM", id: id });
  };
  const cartContext = {
    items: cart.items,
    addItem: addItem,
    removeItem: removeItem,
  };

  console.log(cartContext);

  return (
    <CartContext.Provider value={cartContext}>{children}</CartContext.Provider>
  );
};
