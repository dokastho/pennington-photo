import React from 'react'

class NavBar extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='navbar'>
        <div className='navbar-item'>item</div>
        <div className='navbar-item'>item</div>
        <div className='navbar-item'>item</div>
        <div className='navbar-item'>item</div>
      </div>
    );
  }
}

export default NavBar
