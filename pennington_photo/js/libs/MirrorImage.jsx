import PropTypes from 'prop-types';
import Photo from './Photo';
import React from 'react'

class MirrorImage extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const {
      uuid,
      id,
      componentClass,
      clickCallback
    } = this.props;
    return (
      <>
        <div
          className={`mirror-image-tray ${componentClass}`}
          onClick={() => clickCallback()}
          id={id}
        >
          <Photo
            uuid={uuid}
            id={`${id}-mi-tray`}
            imgClass='mirror-image'
            clickCallback={null()}
          />
        </div>
      </>
    );
  }
}

MirrorImage.defaultProps = {
  componentClass: '',
  id: '',
}

MirrorImage.propTypes = {
  // prop types go here
  uuid: PropTypes.string.isRequired,
  id: PropTypes.string,
  componentClass: PropTypes.string,
  // clickCallback
};

export default MirrorImage
