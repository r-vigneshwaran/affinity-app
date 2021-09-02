import React from 'react';
import { Link } from 'react-router-dom';

const Checkout = ({ subTotal }) => {
  return (
    <div className="checkout flex-row justify-content-between w-100">
      <Link to="/" className="back flex-row flex-center">
        <i className="bx bx-arrow-back"></i>
        <p>Back to Shop</p>
      </Link>
      {subTotal && <p>SubTotal &nbsp; : &nbsp; {subTotal}</p>}

      <div className="sub-total flex-row">
        <Link to="/checkout" className="btn-checkout">
          Checkout
        </Link>
      </div>
    </div>
  );
};

export default Checkout;
