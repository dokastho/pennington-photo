import PropTypes from 'prop-types';
import React from 'react'
import Photo from './Photo';

class Thumbnail extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      // state attributes go here
      // a: props.a
    };
  }

  componentDidMount() {
    const { } = this.props;

    this.setState({});
  }

  render() {
    const {
      name,
      galleryId,
      imgSrc
    } = this.props;
    return (
      <div className='thumbnail'>
        <a href={`/gallery/${galleryId}/`}>
          <Photo uuid={imgSrc} imgClass='thumbnail-photo' />
          <h3>
            {name}
          </h3>
        </a>
      </div>
    );
  }
}

Thumbnail.propTypes = {
  // prop types go here
  // s: PropTypes.string.isRequired,
};

Thumbnail.defaultProps = {
  // default prop values go here if not required
  name: PropTypes.string.isRequired,
  galleryId: PropTypes.number.isRequired,
  imgSrc: PropTypes.string.isRequired,
};

export default Thumbnail
