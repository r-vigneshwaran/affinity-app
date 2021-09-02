/**
 * This module contains all the Routes used in the application.
 * Always try to add new route in the end.
 */
export const Routes = {
  //login and signup
  Signin: { path: '/registration/sign-in' },
  Login: { path: '/registration/login' },
  Signup: { path: '/registration/sign-up' },
  CreatePassword: { path: '/registration/create-password' },
  ForgotPassword: { path: '/registration/forgot-password' },
  ResetPassword: { path: '/registration/reset-password' },

  //Landing screen
  LandingPage: { path: '/' },

  // other screens
  Cart: { path: '/cart' },
  Product: { path: '/product' },
  Checkout: { path: '/checkout' }
};

/** Array or routes that is accessible to all types of user */
export const GenericRoutes = [Routes.UserRoles];
