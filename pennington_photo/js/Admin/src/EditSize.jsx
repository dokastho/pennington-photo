import PropTypes from 'prop-types';
import React from 'react'

const SAVED = "Saved.";
const SAVING = "Saving...";
const UNSAVED = "Unsaved Changes.";

class EditablePriceCheckBox extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      // state attributes go here
      selected: false,
      price: 0,
      info: "",
      saveState: SAVED,
    };
    this.handleChange = this.handleChange.bind(this);
    this.doSave = this.doSave.bind(this);

    this.timeout = null;
  }

  componentDidMount() {
    const {
      selected,
      price,
      info
    } = this.props;

    this.setState({
      selected,
      price,
      info,
    });
  }

  handleChange(key, value) {
    const {
      content
    } = this.state;
    content[key] = value;
    this.setState({ content, saveState: UNSAVED, selected: true });
    if (this.timeout) {
      clearTimeout(this.timeout);
      this.timeout = null;
    }
    this.timeout = setTimeout(() => {
      this.timeout = null;
      this.setState({ saveState: SAVING });
      this.doSave();
    }, 1000);
  }

  doSave() {
    const {
      sizeId,
    } = this.props;
    const {
      price
    } = this.state;
    
    // API call to save price update
  }

  doSelect() {
    // API call to set this size as offered
  }

  doDeselect() {
    // API call to remove this size as offered
  }

  render() {
    const { } = this.state;
    return (
      <div>
      </div>
    );
  }
}

EditablePriceCheckBox.propTypes = {
  // prop types go here
  // s: PropTypes.string.isRequired,
  selected: PropTypes.bool.isRequired,
  price: PropTypes.number.isRequired,
  info: PropTypes.number.isRequired,
  sizeId: PropTypes.number.isRequired,
};

export default EditablePriceCheckBox

// NOTES
// on upload, insert into the sizes db each of the sizes as not offered
// when selected it becomes offered, deselected it does not
// price subject to change
