import PropTypes from 'prop-types';
import React from 'react'

const items = ["Galleries", "Administrators"];

class SideBar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      logname: ""
    }
  }

  componentDidMount() {
    const logname = document.getElementById("logname").content;
    this.setState({ logname });
  }

  render() {
    const {
      setContentFocus
    } = this.props;
    const {
      logname
    } = this.state;
    return (
      <>
        <div className='sidebar' >
          <div className="admin-welcome">
            <h1>Pennington Photographics Administrator Tools</h1>
            <hr />
            <h3 className="fancy">Welcome {logname}.</h3>
            <span>Not {logname}? <a href="/accounts/logout/" className='logout-button'>logout</a></span>
            <br />
            <br />
            <hr />
            <br />
          </div>
          {
            items.map((item) => {
              return (
                <div className='sidebar-item' key={item} onClick={() => { setContentFocus(item.toLowerCase()) }} >
                  {item}
                </div>
              )
            })
          }
          <br />
          <br />
          <br />
          <a href='/new/'>
            <div className='new-button'>
              Create a new gallery
            </div>
          </a>
        </div>
      </>
    );
  }
}

SideBar.propTypes = {
  // setContentFocus
}

export default SideBar;

// notes
// needs css