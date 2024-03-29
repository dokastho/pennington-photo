import React from 'react';
import SplashPage from './SplashPage';
import InfoPage from './InfoPage';
import NavBar from './NavBar';
import Loading from './Loading';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      fetched: false,
      rendered: false,
    }
    this.setLoaded = this.setLoaded.bind(this);
  }

  setLoaded() {
    this.setState({ loaded: true });
  }

  render() {
    const {
      loaded,
    } = this.state
    return (
      <>
        {
          loaded ? (
            null
          ) : (
            <Loading />
          )
        }
        <div className={loaded ? 'loaded' : 'loading'}>
          <NavBar />
          <SplashPage setLoaded={this.setLoaded} />
          <InfoPage />
        </div>
      </>
    )
  }
}

export default Home
