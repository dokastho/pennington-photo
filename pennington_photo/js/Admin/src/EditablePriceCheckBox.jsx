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
        actualPrice: 0,
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
      defaultPrice,
      actualPrice,
      info,
      picturepriceId,
    } = this.props;

    if (actualPrice === null) {
      const content = {
        offered,
        actualPrice: defaultPrice,
        info,
      };
      this.setState({ content, picturepriceId });
    }
    else {
      const content = {
        offered,
        actualPrice,
        info,
      };
      this.setState({ content, picturepriceId });
    }
  }

  handleSelectChange(offered) {
    const { pictureId, defaultPrice, sizeId, callback } = this.props;
    const { content, picturepriceId } = this.state;
    content.offered = offered;
    this.setState({ content });
    let uri = '';
    if (offered) {
      uri = '/api/v1/save/pictureprice/select/';
      content.actualPrice = defaultPrice;
    } else {
      uri = '/api/v1/save/pictureprice/deselect/';
    }
    const { actualPrice } = content;
    callback({ price: actualPrice, offered, sizeId, picturepriceId });

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
          price: actualPrice,
        }),
      })
      .then((response) => {
        if (!response.ok) throw Error(response.statusText);
        this.setState({ saveState: SAVED });
        return response.json();
      })
      .then((data) => {
        const { picturepriceId } = data;
        callback({ price: actualPrice, offered, sizeId, picturepriceId });
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
      actualPrice,
      offered
    } = content;
    callback({ price: actualPrice, offered, sizeId, picturepriceId });

    fetch('/api/v1/save/price/',
      {
        credentials: 'same-origin',
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ price: actualPrice, picturepriceId }),
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
      actualPrice,
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
              <input id={uuid} type='text' value={actualPrice} onChange={(e) => { this.handleChange("actualPrice", e.target.value) }} />
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
  defaultPrice: PropTypes.number,
  actualPrice: PropTypes.number,
  info: PropTypes.string.isRequired,
  uuid: PropTypes.string.isRequired,
  picturepriceId: PropTypes.number,
  sizeId: PropTypes.number.isRequired,
  pictureId: PropTypes.number.isRequired,
  // callback
};

export default EditablePriceCheckBox
