import React from "react";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { EcommerceContextProvider } from "./contexts/EcommerceContext";

import Header from "./components/Header/Header";
import Products from "./components/Products/Products";
import Login from './components/Login/Login';
import Cart from './components/Cart/Cart';
import Footer from './components/Footer/Footer';

import "./App.css";

const app = () => {
  return (
    <Router>
      <Switch>
        <EcommerceContextProvider>
            <Route exact path='/'>
                <Header />
                <Products />
                <Footer />
            </Route>
            <Route path='/login'>
                <Login />
            </Route>
            <Route path='/cart'>
                <Header />
                <Cart />
            </Route>
        </EcommerceContextProvider>
      </Switch>
    </Router>
  );
};

export default app;
