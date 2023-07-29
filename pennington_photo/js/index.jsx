import React from 'react';
import { createRoot } from 'react-dom/client';
import SplashPage from './SplashPage';
import NavBar from './NavBar';
import InfoPage from './InfoPage';

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  componentDidMount() {}

  render() {
    return (
      <>
        <NavBar />
        <SplashPage />
        <InfoPage />
      </>
    )
  }
}

const container = document.getElementById('reactEntry');
const root = createRoot(container);
root.render(<Index />);
