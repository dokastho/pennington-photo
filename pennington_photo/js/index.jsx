import React from 'react';
import { createRoot } from 'react-dom/client';
import SplashPage from './SplashPage';
import NavBar from './NavBar';
import InfoPage from './InfoPage';
import Loading from './Loading';

class Index extends React.Component {
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
    console.log("loaded");
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

const container = document.getElementById('reactEntry');
const root = createRoot(container);
root.render(<Index />);
