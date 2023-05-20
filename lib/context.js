import React, { createContext, use, useContext, useState } from "react";

const ShopContext = createContext();

export const StateContext = ({ children }) => {
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [qty, setQty] = useState(1);
  const [totalQty, setTotalQty] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  const increaseQty = () => {
    setQty((prevQty) => prevQty + 1);
  };

  const decreaseQty = () => {
    setQty((prevQty) => {
      if (prevQty - 1 < 1) return 1;
      return prevQty - 1;
    });
  };

  const handleAdd = (product, quantity) => {
    //increase total price
    setTotalPrice((prevTotal) => prevTotal + product.price * quantity);

    //increase total quantity
    setTotalQty((prevQty) => prevQty + quantity);

    //check the item is existed in array
    const exist = cartItems.find((item) => product._id === item._id);
    if (exist) {
      setCartItems((items) =>
        items.map((item) =>
          item._id === product._id
            ? { ...exist, quantity: quantity + item.quantity }
            : item
        )
      );
    } else {
      setCartItems([...cartItems, { ...product, quantity }]);
    }
  };

  const handleRemove = (product) => {
    //decrease total price
    setTotalPrice((prevTotal) => prevTotal - product.price);

    //increase total quantity
    setTotalQty((prevQty) => prevQty - 1);

    //check the item is existed in array
    const exist = cartItems.find((item) => product._id === item._id);
    if (exist.quantity === 1) {
      setCartItems(cartItems.filter((item) => item._id !== exist._id));
    } else {
      setCartItems((prevState) =>
        prevState.map((item) =>
          item._id === exist._id
            ? { ...exist, quantity: exist.quantity - 1 }
            : item
        )
      );
    }
  };

  return (
    <ShopContext.Provider
      value={{
        qty,
        setQty,
        increaseQty,
        decreaseQty,
        cartItems,
        handleAdd,
        showCart,
        setShowCart,
        handleRemove,
        totalQty,
        totalPrice,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useStateContext = () => useContext(ShopContext);
