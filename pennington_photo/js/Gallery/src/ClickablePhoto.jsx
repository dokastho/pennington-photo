import PropTypes from 'prop-types';
import React from 'react'
import Photo from './Photo';
import CartButton from './CartButton';
import GALLERYTYPES from './GalleryTypes';

class ClickablePhoto extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      blownUp: false,
      showDetails: false,
    };
    this.clickToBlowUp = this.clickToBlowUp.bind(this);
    this.wrapperRef = React.createRef();
    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.toggleDetails = this.toggleDetails.bind(this);
  }

  handleClickOutside(event) {
    const { uuid } = this.props;
    if (event.target.id != uuid) {
      document.removeEventListener("mousedown", this.handleClickOutside);
      this.setState({ blownUp: false });
      document.getElementById('body').style["overflow"] = "auto";
    }
  }

  toggleDetails() {
    const { showDetails } = this.state;
    this.setState({ showDetails: !showDetails });
  }

  clickToBlowUp() {
    const { blownUp } = this.state;
    if (blownUp) {
      return;
    }
    this.setState({ blownUp: true });
    document.addEventListener("mousedown", this.handleClickOutside);
    document.getElementById('body').style["overflow"] = "hidden";
  }

  render() {
    const {
      blownUp,
      showDetails
    } = this.state;
    const {
      uuid,
      name,
      imgClass,
      description,
      galleryType,
    } = this.props;

    var photoClassName;
    switch (galleryType) {
      case GALLERYTYPES.MIRRORIMAGE:
        photoClassName = "mirror-image";
        break;
      case GALLERYTYPES.TRIPTYCH:
        photoClassName = "triptych";
        break;
      default:  // select
        photoClassName = "default";
        break;
    }
    return (
      <>
        <div className={`photo-slot-${photoClassName}`}>
          <Photo
            uuid={uuid}
            id={uuid}
            imgClass={`clickable ${imgClass}`}
            clickCallback={this.clickToBlowUp}
          />
        </div>
        {
          blownUp ? (
            <div className='blown-up-container'>
              <div className='blown-up-content'>
                <Photo
                  uuid={uuid}
                  id={uuid}
                  imgClass={`blown-up-image${showDetails ? '' : '-big'}`}
                />
                {
                  showDetails ? (
                    <>
                      <h3 className='fancy big-text'>{name}</h3>
                      {
                        description === "" ? null : (<h3 className='alt big-text'><em>{description}</em></h3>)
                      }
                      {/* add offered sizes */}
                      <div id={uuid} className='details-box mfs' onClick={() => { this.toggleDetails() }}>
                        hide details
                      </div>
                    </>
                  ) : (
                    <div id={uuid} className='details-box mfs' onClick={() => { this.toggleDetails() }}>
                      show details
                    </div>
                  )
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
  imgClass: '',
  description: '',
}

ClickablePhoto.propTypes = {
  // prop types go here
  uuid: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  galleryType: PropTypes.string.isRequired,
  imgClass: PropTypes.string,
  description: PropTypes.string,
};

export default ClickablePhoto
