import React from 'react'
import NavBar from './NavBar';
import Loading from './Loading';

const SAVED = "is saved.";
const SAVING = "is saving...";
const UNSAVED = "has unsaved changes.";

class Cart extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      cart: [],
      loaded: false,
      saveState: SAVED,
    }
    this.handleChage = this.handleChage.bind(this);
    this.doUpdate = this.doUpdate.bind(this);
    this.deletePhoto = this.deletePhoto.bind(this);

    this.timeout = null;
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
        console.log(data.cart);
      })
      .catch((error) => console.log(error));
  }

  doUpdate() {
    const {
      cart
    } = this.state;
    fetch('/api/v1/cart/update/',
      {
        credentials: 'same-origin',
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ cart }),
      })
      .then((response) => {
        if (!response.ok) throw Error(response.statusText);
        this.setState({ saveState: SAVED });
        return response.json();
      })
      .catch((error) => console.log(error));
  }

  handleChage(index, key, val) {
    const {
      cart
    } = this.state;
    cart[index][key] = val;
    this.setState({ cart, saveState: UNSAVED });
    if (this.timeout) {
      clearTimeout(this.timeout);
      this.timeout = null;
    }
    this.timeout = setTimeout(() => {
      this.timeout = null;
      this.setState({ saveState: SAVING });
      this.doUpdate();
    }, 1000);
  }

  deletePhoto(uuid) {
    while (this.timeout) {
      setTimeout(() => {
        this.deletePhoto(uuid);
      }, 100);
      return;
    }
    fetch('/api/v1/cart/remove/',
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
        this.setState((prevState) => ({
          cart: prevState.cart.filter((photo) => photo.uuid !== uuid),
        }));
        return response.json();
      })
      .catch((error) => console.log(error));
  }

  render() {
    const {
      cart,
      loaded,
      saveState
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
                  <h3 className='fancy'><em>Your Cart is Empty</em></h3>
                ) : (
                  <>
                    <h3 className='fancy'><em>Your cart {saveState}</em></h3>
                    <div className='cart-list'>
                      {
                        cart.map((photo, index) => {
                          return (
                            <>
                              <hr />
                              <div className='cart-item'>
                                <img src={`/static/img/${photo.uuid}`} className='cart-thumbnail' />
                                <h3 className='fancy'>{photo.name}</h3>
                                <div className='cart-item-options'>
                                  <div className='min-margin'>
                                    <label htmlFor='number'>Qty: </label>
                                    <input type='number' min={1} value={photo.qty} onChange={(e) => { this.handleChage(index, 'qty', e.target.value) }} />
                                    {/* add item sizes drop down */}
                                  </div>
                                  <label className='min-margin' htmlFor="size">Choose a size:</label>
                                  <select className='min-margin' id="size" name="size">
                                    {
                                      photo.sizes.map((size) => {
                                        return(
                                          <option value={size.info}>{`${size.info} ($${size.price})`}</option>
                                        )
                                      })
                                    }
                                  </select>
                                  <button className='min-margin' onClick={() => { this.deletePhoto(photo.uuid) }}>Remove from Cart</button>
                                </div>
                              </div>
                            </>
                          )
                        })
                      }
                    </div>
                    <br />
                    <br />
                    <div className='menu-buttons'>
                      <button onClick={() => { this.doUpdate() }}>Save Cart</button>
                      <a href='/contact/?checkout=true' className='submit-button'>Check Out</a>
                    </div>
                  </>
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
