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
      errorCode: '',
      error: '',
    };
  }
  onChange = ev => {
    this.setState({
      [ev.target.name]: ev.target.value,
    });
  };
  onSave = ev => {
    ev.preventDefault();
    this.props
      .onSave(this.state)
      .then(() => {
        if (this.state.discountPer) {
          this.props.history.push('/sales');
        } else this.props.history.push('/products');
      })
      .catch(() => {
        if (this.props.names.includes(this.state.name)) {
          this.setState({ errorCode: 1, error: 'name must be unique' });
        }
        if (this.state.name.trim() === '') {
          this.setState({
            errorCode: 1,
            error: 'Validation notEmpty on name failed',
          });
        }
        if (this.state.discountPer % 1 !== 0) {
          this.setState({
            errorCode: 2,
            error: `invalid input syntax for integer: "${
              this.state.discountPer
            }"`,
          });
        }
        if (this.state.discountPer <= 0) {
          this.setState({
            errorCode: 3,
            error: 'Validation min on discountPercent failed',
          });
        }
        if (this.state.discountPer >= 100) {
          this.setState({
            errorCode: 4,
            error: 'Validation max on discountPercent failed',
          });
        }
      });
  };
  render() {
    const {
      name,
      price,
      discountPer,
      availability,
      error,
      errorCode,
    } = this.state;
    const { onChange, onSave } = this;
    const disabled = name.length === 0 || price.length === 0;
    return (
      <form onSubmit={onSave}>
        {error && (
          <ul
            className={`alert alert-${
              errorCode === 1 || errorCode === 2 ? 'danger' : 'warning'
            }`}
          >
            <li>{error}</li>
          </ul>
        )}
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
