import PropTypes from 'prop-types';
import React from 'react'
import Loading from './Loading';

class EditablePhoto extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      blownUp: false,
    };
    this.setLoaded = this.setLoaded.bind(this);
    this.clickToBlowUp = this.clickToBlowUp.bind(this);
    this.wrapperRef = React.createRef();
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  handleClickOutside(event) {
    const { uuid } = this.props;
    if (event.target.id != uuid) {
      document.removeEventListener("mousedown", this.handleClickOutside);
      this.setState({ blownUp: false });
    }
  }

  clickToBlowUp() {
    const { blownUp } = this.state;
    if (blownUp) {
      return;
    }
    this.setState({ blownUp: true });
    document.addEventListener("mousedown", this.handleClickOutside);
  }

  setLoaded() {
    this.setState({ loaded: true });
  }

  render() {
    const {
      loaded,
      blownUp
    } = this.state;
    const {
      uuid,
      imgClass,
      description
    } = this.props;
    return (
      <>
        <div className={imgClass} key={uuid}>
          {
            loaded ? (
              null
            ) : (
              <Loading />
            )
          }
          <img
            src={`/static/img/${uuid}`}
            id={uuid}
            className={`clickable photo ${loaded ? 'loaded' : 'loading-invis'}`}
            onLoad={() => { this.setLoaded() }}
            onClick={() => { this.clickToBlowUp() }}
          />
        </div>
        {
          blownUp ? (
            <div className='blown-up-container'>
              <div className='blown-up-content'>

                <img
                  src={`/static/img/${uuid}`}
                  id={uuid}
                  className={`blown-up-image photo ${loaded ? 'loaded' : 'loading-invis'}`}
                  onLoad={() => { this.setLoaded() }}
                />
                {
                  description === "" ? null : (<span className='fancy'>"{description}"</span>)
                }
              </div>
            </div>
          ) : null
        }
      </>
    );
  }
}

EditablePhoto.defaultProps = {
  imgClass: 'photo-slot',
  description: '',
}

EditablePhoto.propTypes = {
  // prop types go here
  uuid: PropTypes.string.isRequired,
  imgClass: PropTypes.string,
  description: PropTypes.string,
};

export default EditablePhoto

// notes
// when clicked display photo in place of gallery
// requires 
  // delete confirmatory button
  // back to gallery button
  // save every 1s like gallery
  // include save now button