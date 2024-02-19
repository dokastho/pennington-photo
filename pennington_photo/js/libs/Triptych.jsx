import PropTypes from 'prop-types';
import Photo from './Photo';
import React from 'react'

class Triptych extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const {
      uuid_l,
      uuid_m,
      uuid_r,
      id,
      componentClass,
      clickCallback
    } = this.props;
    return (
      <>
        <div
          className={`triptych-tray ${componentClass}`}
          onClick={() => clickCallback()}
          id={id}
        >
          <Photo
            uuid={uuid_l}
            id={`${id}-left`}
            imgClass={`triptypch-side`}
            clickCallback={null()}
          />
          <Photo
            uuid={uuid_m}
            id={`${id}-middle`}
            imgClass={`triptypch-middle`}
            clickCallback={null()}
          />
          <Photo
            uuid={uuid_r}
            id={`${id}-right`}
            imgClass={`triptypch-side`}
            clickCallback={null()}
          />
        </div>
      </>
    );
  }
}

Triptych.defaultProps = {
  componentClass: '',
  id: '',
}

Triptych.propTypes = {
  // prop types go here
  uuid_l: PropTypes.string.isRequired,
  uuid_m: PropTypes.string.isRequired,
  uuid_r: PropTypes.string.isRequired,
  id: PropTypes.string,
  componentClass: PropTypes.string,
  // clickCallback
};

export default Triptych
