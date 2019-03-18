import React, { Component } from 'react';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';
import axios from 'axios';
import Navbar from './Navbar';
import Home from './Home';
import Products from './Products';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      products: [],
    };
  }
  componentDidMount() {
    axios
      .get('/api/products')
      .then(response => response.data)
      .then(products => {
        this.setState({ products });
      });
  }
  render() {
    const { products } = this.state;
    console.log(products);
    return (
      <div className="container">
        <HashRouter>
          <Route render={({ location }) => <Navbar location={location} />} />
          <Switch>
            <Route path="/home" render={() => <Home />} />
            <Route
              path="/products"
              render={() => <Products products={products} />}
            />
            <Redirect to="/home" />
          </Switch>
        </HashRouter>
      </div>
    );
  }
}
