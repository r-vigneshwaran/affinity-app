import React, { useState } from 'react';
import { Stepper } from 'components';
import StripeCheckout from 'react-stripe-checkout';
import { requestCheckoutURL } from 'actions';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';

const Checkout = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [currentStep, setCurrentStep] = useState(1);
  const cartList = useSelector((state) => state.products.cart);

  const makePayment = (token) => {
    const items = [1, 2, 3, 4];
    const data = {
      token,
      products: items
    };
    dispatch(requestCheckoutURL(data));
  };
  useEffect(() => {
    if (!cartList || !cartList?.length > 0) {
      history.push('/');
    }
  }, [cartList, history]);
  const ComponentOne = () => {
    const [firstName, setFirstName] = useState('');
    const [middleName, setMiddleName] = useState('');
    const [lastName, setLastName] = useState('');
    const [street, setStreet] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [country, setCountry] = useState('');
    const [pincode, setPincode] = useState('');
    useEffect(() => {
      const userData = JSON.parse(localStorage.getItem('userData'));
      if (userData) {
        setFirstName(userData.firstName);
        setMiddleName(userData.middleName);
        setLastName(userData.lastName);
        setStreet(userData.street);
        setCity(userData.city);
        setState(userData.state);
        setCountry(userData.country);
        setPincode(userData.pincode);
      }
    }, [
      city,
      country,
      firstName,
      lastName,
      middleName,
      pincode,
      state,
      street
    ]);

    const handleSubmit = (e) => {
      e.preventDefault();
      const data = {
        firstName,
        middleName,
        lastName,
        street,
        city,
        state,
        country,
        pincode
      };
      localStorage.setItem('userData', JSON.stringify(data));
      handleClick('next');
    };
    return (
      <div>
        <div className="white-container">
          <form onSubmit={handleSubmit} className="form">
            <fieldset>
              <legend>Personal Details :</legend>{' '}
              <div className="inputs">
                <div className="flex-col">
                  <label htmlFor="">
                    FirstName <span className="required"> *</span>
                  </label>
                  <input
                    required
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="Enter FirstName"
                  />
                </div>
                <div className="flex-col">
                  <label htmlFor="">MiddleName</label>
                  <input
                    type="text"
                    value={middleName}
                    onChange={(e) => setMiddleName(e.target.value)}
                    placeholder="Enter MiddleName"
                  />
                </div>
                <div className="flex-col">
                  <label htmlFor="">
                    LastName<span className="required"> *</span>
                  </label>
                  <input
                    required
                    type="text"
                    onChange={(e) => setLastName(e.target.value)}
                    value={lastName}
                    placeholder="Enter LastName"
                  />
                </div>
              </div>
            </fieldset>
            <fieldset>
              <legend>Address Details :</legend>{' '}
              <div className="inputs">
                <div className="flex-col">
                  <label htmlFor="">
                    Street<span className="required"> *</span>
                  </label>
                  <input
                    required
                    type="text"
                    value={street}
                    onChange={(e) => setStreet(e.target.value)}
                    placeholder="Enter Street"
                  />
                </div>
                <div className="flex-col">
                  <label htmlFor="">
                    City<span className="required"> *</span>
                  </label>
                  <input
                    required
                    type="text"
                    onChange={(e) => setCity(e.target.value)}
                    value={city}
                    placeholder="Enter City"
                  />
                </div>
                <div className="flex-col">
                  <label htmlFor="">
                    State<span className="required"> *</span>
                  </label>
                  <input
                    required
                    type="text"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    placeholder="Enter State"
                  />
                </div>
              </div>
              <div className="inputs">
                <div className="flex-col">
                  <label htmlFor="">
                    Country<span className="required"> *</span>
                  </label>
                  <input
                    required
                    type="text"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    placeholder="Enter Country"
                  />
                </div>
                <div className="flex-col">
                  <label htmlFor="">
                    Pincode<span className="required"> *</span>
                  </label>
                  <input
                    required
                    type="text"
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    placeholder="Enter Pincode"
                  />
                </div>
              </div>
            </fieldset>
            <div className="flex-row w-100 justify-content-between">
              {' '}
              <Link to="/" className="btn-checkout-theme dark link">
                Prev
              </Link>
              <button type="submit" className="btn-checkout-theme">
                Next
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };
  const ComponentTwo = () => {
    const condition = cartList || cartList?.length > 0;
    return (
      <div className="one">
        <h1 className="white-container">
          {' '}
          <div className="form">
            <fieldset>
              <legend>Confirm Products :</legend>{' '}
              {condition &&
                cartList.map((item) => (
                  <React.Fragment key={item.id}>
                    <div className="cart-item trans">
                      <div className="cart-img">
                        <img
                          src={item.image}
                          className="responsive"
                          alt="cart-img"
                        />
                      </div>
                      <div className="cart-title">
                        <p>{item.title}</p>
                      </div>
                      <div className="cart-category">
                        <p>{item.category}</p>
                      </div>
                      <div className="item-count">
                        <div className="count">2</div>
                      </div>
                      <div className="price">
                        <p>${item.price}</p>
                      </div>
                    </div>
                  </React.Fragment>
                ))}
              <div className="sub-total">
                <p>
                  SubTotal : $
                  {condition &&
                    cartList.reduce((a, b) => a + (b['price'] || 0), 0)}
                </p>
              </div>
            </fieldset>
          </div>
          <div className="flex-row w-100 justify-content-between">
            <button
              className="btn-checkout-theme dark"
              onClick={() => handleClick('prev')}
            >
              Prev
            </button>
            <button
              className="btn-checkout-theme"
              onClick={() => handleClick('next')}
            >
              Next
            </button>
          </div>
        </h1>
      </div>
    );
  };

  const ComponentFour = () => {
    const userData = JSON.parse(localStorage.getItem('userData'));
    return (
      <div className="one">
        <div className="white-container">
          <fieldset>
            <legend>Ready To Pay :</legend>{' '}
            <div className="inputs">
              <div className="flex-col">
                <label htmlFor="">FirstName:</label>
                <p>{userData.firstName}</p>
              </div>
              <div className="flex-col">
                <label htmlFor="">MiddleName:</label>
                <p>{userData?.middleName ? userData?.middleName : 'N/a'}</p>
              </div>
              <div className="flex-col">
                <label htmlFor="">LastName:</label>
                <p>{userData.lastName}</p>
              </div>
            </div>
            <div className="inputs">
              <div className="flex-col">
                <label htmlFor="">Street:</label>
                <p>{userData.street}</p>
              </div>
              <div className="flex-col">
                <label htmlFor="">City:</label>
                <p>{userData.city}</p>
              </div>
              <div className="flex-col">
                <label htmlFor="">State:</label>
                <p>{userData.state}</p>
              </div>
            </div>
            <div className="inputs">
              <div className="flex-col">
                <label htmlFor="">Country:</label>
                <p>{userData.country}</p>
              </div>
              <div className="flex-col">
                <label htmlFor="">Pincode:</label>
                <p>{userData.pincode}</p>
              </div>
            </div>
          </fieldset>

          <div className="flex-row w-100 justify-content-between">
            <button
              className="btn-checkout-theme dark"
              onClick={() => handleClick('prev')}
            >
              Prev
            </button>{' '}
            <StripeCheckout
              stripeKey="pk_test_51HvktcLzt4zU11Q8h6qzNKWlfKyTXm5dbEXuAWxvj9PYaSP0BF7tE0WTUICPoqVDq2w2VruvAeBoz1QzIRHQKrc1004cHR37yp"
              token={makePayment}
              name="ONLINE SHOPPING"
            />
          </div>
        </div>
      </div>
    );
  };
  const stepsArray = [
    {
      description: 'Details',
      component: <ComponentOne />
    },
    {
      description: 'Confirm Products',
      component: <ComponentTwo />
    },
    {
      description: 'Review',
      component: <ComponentFour />
    }
  ];
  const handleClick = (action) => {
    if (action === 'next') {
      if (currentStep === stepsArray.length) {
        return setCurrentStep(stepsArray.length);
      }
      setCurrentStep(currentStep + 1);
    }
    if (action === 'prev') {
      if (currentStep === 1) {
        return setCurrentStep(1);
      }
      setCurrentStep(currentStep - 1);
    }
  };
  return (
    <div className="checkout-container">
      <h4 className="text-center">Checkout</h4>
      <div className="stepper-container-horizontal">
        <Stepper
          direction="horizontal"
          currentStep={currentStep}
          steps={stepsArray}
          className="mt-4"
        />{' '}
      </div>
    </div>
  );
};

export default Checkout;
