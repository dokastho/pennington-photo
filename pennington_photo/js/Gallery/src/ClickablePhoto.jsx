import PropTypes from 'prop-types';
import React from 'react'
import Photo from './Photo';
import CartButton from './CartButton';
import GALLERYTYPES from './GalleryTypes';
import PhotoSizeListUser from './PhotoSizeListUser';

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
      qty,
      total,
      sizes,
      imgClass,
      description,
      galleryType,
    } = this.props;

    const onlyTotal = total && !qty;
    const both = total && qty;

    var photoClassName;
    switch (galleryType) {
      case GALLERYTYPES.MIRRORIMAGE:
        photoClassName = "mirror-image";
        break;
      case GALLERYTYPES.TRIPTYCH:
        photoClassName = "triptych";
        break;
      default:
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
                      <h3 className='alt big-text smallpad'>{name}</h3>
                      {
                        description === "" ? null : (<h3 className='alt big-text smallpad'><em>{description}</em></h3>)
                      }
                      {
                        onlyTotal ? (<p className='alt smallpad'><em>Limited Edition of {total}</em></p>) : null
                      }
                      {
                        both ? (<p className='alt smallpad'><em>Edition: {qty} of {total} available</em></p>) : null
                      }
                      {
                        // minprice ? (<p className='alt smallpad'><em>From ${minprice}</em></p>) : (<h3 className='alt big-text smallpad'><em>Not Available For Sale</em></h3>)
                      }
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
                <PhotoSizeListUser sizes={sizes} uuidForPhoto={uuid} photoName={name} />
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
  qty: PropTypes.number,
  total: PropTypes.number,
  sizes: PropTypes.instanceOf(Array).isRequired,
  galleryType: PropTypes.string.isRequired,
  imgClass: PropTypes.string,
  description: PropTypes.string,
};

export default ClickablePhoto
