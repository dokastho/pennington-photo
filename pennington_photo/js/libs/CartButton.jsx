import PropTypes from 'prop-types';
import React from 'react'

class CartButton extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      added: false,
      loaded: false
    };
    this.addToCart = this.addToCart.bind(this);
  }

  componentDidMount() {
    const {
      uuid
    } = this.props;
    fetch('/api/v1/cart/status/',
      {
        credentials: 'same-origin',
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ uuid }),
      })
      .then((response) => {
        if (!response.ok) throw Error(response.statusText);
        return response.json();
      })
      .then((data) => {
        if (data.in) {
          this.setState({ added: true, loaded: true });
        } else {
          this.setState({ loaded: true });
        }
      })
      .catch((error) => console.log(error));
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
        this.setState({ added: true });
        return response.json();
      })
      .catch((error) => console.log(error));
  }

  render() {
    const {
      added,
      loaded
    } = this.state;
    const {
      uuid
    } = this.props;
    return (
      loaded ? <button id={uuid} className={`${added ? 'gray-out' : 'cart-button'}`} onClick={() => { this.addToCart() }}>{`${added ? 'Added to cart' : 'Add to cart'}`}</button> : null
    );
  }
}

CartButton.propTypes = {
  // prop types go here
  photo: PropTypes.string.isRequired,
  uuid: PropTypes.string.isRequired,
};

export default CartButton
