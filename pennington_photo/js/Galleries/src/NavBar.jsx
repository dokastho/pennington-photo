import React from 'react'

class NavBar extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='navbar'>
        <a href='/galleries/'>
          <div className='navbar-item'>
            Galleries
          </div>
        </a>
        <a href='/sizing/'>
          <div className='navbar-item'>
            Sizing
          </div>
        </a>
        <a href='/about/'>
          <div className='navbar-item'>
            About
          </div>
        </a>
        <a href='/contact/'>
          <div className='navbar-item'>
            Contact
          </div>
        </a>
      </div>
    );
  }
}

export default NavBar;
