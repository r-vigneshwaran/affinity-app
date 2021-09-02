import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getProductsList, addToCart } from 'actions';
import Card from 'components/Card';

const Landing = ({ selectedCategory }) => {
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  const productsList = useSelector((state) => state.products.productsList);
  const cartList = useSelector((state) => state.products.cart);
  const count = useSelector((state) => state.products.count);

  useEffect(() => {
    if (!productsList) {
      dispatch(getProductsList());
    } else {
      setProducts(productsList);
    }
  }, [dispatch, productsList]);

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
  return (
    <div className="w-100 h-100 flex-center">
      <div className="main-content-area">
        <div className="category">
          <h4 className="text-white text-capitalize">
            Category : {selectedCategory}
          </h4>
        </div>
        <div className="container">
          {products.length > 0 &&
            products.map((item) => (
              <Card
                key={item.id}
                item={item}
                handleClickAddToCart={handleClickAddToCart}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Landing;
