import React from 'react';
import PropTypes from 'prop-types';
import NavBar from './NavBar';
import Loading from './Loading';
import Photo from './Photo';

class Gallery extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      galleryId: 0,
      loaded: false,
      photos: [],
      name: "",
      description: "",
      created: 0,
    };
  }

  componentDidMount() {
    const galleryId = document.getElementById("galleryId").content;
    // fetch all gallery metadata
    fetch(`/api/v1/gallery/${galleryId}/`, { credentials: 'same-origin' })
      .then((response) => {
        if (!response.ok) throw Error(response.statusText);
        return response.json();
      })
      .then((data) => {
        this.setState({
          photos: data.photos,
          name: data.name,
          description: data.description,
          created: data.created,
          loaded: true,
          galleryId: galleryId,
        });
      })
      .catch((error) => console.log(error));
  }

  render() {
    const {
      loaded,
      photos,
      name,
      description,
      created,
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
                {name}
              </h1>
              <h3 className='fancy'>
                {
                  description.length === 0 ? <br /> : (
                    <em>
                      "{description}"
                    </em>
                  )
                }
              </h3>
              <h3>
                {created}
              </h3>
              <br />
            </div>
            <div className='photos-tray'>
              {
                photos.map((photo) => {
                  return (<Photo uuid={photo.uuid} />)
                })
              }
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default Gallery
