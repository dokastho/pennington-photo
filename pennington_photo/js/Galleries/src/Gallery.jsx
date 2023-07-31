import PropTypes from 'prop-types';
import React from 'react'

class Gallery extends React.Component {

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
      name
    } = this.props;
    return (
      <div>
        {name}
      </div>
    );
  }
}

Gallery.propTypes = {
  // prop types go here
  // s: PropTypes.string.isRequired,
};

Gallery.defaultProps = {
  // default prop values go here if not required
  name: PropTypes.string.isRequired,
};

export default Gallery
