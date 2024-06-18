import React from 'react';
import Lottie from 'react-lottie-player';
// eslint-disable-next-line import/no-relative-packages
import animationData from '../../../lotties/loading.json';

// eslint-disable-next-line react/prefer-stateless-function
class Loading extends React.Component {
  render() {
    return (
      <div className="loading-page">
        <h5>Loading...</h5>
        <Lottie
          className="loading-animation"
          play
          loop
          animationData={animationData}
        />
      </div>
    );
  }
}

export default Loading;
