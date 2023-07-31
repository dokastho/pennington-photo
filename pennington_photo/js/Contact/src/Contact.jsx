import React from 'react'
import NavBar from './NavBar';

class Contact extends React.Component {

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
              Contact Me
            </h2>
          </div>
        </div>
      </>
    );
  }
}

export default Contact
