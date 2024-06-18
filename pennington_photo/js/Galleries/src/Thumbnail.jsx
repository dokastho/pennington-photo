import PropTypes from 'prop-types';
import React from 'react'
import Photo from './Photo';
import GALLERYTYPES from './GalleryTypes'

class Thumbnail extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const {
      name,
      galleryId,
      imgSrc,
      galleryType,
      customClassName,
      description,
    } = this.props;
    var thumbnailClassName;
    switch (galleryType) {
      case GALLERYTYPES.MIRRORIMAGE:
        thumbnailClassName = "mirror-image";
        break;
      case GALLERYTYPES.TRIPTYCH:
        thumbnailClassName = "triptych";
        break;
      default:
        thumbnailClassName = customClassName;
        break;
    }
    return (
      <div className='thumbnail'>
        <a href={`/gallery/${galleryId}/`}>
          <Photo uuid={imgSrc} imgClass={`thumbnail-photo-${thumbnailClassName}`} />
          <h3>
            {name}
          </h3>
          <p>{description}</p>
        </a>
      </div>
    );
  }
}

Thumbnail.propTypes = {
  // default prop values go here if not required
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  galleryId: PropTypes.number.isRequired,
  galleryType: PropTypes.string.isRequired,
  imgSrc: PropTypes.string.isRequired,
  customClassName: PropTypes.string,
};

Thumbnail.defaultProps = {
  customClassName: "default"
}

export default Thumbnail
