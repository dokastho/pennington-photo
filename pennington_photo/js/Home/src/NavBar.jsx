import PropTypes from 'prop-types';
import React from 'react'

class NavBar extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const {
      color
    } = this.props;
    return (
      <div className='navbar' >
        <a href='/galleries/'>
          <div className='navbar-item' style={{ color }}>
            Galleries
          </div>
        </a>
        <a href='/sizing/'>
          <div className='navbar-item' style={{ color }}>
            Sizing
          </div>
        </a>
        <a href='/about/'>
          <div className='navbar-item' style={{ color }}>
            About
          </div>
        </a>
        <a href='/contact/'>
          <div className='navbar-item' style={{ color }}>
            Contact
          </div>
        </a>
      </div>
    );
  }
}

NavBar.defaultProps = {
  color: 'black'
}

NavBar.propTypes = {
  color: PropTypes.string
}

export default NavBar;
