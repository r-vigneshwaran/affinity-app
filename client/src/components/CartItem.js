import React, { useEffect, useState } from 'react';

const CartItem = ({ item, handleClickAddToCart, cartItems, setCartItems }) => {
  const [count, setCount] = useState(1);
  const handleClickPlus = () => {
    if (count >= 10) return;
    setCount(count + 1);
  };
  const handleClickMinus = () => {
    if (count <= 1) return;
    setCount(count - 1);
  };
  useEffect(() => {
    if (count) {
      let product = cartItems.find((obj) => obj.id === item.id);
      const productIndex = cartItems.findIndex((obj) => obj.id === item.id);
      console.log(product['price'] * count, productIndex, cartItems);
      product['price'] = product.price * count;
      cartItems[productIndex] = product;
      setCartItems(cartItems);
    }
  }, [cartItems, count, item.id, setCartItems]);
  return (
    <div className="cart-item">
      <div className="cart-img">
        <img src={item.image} className="responsive" alt="cart-img" />
      </div>
      <div className="cart-title">
        <p>{item.title}</p>
        <small>{item.category}</small>
      </div>
      <div className="cart-category">
        <p>{item.category}</p>
      </div>
      <div className="item-count">
        <div className="count">{count}</div>
        <div className="count-icons">
          <i onClick={handleClickPlus} className="bx bxs-plus-circle"></i>
          <i onClick={handleClickMinus} className="bx bxs-minus-circle"></i>
        </div>
      </div>
      <div className="price">
        <p>${item.price * count}</p>
      </div>
      <div className="remove">
        <i onClick={() => handleClickAddToCart(item)} className="bx bx-x"></i>
      </div>
    </div>
  );
};

export default CartItem;
