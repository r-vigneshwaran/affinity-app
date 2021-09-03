/**
 * This Reducer contains the global state which holds keycloakuserInfo, userPermissions,
 * iframeUrl, loader, userSelectedRole, registeredPatient, toast, myProfile,
 * redirectTo Inforamtions dedicated for Authencitations, loading Function, Pop in and Pop out Toast, Roles, Force logout,
 * permissions, redirecting, register and verifying patients. Reducer takes initialState,
 * action type and payload as argument and returns the payload to state corresponding to action type
 * IMPORTANT:
 * Should return state as default in case of no action is produced
 */

import { actionTypes } from '../constants';
const {
  SET_PRODUCTS_LIST,
  SET_ITEM_CART,
  SET_CART_COUNT,
  SET_CATEGORIES,
  SET_USER_DATA
} = actionTypes;

const initialState = {
  productsList: null,
  cart: JSON.parse(localStorage.getItem('cart')) || null,
  count: parseInt(localStorage.getItem('quantity')) || 0,
  categories: null,
  userData: null
};
export default function products(state = initialState, { type, payload }) {
  switch (type) {
    case SET_PRODUCTS_LIST:
      return { ...state, productsList: payload };
    case SET_ITEM_CART:
      localStorage.setItem('cart', JSON.stringify(payload));
      return { ...state, cart: payload };
    case SET_CART_COUNT:
      localStorage.setItem('quantity', payload);
      return { ...state, count: payload };
    case SET_CATEGORIES:
      return { ...state, categories: payload };
    case SET_USER_DATA:
      return { ...state, userData: payload };
    default:
      return state;
  }
}
