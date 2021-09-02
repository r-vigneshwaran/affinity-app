import React, { useEffect, useState } from 'react';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart, getProductsList, requestCheckoutURL } from 'actions';
import { useParams } from 'react-router-dom';
import Checkout from './children/Checkout';
import StripeCheckout from 'react-stripe-checkout';

const Product = () => {
  const dispatch = useDispatch();
  const [product, setProduct] = useState({});
  const [isInCart, setIsInCart] = useState(false);
  const [rating, setRating] = useState(new Array(5).fill(false));
  const productsList = useSelector((state) => state.products.productsList);
  const { id } = useParams();
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
    if (!productsList) {
      dispatch(getProductsList());
    } else {
      const selectedProduct = productsList.find(
        (item) => item.id === parseInt(id)
      );
      setProduct(selectedProduct);
      const array = new Array(5).fill(false);
      for (let i = 0; i < Math.round(selectedProduct.rating.rate); i++) {
        array[i] = true;
      }
      setRating(array);
    }
  }, [dispatch, id, product, productsList]);

  useEffect(() => {
    if (cartList) {
      setIsInCart(cartList.some((i) => i.id === product.id));
    }
  }, [cartList, product]);
  const condition = cartList || cartList?.length > 0;
  return (
    <div className="product-container">
      <div className="app">
        {product && (
          <div className="details">
            <div className="big-img">
              <img src={product.image} alt="" />
            </div>
            <div className="box">
              <div className="row">
                <h2>{product.title}</h2>
                <span>${product.price}</span>
              </div>
              <div className="rate-cate flex-row justify-content-between">
                <div className="rate">
                  <h4>Rating</h4>
                  <div className="rating">
                    {rating.length > 0 &&
                      rating.map((item, index) =>
                        item ? (
                          <FontAwesomeIcon
                            key={index}
                            icon={faStar}
                            color="#ffd513"
                          />
                        ) : (
                          <FontAwesomeIcon
                            key={index}
                            className="grey"
                            icon={faStar}
                            color="#333"
                          />
                        )
                      )}
                  </div>
                </div>
                <div className="category">
                  <h5 className="text-capitalize">
                    Category &nbsp; : &nbsp; {product.category}
                  </h5>
                </div>
              </div>
              <p>Description</p>
              <p>{product.description}</p>

              <button
                disabled={isInCart}
                onClick={() => handleClickAddToCart(product)}
                className={`cart ${isInCart ? 'disabled' : ''}`}
              >
                {isInCart ? 'Added to Cart' : 'Add to cart'}
              </button>
            </div>
          </div>
        )}{' '}
        {condition && <Checkout />}
      </div>
    </div>
  );
};

export default Product;
