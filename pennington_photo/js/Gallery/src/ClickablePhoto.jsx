import PropTypes from 'prop-types';
import React from 'react'
import Loading from './Loading';

class ClickablePhoto extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      blownUp: false
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

      document.getElementById('site-contents').style.marginLeft = 'auto';
      document.getElementById('site-contents').style.marginRight = 'auto';
    }
  }

  clickToBlowUp() {
    const { blownUp } = this.state;
    if (blownUp) {
      return;
    }
    this.setState({ blownUp: true });
    document.addEventListener("mousedown", this.handleClickOutside);
    document.getElementById('site-contents').style.marginLeft = '0px';
    document.getElementById('site-contents').style.marginRight = '0px';
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
      imgClass
    } = this.props;
    return (
      <div className={blownUp ? 'blown-up-container' : imgClass}>
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
          className={`${loaded ? 'loaded' : 'loading-invis'} ${blownUp ? 'blown-up' : 'clickable photo'}`}
          onLoad={() => { this.setLoaded() }}
          onClick={() => { this.clickToBlowUp() }}
        />
      </div>
    );
  }
}

ClickablePhoto.defaultProps = {
  imgClass: 'photo-slot'
}

ClickablePhoto.propTypes = {
  // prop types go here
  uuid: PropTypes.string.isRequired,
  imgClass: PropTypes.string
};

export default ClickablePhoto
