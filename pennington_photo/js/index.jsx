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
    }
  }

  componentDidMount() { }

  render() {
    const {
      loaded
    } = this.state
    return (
      loaded ? (
        <>
          <NavBar />
          <SplashPage />
          <InfoPage />
        </>
      ) : (
        <Loading />
      )
    )
  }
}

const container = document.getElementById('reactEntry');
const root = createRoot(container);
root.render(<Index />);
