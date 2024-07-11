import PropTypes from 'prop-types';
import React from 'react'
import CartButton from './CartButton';

class PhotoSizeListUser extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const {
      sizes,
      uuidForPhoto,
      photoName,
    } = this.props;
    return (
      <>
        {
          sizes.length === 0 ? <h3 className='alt big-text smallpad'><em>Not Available For Sale</em></h3> :
            <div className='edit-box'>
              {sizes.map((size) => {
                return (
                  <div className='size-checkbox smallpad' >
                    <label>{size.name}</label>
                    <span className='right-text'>
                      <CartButton uuid={uuidForPhoto} photo={photoName} price={size.price} />
                    </span>
                  </div>
                )
              })}
            </div>
        }
      </>
    );
  }
}

PhotoSizeListUser.propTypes = {
  sizes: PropTypes.instanceOf(Array).isRequired,
  uuidForPhoto: PropTypes.string.isRequired,
  photoName: PropTypes.string.isRequired,
  // s: PropTypes.string.isRequired,
};

export default PhotoSizeListUser
