import App from 'App';
import React from 'react';
import ReactDOM from 'react-dom';
import './scss/main.scss';
import reducers from 'reducer';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

const middlewares = [thunk];
if (process.env.NODE_ENV === 'development') {
  middlewares.push(logger);
}

const store = createStore(reducers, applyMiddleware(...middlewares));

ReactDOM.render(
  <Provider store={store}>
    <Router basename="/">
      <App />
    </Router>
  </Provider>,
  document.getElementById('root')
);
