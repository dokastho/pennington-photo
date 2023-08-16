import React from 'react'

const imgName = 'IMG_3942.jpg';

class SplashPage extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const {
      setLoaded
    } = this.props;
    return (
      <div className='welcome-page'>
        <img src={`/static/img/${imgName}`} className='background-img' onLoad={() => {setLoaded()}} key={'background'} />
      </div>
    );
  }
}

export default SplashPage
