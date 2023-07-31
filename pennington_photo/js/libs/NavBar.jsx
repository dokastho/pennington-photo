import PropTypes from 'prop-types';
import React from 'react'

const items = ["Home", "Galleries", "Sizing", "About", "Contact"];

class NavBar extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const {
      divId
    } = this.props;
    return (
      <div className='navbar' id={divId} >
        {
          items.map((item) => {
            return (
              <a href={`/${item.toLowerCase()}/`}>
                <div className='navbar-item' id={divId} >
                  {item}
                </div>
              </a>
            )
          })
        }
      </div>
    );
  }
}

NavBar.defaultProps = {
  divId: 'normal'
}

NavBar.propTypes = {
  divId: PropTypes.string
}

export default NavBar;
