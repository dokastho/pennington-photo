import PropTypes from 'prop-types';
import React from 'react'
import Photo from './Photo';
import GALLERYTYPES from './GalleryTypes'
import Triptych from './Triptych';
import MirrorImage from './MirrorImage';

class Thumbnail extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const {
      name,
      galleryId,
      imgSrc,
      uuid_l,
      uuid_r,
      uuid_m,
      galleryType,
    } = this.props;

    var PhotoComponent;
    switch (galleryType) {
      case GALLERYTYPES.MIRRORIMAGE:
        PhotoComponent = <MirrorImage uuid={imgSrc} componentClass='thumbnail-photo' />;
        break;
      case GALLERYTYPES.TRIPTYCH:
        PhotoComponent = <Triptych uuid_l={uuid_l} uuid_r={uuid_r} uuid_m={uuid_m} componentClass='thumbnail-photo' />;
        break;
      default:  // select
        PhotoComponent = <Photo uuid={imgSrc} imgClass='thumbnail-photo' />;
        break;
    }
    return (
      <div className='thumbnail'>
        <a href={`/gallery/${galleryId}/`}>
          {PhotoComponent}
          <h3>
            {name}
          </h3>
        </a>
      </div>
    );
  }
}

Thumbnail.propTypes = {
  // default prop values go here if not required
  name: PropTypes.string.isRequired,
  galleryId: PropTypes.number.isRequired,
  galleryType: PropTypes.string.isRequired,
  imgSrc: PropTypes.string.isRequired,
  uuid_l: PropTypes.string,
  uuid_m: PropTypes.string,
  uuid_r: PropTypes.string,
};

export default Thumbnail
