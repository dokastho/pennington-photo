import React from 'react'
import NavBar from './NavBar';
import Loading from './Loading';

class Sizing extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
    }
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ loaded: true });
    }, 40);
  }

  render() {
    const {
      loaded
    } = this.state;
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
          <div className='site-contents'>
            <div className='dialogue'>
              <h1>
                Sizing Guide
              </h1>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Sizing
