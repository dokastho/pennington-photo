import PropTypes from 'prop-types';
import React from 'react'
import Photo from './Photo';
import GALLERYTYPES from './GalleryTypes'


class EditThumbnail extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loadedArrows: [false, false],
    }

    this.setArrowLoaded = this.setArrowLoaded.bind(this);
  }

  setArrowLoaded(index) {
    const {
      loadedArrows
    } = this.state;
    loadedArrows[index] = true;
    this.setState({ loadedArrows });
  }

  render() {
    const { loadedArrows } = this.state;
    const {
      name,
      galleryIdx,
      imgSrc,
      doEditGallery,
      galleryType,
      swapleft,
      swapright,
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

    const loadingArrows = !loadedArrows[0] || !loadedArrows[1];

    return (
      <div className='thumbnail edit' key={`${galleryIdx}-${imgSrc}`}>
        <Photo uuid={imgSrc} imgClass='thumbnail-photo' clickCallback={doEditGallery} clickArgs={{galleryIdx}} />
        <div className='arrows'>
          {loadingArrows ? (<div className='center'><em>Arrow icons are loading...</em></div>) : null}
          <img
            key={"leftarrow"}
            src="/static/img/left.svg"
            type="image/svg+xml"
            className={`arrow ${!loadingArrows ? 'loaded-nf' : 'loading-nf'}`}
            onLoad={() => { this.setArrowLoaded(0) }}
            onClick={() => { swapleft(galleryIdx) }}>
          </img>
          <h3>
            {name}
          </h3>
          <img
            key={"rightarrow"}
            src="/static/img/right.svg"
            type="image/svg+xml"
            className={`arrow ${!loadingArrows ? 'loaded-nf' : 'loading-nf'}`}
            onLoad={() => { this.setArrowLoaded(1) }}
            onClick={() => { swapright(galleryIdx) }}>
          </img>
        </div>
      </div>
    );
  }
}

EditThumbnail.propTypes = {
  name: PropTypes.string.isRequired,
  galleryIdx: PropTypes.number.isRequired,
  imgSrc: PropTypes.string.isRequired,
  // doEditGallery
  // swapleft
  // swapright
};

export default EditThumbnail

// notes
// need to add edit overlay icon on hover