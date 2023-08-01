import PropTypes from 'prop-types';
import React from 'react'

const items = ["Home", "Galleries", "Sizing", "About", "Contact"];

class NavBar extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        <div className='navbar' >
          {
            items.map((item) => {
              return (
                <a href={`/${item.toLowerCase()}/`}>
                  <div className='navbar-item' >
                    {item}
                  </div>
                </a>
              )
            })
          }
        </div>
      </>
    );
  }
}

export default NavBar;
