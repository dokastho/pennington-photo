import PropTypes from 'prop-types';
import React from 'react'

const items = ["Galleries", "Administrators"];

class SideBar extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const {
      setContentFocus
    } = this.props;
    return (
      <>
        <div className='sidebar' >
          {
            items.map((item) => {
              return (
                <div className='sidebar-item' onClick={() => { setContentFocus(item.toLowerCase()) }} >
                  {item}
                </div>
              )
            })
          }
        </div>
      </>
    );
  }
}

SideBar.propTypes = {
  // setContentFocus
}

export default SideBar;
