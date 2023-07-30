import React from 'react'
import Lottie from 'react-lottie-player';
import animationData from './loading.json';

class Loading extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='loading-page'>
        <h5>Loading...</h5>
        <Lottie
          className='loading-animation'
          play
          loop
          animationData={animationData}
        />
      </div>
    );
  }
}

export { Loading };