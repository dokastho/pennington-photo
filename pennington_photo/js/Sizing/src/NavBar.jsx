import PropTypes from 'prop-types';
import React from 'react'

const items = ["Home", "Galleries", "Sizing", "Contact"];

class NavBar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loaded: [false, false]
    }

    this.setLoaded = this.setLoaded.bind(this);
  }

  setLoaded(index) {
    const {
      loaded
    } = this.state;
    loaded[index] = true;
    this.setState({ loaded });
  }

  render() {
    const {
      loaded
    } = this.state;
    // var isLoaded = true;
    // for (let index = 0; index < loaded.length; index++) {
    //   const element = loaded[index];
    //   isLoaded = isLoaded && element;
    // }
    return (
      <>
        <div className='navbar' >
          {/* <div className={`navbar-body ${isLoaded ? 'loaded' : 'loading'}`}> */}
          <div className='navbar-body'>
            <a href='/admin/'>
              <img src="/static/icon/Bio.png" className={`navbar-icon ${loaded[0] ? 'loaded-nf' : 'loading-nf'}`} key='admin-icon' onLoad={() => { this.setLoaded(0) }} />
            </a>
            {
              items.map((item) => {
                return (
                  <a href={`/${item.toLowerCase()}/`} key={item}>
                    <div className='navbar-item' >
                      {item}
                    </div>
                  </a>
                )
              })
            }
            <a href='/cart/'>
              <img src="/static/icon/Cart.png" className={`navbar-icon ${loaded[0] ? 'loaded-nf' : 'loading-nf'}`} key='cart-icon' onLoad={() => { this.setLoaded(1) }} />
            </a>
          </div>
        </div>
      </>
    );
  }
}

export default NavBar;
