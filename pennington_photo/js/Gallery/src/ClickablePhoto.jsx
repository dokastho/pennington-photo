import PropTypes from 'prop-types';
import React from 'react'
import Loading from './Loading';
import CartButton from './CartButton';

class ClickablePhoto extends React.Component {

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
      name,
      imgClass,
      description
    } = this.props;
    return (
      <>
        <div className={imgClass}>
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
                <h3 className='fancy'>{name}</h3>
                {
                  description === "" ? null : (<h3 className='alt'><em>{description}</em></h3>)
                }
                <CartButton photo={name} uuid={uuid} />
              </div>
            </div>
          ) : null
        }
      </>
    );
  }
}

ClickablePhoto.defaultProps = {
  imgClass: 'photo-slot',
  description: '',
}

ClickablePhoto.propTypes = {
  // prop types go here
  uuid: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  imgClass: PropTypes.string,
  description: PropTypes.string,
};

export default ClickablePhoto
