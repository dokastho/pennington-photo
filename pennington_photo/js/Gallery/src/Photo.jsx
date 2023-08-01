import PropTypes from 'prop-types';
import React from 'react'
import Loading from './Loading';

class Photo extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loaded: false
    };
    this.setLoaded = this.setLoaded.bind(this);
  }

  setLoaded() {
    this.setState({ loaded: true });
  }

  render() {
    const {
      loaded
    } = this.state;
    const {
      uuid,
      imgClass
    } = this.props;
    return (
        <div className='photo-slot'>
          {
            loaded ? (
              null
            ) : (
              <Loading />
            )
          }
          <img src={`/static/img/${uuid}`} className={`photo ${imgClass} ${loaded ? 'loaded' : 'loading'}`} onLoad={() => { this.setLoaded() }} />
        </div>
    );
  }
}

Photo.propTypes = {
  // prop types go here
  uuid: PropTypes.string.isRequired,
  imgClass: PropTypes.string,
};

export default Photo
