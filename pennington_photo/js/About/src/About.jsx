import React from 'react'
import NavBar from './NavBar';

class About extends React.Component {

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
              About Me
            </h2>
          </div>
        </div>
      </>
    );
  }
}

export default About
