import React, { Component } from 'react';

export default class ProductCreate extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      price: '',
      discount: '',
      discountPer: '',
      availability: 'instock',
      error: '',
    };
  }
  onChange = ev => {
    this.setState({ [ev.target.name]: ev.target.value });
  };
  onSave = ev => {
    ev.preventDefault();
    this.setState({
      discount:
        this.state.price - (this.state.discountPer / 100) * this.state.price,
    });
    this.props
      .onSave(this.state)
      .then(() => {
        if (this.state.discount) {
          this.props.history.push('/sales');
        } else this.props.history.push('/products');
      })
      .catch(() => {
        let err = '';
        this.setState({ error: 'something went wrong' });
      });
  };
  render() {
    const { name, price, discountPer, availability, error } = this.state;
    const { onChange, onSave } = this;
    const disabled = name.length === 0 || price.length === 0;
    return (
      <form onSubmit={onSave}>
        {error && <div className="alert alert-warning">{error}</div>}
        <div>
          <label htmlFor="name">Name</label>
          <input
            className="form-control"
            type="text"
            name="name"
            value={name}
            onChange={onChange}
          />
        </div>
        <div>
          <label htmlFor="price">Price</label>
          <input
            className="form-control"
            type="number"
            name="price"
            value={price}
            onChange={onChange}
          />
        </div>
        <div>
          <label htmlFor="discountPer">Discount Percentage</label>
          <input
            className="form-control"
            type="number"
            name="discountPer"
            value={discountPer}
            onChange={onChange}
          />
        </div>
        <div>
          <label htmlFor="availability">Availability</label>
          <select
            className="form-control"
            name="availability"
            value={availability}
            onChange={onChange}
          >
            <option>instock</option>
            <option>backordered</option>
            <option>discontinued</option>
          </select>
        </div>
        <button
          disabled={disabled}
          className="btn btn-primary"
          style={{ marginTop: '10px' }}
        >
          Create
        </button>
      </form>
    );
  }
}
