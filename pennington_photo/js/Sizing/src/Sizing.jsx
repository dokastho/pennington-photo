import React from 'react'
import NavBar from './NavBar';

class Sizing extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        <NavBar />
        <div className='site-contents'>
          <div className='dialogue'>
            <h2>
              Sizing Guide
            </h2>
          </div>
        </div>
      </>
    );
  }
}

export default Sizing
