import PropTypes from 'prop-types';
import React from 'react'
import ConfirmatoryButton from './Buttons';

const SAVED = "Saved.";
const SAVING = "Saving...";
const UNSAVED = "Unsaved Changes.";

class EditSize extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      content: {
        info: "",
      },
      saveState: SAVED,
    }
    this.handleChange = this.handleChange.bind(this);
    this.doSave = this.doSave.bind(this);

    this.timeout = null;
  }

  componentDidMount() {
    const { sizename, price } = this.props;
    this.setState({ content: { info: sizename, price } });
  }

  handleChange(key, val) {
    const {
      content
    } = this.state;
    content[key] = val;
    this.setState({ content, saveState: UNSAVED });
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
      sizenameId,
      callback
    } = this.props;
    const {
      content
    } = this.state;
    const {
      info,
      price,
    } = content;
    callback({ sizenameId, info, price });
    fetch(`/api/v1/save/sizename/`,
      {
        credentials: 'same-origin',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ info, sizenameId, price }),
      })
      .then((response) => {
        if (!response.ok) throw Error(response.statusText);
        this.setState({ saveState: SAVED });
        return response;
      })
      .catch((error) => console.log(error));
  }

  render() {
    const {
      sizenameId,
      deleteSize,
      cancelEdit,
    } = this.props;
    const {
      content,
      saveState,
    } = this.state;
    const {
      info,
      price,
    } = content;
    return (
      <div className='edit-account'>
        <hr />
        <h3>Manage Size: "{info}"</h3>
        <div className='edit-list-menu'>
          <div>
          <label>Name: </label>
          <input className='edit-size-input' type='text' value={info} onChange={(e) => { this.handleChange("info", e.target.value) }} />
          </div>
          <div>
            <label>Price: </label>
            <input type='number' value={price} onChange={(e) => { this.handleChange("price", e.target.value) }} />
          </div>
        </div>
        <hr />
        <div className='menu-buttons'>
          <div>
            <button type='submit' onClick={() => { this.doSave() }}>Save</button>
            <label className='fancy'>{saveState}</label>
          </div>
          <button onClick={() => { cancelEdit() }}>go back</button>
          <ConfirmatoryButton text={"Delete"} args={{ sizenameId }} callback={deleteSize} />
        </div>
      </div>
    );
  }
}

EditSize.propTypes = {
  // prop types go here
  sizename: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  sizenameId: PropTypes.number.isRequired,
  // deleteSize
  // cancelEdit
  // callback
};

export default EditSize
