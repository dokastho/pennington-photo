import React from 'react'
import NavBar from './NavBar';
import Loading from './Loading';

const SAVED = "is saved.";
const SAVING = "is saving...";
const UNSAVED = "has unsaved changes.";

const default_size = "-- select an option --";

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
    if (key === 'info') {
      cart[index]['size'] = val.size;
      cart[index]['price'] = val.price;
    } else {
      cart[index][key] = val;
    }
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

  deletePhoto(hashId) {
    while (this.timeout) {
      setTimeout(() => {
        this.deletePhoto(hashId);
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
        body: JSON.stringify({ hashId }),
      })
      .then((response) => {
        if (!response.ok) throw Error(response.statusText);
        this.setState((prevState) => ({
          cart: prevState.cart.filter((photo) => photo.hashId !== hashId),
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
    let ready = true;
    cart.forEach((photo) => {
      ready = ready && (photo.size !== "") && (saveState == SAVED);
    })
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
                                  <select className='min-margin' id="size" name="size" onChange={(e) => { this.handleChage(index, 'info', JSON.parse(e.target.value)) }}>
                                    <option disabled selected value={""}>{default_size}</option>
                                    {
                                      photo.sizes.map((size) => {
                                        return (
                                          <option selected={photo.size === size.info} key={size.info} value={JSON.stringify({ size: size.info, price: size.price })}>{`${size.info} ($${size.price})`}</option>
                                        )
                                      })
                                    }
                                  </select>
                                  <button className='min-margin' onClick={() => { this.deletePhoto(photo.hashId) }}>Remove from Cart</button>
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
                      {
                        ready ? (<a href='/contact/?checkout=true' className='submit-button'>Check Out</a>) : (<h3 className='badpass'>Please select a size & finish for each item to check out</h3>)
                      }
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
