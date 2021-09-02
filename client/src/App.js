import { BaseLayout } from 'components';
import { Landing, Cart, Product, Checkout } from 'pages';
import React from 'react';
import { Route, Switch } from 'react-router-dom';

function App() {
  return (
    <Switch>
      <Route
        exact
        path="/"
        render={(props) => (
          <BaseLayout banner isShowSidebar {...props} Component={Landing} />
        )}
      />
      <Route
        exact
        path="/cart"
        render={(props) => (
          <BaseLayout isShowSidebar={false} {...props} Component={Cart} />
        )}
      />
      <Route
        exact
        path="/checkout"
        render={(props) => (
          <BaseLayout isShowSidebar={false} {...props} Component={Checkout} />
        )}
      />
      <Route
        exact
        path="/product/:id"
        render={(props) => (
          <BaseLayout isShowSidebar={false} {...props} Component={Product} />
        )}
      />
    </Switch>
  );
}

export default App;
