import React from 'react';
import PropTypes from 'prop-types';
import NavBar from './NavBar';
import Loading from './Loading';
import ClickablePhoto from './ClickablePhoto';

class Gallery extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      galleryId: 0,
      loaded: false,
      photos: [],
      name: "",
      description: "",
      dateTaken: 0,
      created: 0,
      galleryType: "",
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
          dateTaken: data.dateTaken,
          created: data.created,
          galleryType: data.type,
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
      dateTaken,
      created,
      galleryType,
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
                {
                  dateTaken === 0 ? <br /> : (
                    <>{dateTaken}</>
                  )
                }
              </h3>
              <h5>
                <em>
                  Updated {created}
                </em>
              </h5>
              <br />
            </div>
            <div className={`photos-tray ${galleryType}`}>
              {
                photos.map((photo) => {
                  return (<ClickablePhoto key={photo.uuid} uuid={photo.uuid} name={photo.name} description={photo.description} galleryType={galleryType} />)
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
