import React from 'react'
import NavBar from './NavBar';
import Loading from './Loading';

class Cart extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      cart: [],
      loaded: false,
    }
    this.handleChage = this.handleChage.bind(this);
  }

  componentDidMount() {
    // fetch cart
    fetch('/api/v1/cart/contents/', { credentials: 'same-origin' })
      .then((response) => {
        if (!response.ok) throw Error(response.statusText);
        return response.json();
      })
      .then((data) => {
        this.setState({
          cart: data.cart,
          loaded: true
        });
      })
      .catch((error) => console.log(error));
  }

  handleChage(index, key, val) {
    const {
      cart
    } = this.state;
    cart[index][key] = val;
    this.setState({ cart });
  }

  deletePhoto(uuid) {

  }

  render() {
    const {
      cart,
      loaded
    } = this.state;
    return (
      <>
        {
          loaded ? (
            null
          ) : (
            <Loading />
          )
        }
        <div className={loaded ? 'loaded' : 'loading'}>
          <NavBar />
          <div className='site-contents'>
            <div className='dialogue'>
              <h1>Your Cart</h1>
            </div>
            <div className='cart-list'>
              {
                cart.length === 0 ? (
                  <h3>Your Cart is Empty</h3>
                ) : (
                  <div>
                    {
                      cart.map((photo, index) => {
                        return (
                          <div>
                            <img src={`/static/img/${photo.uuid}`} className='cart-thumbnail' />
                            <span className='cart-item'>{photo.name}</span>
                            <label htmlFor='number'>Qty:</label>
                            <input type='number' value={photo.qty} onChange={(e) => { this.handleChage(index, 'qty', e.target.value) }} />
                            <button onClick={() => { this.deletePhoto(photo.uuid) }}>Remove from Cart</button>
                          </div>
                        )
                      })
                    }
                  </div>
                )
              }
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Cart
