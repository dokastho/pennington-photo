import PropTypes from 'prop-types';
import React from 'react'

class SplashPage extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const {
      setLoaded,
      imgName,
      loadedIdx,
    } = this.props;
    return (
      <div className='welcome-page'>
        <img src={`/static/img/${imgName}`} className='background-img' onLoad={() => {setLoaded(loadedIdx)}} key={'background'} />
      </div>
    );
  }
}

SplashPage.propTypes = {
  imgName: PropTypes.string.isRequired,
  loadedIdx: PropTypes.number.isRequired,
  // setLoaded
};

export default SplashPage
