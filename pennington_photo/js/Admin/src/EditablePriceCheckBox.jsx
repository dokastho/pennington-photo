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
      content: {
        offered: false,
        price: 0,
        info: "",
      },
      saveState: SAVED,
      picturepriceId: 0,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.doSave = this.doSave.bind(this);

    this.timeout = null;
  }

  componentDidMount() {
    const {
      offered,
      price,
      info,
      picturepriceId,
    } = this.props;

    const content = {
      offered,
      price,
      info,
    }

    this.setState({ content, picturepriceId });
  }

  handleSelectChange(offered) {
    const { pictureId, sizeId, callback } = this.props;
    const { content, picturepriceId } = this.state;
    content.offered = offered;
    content.price = 0;
    this.setState({ content });
    const { price } = content;
    callback({ price, offered, sizeId, picturepriceId });
    let uri = '';
    if (offered) {
      uri = '/api/v1/save/pictureprice/select/';
    } else {
      uri = '/api/v1/save/pictureprice/deselect/';
    }

    fetch(uri,
      {
        credentials: 'same-origin',
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          picturepriceId,
          pictureId,
          sizenameId: sizeId,
        }),
      })
      .then((response) => {
        if (!response.ok) throw Error(response.statusText);
        this.setState({ saveState: SAVED });
        return response.json();
      })
      .then((data) => {
        const { picturepriceId } = data;
        callback({ price, offered, sizeId, picturepriceId });
        this.setState({ picturepriceId });
      })
      .catch((error) => console.log(error));
  }

  handleChange(key, value) {
    const {
      content
    } = this.state;
    content[key] = value;
    this.setState({ content, saveState: UNSAVED, offered: true });
    if (this.timeout) {
      clearTimeout(this.timeout);
      this.timeout = null;
    }
    this.timeout = setTimeout(() => {
      this.timeout = null;
      this.setState({ saveState: SAVING });
      this.doSave();
    }, 100);
  }

  doSave() {
    // for changing price
    const {
      callback,
      sizeId,
    } = this.props;
    const {
      content,
      picturepriceId,
    } = this.state;
    const {
      price,
      offered
    } = content;
    callback({ price, offered, sizeId, picturepriceId });

    fetch('/api/v1/save/price/',
      {
        credentials: 'same-origin',
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ price, picturepriceId }),
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
      content,
      picturepriceId,
    } = this.state;
    const {
      uuid,
    } = this.props;
    const {
      info,
      price,
      offered,
    } = content;
    return (
      <div className='size-checkbox' key={`${picturepriceId}`} id={uuid}>
        <span id={uuid}>
          <input id={uuid} type='checkbox' checked={offered} onChange={() => { this.handleSelectChange(!offered) }} />
          <label id={uuid}>{info}</label>
        </span>
        {
          offered ? (
            <span id={uuid} className='right-text'>
              <label id={uuid}>Price: </label>
              <input id={uuid} type='text' value={price} onChange={(e) => { this.handleChange("price", e.target.value) }} />
            </span>
          ) : (
            <span>
              Check the box to set a price
            </span>
          )
        }
      </div>
    );
  }
}

EditablePriceCheckBox.propTypes = {
  // prop types go here
  // s: PropTypes.string.isRequired,
  offered: PropTypes.bool.isRequired,
  price: PropTypes.number,
  info: PropTypes.string.isRequired,
  uuid: PropTypes.string.isRequired,
  picturepriceId: PropTypes.number,
  sizeId: PropTypes.number.isRequired,
  pictureId: PropTypes.number.isRequired,
  // callback
};

export default EditablePriceCheckBox
