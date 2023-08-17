import PropTypes from 'prop-types';
import React from 'react'
import EditThumbnail from './EditThumbnail';

class EditGalleries extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const {
      galleries,
      doEditGallery,
    } = this.props;
    return (
      <>
        <div className='dialogue'>
          <h1>
            Your Galleries
          </h1>
          <br />
        </div>
        <div className='galleries-tray'>
          {
            galleries.map((gallery, idx) => {
              return (<EditThumbnail name={gallery.name} galleryIdx={idx} imgSrc={gallery.thumbnail} doEditGallery={doEditGallery} />)
            })
          }
        </div>
      </>
    );
  }
}

EditGalleries.propTypes = {
  galleries: PropTypes.instanceOf(Array).isRequired,
  // doEditGallery
};

export default EditGalleries

// notes
// still need to do all css