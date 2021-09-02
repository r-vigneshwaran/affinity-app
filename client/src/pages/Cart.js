import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import CartItem from 'components/CartItem';
import Checkout from './children/Checkout';
import { addToCart } from 'actions';

const Cart = () => {
  const dispatch = useDispatch();
  const [cartItems, setCartItems] = useState([]);
  const [subTotal, setSubTotal] = useState(0);
  const cartList = useSelector((state) => state.products.cart);
  const count = useSelector((state) => state.products.count);

  const handleClickAddToCart = (item) => {
    let newCount;
    let array;
    if (cartList) {
      if (cartList.some((i) => i.id === item.id)) {
        array = cartList.filter((el) => {
          return el.id !== item.id;
        });
        newCount = count - 1;
      } else {
        array = [...cartList, item];
        newCount = count + 1;
      }
    } else {
      array = [item];
      newCount = 1;
    }
    dispatch(addToCart(array, newCount));
  };

  useEffect(() => {
    console.log(cartList);
    if (cartList || cartList?.length > 0) {
      setCartItems(cartList);
      setSubTotal(cartList.reduce((a, b) => a + (b['price'] || 0), 0));
    }
  }, [cartList]);

  return (
    <div
      className={`cart-container ${
        cartList || cartList?.length > 0 ? '' : 'empty'
      }`}
    >
      <h5 className="title">Your Shopping Bag</h5>
      <div className="container flex-col">
        {cartItems.length > 0 ? (
          cartItems.map((item) => (
            <CartItem
              key={item.id}
              item={item}
              handleClickAddToCart={handleClickAddToCart}
              cartItems={cartItems}
              setCartItems={setCartItems}
            />
          ))
        ) : (
          <div className="empty-cart">
            <h4>Empty Cart</h4>
          </div>
        )}
        {count > 0 && <Checkout subTotal={subTotal} />}
      </div>
    </div>
  );
};

export default Cart;
