import PropTypes from 'prop-types';
import React from 'react'
import Photo from './Photo';
import GALLERYTYPES from './GalleryTypes'

class EditThumbnail extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const {
      name,
      galleryIdx,
      imgSrc,
      doEditGallery,
      galleryType,
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
        thumbnailClassName = "default";
        break;
    }
    return (
      <div className='thumbnail' key={`${galleryIdx}-${imgSrc}`} onClick={() => { doEditGallery(galleryIdx) }}>
        <Photo uuid={imgSrc} imgClass='thumbnail-photo' />
        <h3>
          {name}
        </h3>
      </div>
    );
  }
}

EditThumbnail.propTypes = {
  name: PropTypes.string.isRequired,
  galleryIdx: PropTypes.number.isRequired,
  imgSrc: PropTypes.string.isRequired,
  // doEditGallery
};

export default EditThumbnail

// notes
// need to add edit overlay icon on hover