import CartContext from "./cart-context";
import React, { useReducer } from "react";
import { act } from "react-dom/test-utils";

const defaultState = { items: [], totalAmount: 0 };

const cartReducer = (state, action) => {
  if (action.type === "Add") {
    const updatedTotalAmount =
      state.totalAmount + action.item.price * action.item.amount;
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );

    const existingCartItem = state.items[existingCartItemIndex];

    let updatedItems;
    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + action.item.amount,
      };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      updatedItems = state.items.concat(action.item);
    }

    //const updatedItems = state.items.concat(action.item);

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }

  if (action.type === "Remove") {
    const existingCartItemIndex = state.items.findIndex(
      
      (item) => item.id === action.item.id
    );
    const existingItem = state.items[existingCartItemIndex];
    const updatedTotalAmount = state.totalAmount -existingItem.price;
    let updatedItems;
    if(existingItem.amount === 1){
      updatedItems =state.items.filter(item=>item.id !==action.id);

    }else{
      const updatedItem={...existingItem, amount:existingItem.amount-1};
      updatedItems[existingCartItemIndex ]= updatedItem;

    }
    return{
      items:updatedItems,
      totalAmount:updatedTotalAmount
    }
  }
  return defaultState;
};

const CartProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultState);

  const addItemtoHandler = (item) => {
    dispatchCartAction({ type: "Add", item: item });
  };

  const removeItemHandler = (id) => {
    dispatchCartAction({ type: "Remove", id: id });
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemtoHandler,
    removeItem: removeItemHandler,
  };

  return <CartContext value={cartContext}>{props.children}</CartContext>;
};

export default CartProvider;
