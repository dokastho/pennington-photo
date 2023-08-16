import PropTypes from 'prop-types';
import React from 'react'
import Loading from './Loading';

class ClickablePhoto extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      blownUp: false,
      screenYWhenClicked: 0
    };
    this.setLoaded = this.setLoaded.bind(this);
    this.clickToBlowUp = this.clickToBlowUp.bind(this);
    this.wrapperRef = React.createRef();
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  handleClickOutside(event) {
    const { uuid } = this.props;
    const { screenYWhenClicked } = this.state;
    if (event.target.id != uuid) {
      document.removeEventListener("mousedown", this.handleClickOutside);
      window.scrollTo(0, screenYWhenClicked)
      this.setState({ blownUp: false });
      
      // remove topical styles
      document.getElementById('site-contents').style.marginLeft = 'auto';
      document.getElementById('site-contents').style.marginRight = 'auto';
      document.getElementById('body').style.overflow = 'auto';
    }
  }

  clickToBlowUp() {
    const { blownUp } = this.state;
    if (blownUp) {
      return;
    }
    this.setState({ blownUp: true, screenYWhenClicked: window.scrollY });
    document.addEventListener("mousedown", this.handleClickOutside);

    // apply topical styles
    document.getElementById('site-contents').style.marginLeft = '0px';
    document.getElementById('site-contents').style.marginRight = '0px';
    document.getElementById('body').style.overflow = 'hidden';
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
