import React from 'react'

class NavBar extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='navbar'>
        <div className='navbar-item'>Galleries</div>
        <div className='navbar-item'>Sizing</div>
        <div className='navbar-item'>About</div>
        <div className='navbar-item'>Contact</div>
      </div>
    );
  }
}

export default NavBar;
