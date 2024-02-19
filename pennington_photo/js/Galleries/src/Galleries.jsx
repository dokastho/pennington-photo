import React from 'react';
import NavBar from './NavBar';
import Thumbnail from './Thumbnail';
import Loading from './Loading';

class Galleries extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      galleries: [],
    };
  }

  componentDidMount() {
    // fetch all gallery metadata
    fetch("/api/v1/galleries/", { credentials: 'same-origin' })
      .then((response) => {
        if (!response.ok) throw Error(response.statusText);
        return response.json();
      })
      .then((data) => {
        this.setState({
          galleries: data,
          loaded: true
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
              <h1>
                Photo Galleries
              </h1>
              <h3>
                Explore below
              </h3>
              <br />
            </div>
            <div className='galleries-tray'>
              {
                galleries.map((gallery) => {
                  return (<Thumbnail key={gallery.galleryId} name={gallery.name} galleryId={gallery.galleryId} imgSrc={gallery.thumbnail} galleryType={gallery.type} />)
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
