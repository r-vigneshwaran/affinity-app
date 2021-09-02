import axios from 'axios';
import { actionTypes } from '../constants';

const {
  SET_PRODUCTS_LIST,
  SET_LOADER,
  SET_PRODUCT,
  SET_CATEGORIES,
  SET_CART_COUNT,
  SET_ITEM_CART,
  SET_USER_DATA
} = actionTypes;

export const setLoader = (payload) => ({ type: SET_LOADER, payload });

export const getProductsList = () => async (dispatch) => {
  dispatch({ type: SET_LOADER, payload: true });
  axios
    .get('https://fakestoreapi.com/products')
    .then((response) => {
      dispatch({ type: SET_PRODUCTS_LIST, payload: response.data });
      dispatch({ type: SET_LOADER, payload: false });
    })
    .catch((err) => {
      console.log(err);
      dispatch({ type: SET_LOADER, payload: false });
    });
};

export const getProduct = (id) => async (dispatch) => {
  dispatch({ type: SET_LOADER, payload: true });
  axios
    .get(`https://fakestoreapi.com/products/${id}`)
    .then((response) => {
      dispatch({ type: SET_PRODUCT, payload: response.data });
      dispatch({ type: SET_LOADER, payload: false });
    })
    .catch((err) => {
      console.log(err);
      dispatch({ type: SET_LOADER, payload: false });
    });
};

export const getCategories = () => async (dispatch) => {
  dispatch({ type: SET_LOADER, payload: true });
  axios
    .get('https://fakestoreapi.com/products/categories')
    .then((response) => {
      dispatch({ type: SET_CATEGORIES, payload: response.data });
      dispatch({ type: SET_LOADER, payload: false });
    })
    .catch((err) => {
      console.log(err);
      dispatch({ type: SET_LOADER, payload: false });
    });
};
export const addToCart = (item, count) => async (dispatch) => {
  dispatch({ type: SET_CART_COUNT, payload: count });
  dispatch({ type: SET_ITEM_CART, payload: item });
};

export const getProductsBasedOnCategories = (category) => async (dispatch) => {
  dispatch({ type: SET_LOADER, payload: true });
  category &&
    axios
      .get(`https://fakestoreapi.com/products/category/${category}`)
      .then((response) => {
        dispatch({ type: SET_PRODUCTS_LIST, payload: response.data });
        dispatch({ type: SET_LOADER, payload: false });
      })
      .catch((err) => {
        console.log(err);
        dispatch({ type: SET_LOADER, payload: false });
      });
};

export const requestCheckoutURL = (data) => async (dispatch) => {
  dispatch({ type: SET_LOADER, payload: true });
  const url = `${process.env.REACT_APP_SERVER_URL}/create-checkout-session`;
  const headers = {
    'Content-Type': 'application/json'
  };
  axios
    .post(url, JSON.stringify(data), {
      headers: headers
    })
    .then((res) => {
      console.log(res);
      dispatch({ type: SET_LOADER, payload: false });
    })
    .catch((err) => {
      console.log(err);
      dispatch({ type: SET_LOADER, payload: false });
    });
};

export const setUserData = (payload) => ({ type: SET_USER_DATA, payload });
