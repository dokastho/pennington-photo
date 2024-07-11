import PropTypes from 'prop-types';
import React from 'react'

const CARTSTR = "Add to Cart";

class CartButton extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      checked: false,
    };
    this.addToCart = this.addToCart.bind(this);
    this.onHover = this.onHover.bind(this);
    this.notHover = this.notHover.bind(this);
  }

  componentDidMount() {
    this.notHover();
  }

  addToCart() {
    const { photo, uuid } = this.props;
    // fetch all gallery metadata
    fetch('/api/v1/cart/add/',
      {
        credentials: 'same-origin',
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          photo: {
            name: photo,
            uuid
          }
        }),
      })
      .then((response) => {
        if (!response.ok) throw Error(response.statusText);
        this.setState({ checked: true });
        setTimeout(() => {
          this.setState({ checked: false });
        }, 500);
        return response.json();
      })
      .catch((error) => console.log(error));
  }

  onHover() {
    this.setState({ text: CARTSTR });
  }

  notHover() {
    const { price } = this.props;
    this.setState({ text: `$${price}` });
  }

  render() {
    const {
      checked,
      text,
    } = this.state;
    const {
      uuid,
    } = this.props;
    return (
      <button
        id={uuid}
        className={`cart-button mfs ${checked ? 'done' : null}`}
        onClick={() => { this.addToCart() }}
        disabled={checked}
        onMouseEnter={() => { this.onHover() }}
        onMouseLeave={() => { this.notHover() }}
      >
        {checked ? 'Done!' : text}
        {text === CARTSTR || checked ? null : <img src="/static/icon/Cart.png" className='home-info-img nopad' key="cart-button" />}
      </button>
    );
  }
}

CartButton.propTypes = {
  // prop types go here
  photo: PropTypes.string.isRequired,
  uuid: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
};

export default CartButton
