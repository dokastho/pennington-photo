import React from 'react';
import SplashPage from './SplashPage';
import InfoPage from './InfoPage';
import NavBar from './NavBar';
import Loading from './Loading';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: [false, false],
      fetched: false,
      rendered: false,
    }
    this.setLoaded = this.setLoaded.bind(this);
  }

  setLoaded(idx) {
    const { loaded } = this.state;
    loaded[idx] = true;
    this.setState({ loaded });
  }

  render() {
    const {
      loaded,
    } = this.state
    const fullyLoaded = loaded[0] && loaded[1];
    return (
      <>
        {
          fullyLoaded ? (
            null
          ) : (
            <Loading />
          )
        }
        <div className={fullyLoaded ? 'loaded' : 'loading'}>
          <NavBar />
          <SplashPage setLoaded={this.setLoaded} imgName={'IMG_3942.jpg'} loadedIdx={0} />
          <InfoPage />
          <SplashPage setLoaded={this.setLoaded} imgName={'home2.jpg'} loadedIdx={1} />
        </div>
      </>
    )
  }
}

export default Home
