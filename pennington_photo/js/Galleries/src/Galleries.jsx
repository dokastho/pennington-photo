import React from 'react';
import NavBar from './NavBar';
import Gallery from './Gallery';

class Galleries extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loaded: true,
      galleries: [],
    };
  }

  componentDidMount() {
    // fetch all gallery metadata\
    fetch("/api/v1/galleries/", { credentials: 'same-origin' })
      .then((response) => {
        if (!response.ok) throw Error(response.statusText);
        return response.json();
      })
      .then((data) => {
        this.setState({
          galleries: data
        });
      })
      .catch((error) => console.log(error));
  }

  render() {
    const {
      loaded,
      galleries
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
          <div className='site-contents'>
            <div className='dialogue'>
              <h2>
                Photo Galleries
              </h2>
              <h3>
                Explore below
              </h3>
              <br />
            </div>
            <div className='galleries-tray'>
              {
                galleries.map((gallery) => {
                  return (<Gallery name={gallery.name} />)
                })
              }
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default Galleries
