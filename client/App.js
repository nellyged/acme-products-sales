import React, { Component } from 'react';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';
import axios from 'axios';
import Navbar from './Navbar';
import Home from './Home';
import Products from './Products';
import ProductCreate from './ProductCreate';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      products: [],
    };
  }
  componentDidMount() {
    this.loadData();
  }
  loadData() {
    axios
      .get('/api/products')
      .then(response => response.data)
      .then(products => {
        this.setState({ products });
      });
  }
  onSave = product => {
    //we have a return here becasue after we create we want to complete more steps so this must be returned so it can handed off down the promise chain
    return axios.post('/api/products', product).then(() => this.loadData());
  };
  destroyProd = id => {
    //no need for a return here, we just want to delete
    axios.delete(`/api/products/${id}`).then(() => this.loadData());
  };
  render() {
    const { products } = this.state;
    const { onSave, destroyProd } = this;
    const counts = {
      '/products': products.length,
      '/sales': products.filter(product => product.discount).length,
    };
    return (
      <div className="container">
        <HashRouter>
          <Route
            render={({ location }) => (
              <Navbar location={location} counts={counts} />
            )}
          />
          <Switch>
            <Route path="/home" render={() => <Home />} />
            <Route
              path="/products"
              render={() => (
                <Products products={products} destroyProd={destroyProd} />
              )}
            />
            <Route
              path="/sales"
              render={() => (
                <Products
                  products={products.filter(product => product.discount)}
                  destroyProd={destroyProd}
                />
              )}
            />
            <Route
              path="/create"
              render={({ history }) => (
                <ProductCreate history={history} onSave={onSave} />
              )}
            />
            <Redirect to="/home" />
          </Switch>
        </HashRouter>
      </div>
    );
  }
}
