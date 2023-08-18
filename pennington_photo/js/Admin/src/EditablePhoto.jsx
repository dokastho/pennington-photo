import PropTypes from 'prop-types';
import React from 'react'
import Loading from './Loading';

const SAVED = "saved.";
const SAVING = "saving...";
const UNSAVED = "unsaved changes.";

class EditablePhoto extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      blownUp: false,

      content: {
        name: "",
        description: "",
        stars: "",
      },
      saveState: SAVED,
    };
    this.setLoaded = this.setLoaded.bind(this);
    this.clickToBlowUp = this.clickToBlowUp.bind(this);
    this.wrapperRef = React.createRef();
    this.handleClickOutside = this.handleClickOutside.bind(this);

    this.handleChange = this.handleChange.bind(this);
    this.doSave = this.doSave.bind(this);

    this.timeout = null;
  }

  componentDidMount() {
    const {
      content
    } = this.props;

    this.setState({
      content
    });
  }

  doSave() {
    const {
      pictureId
    } = this.props;
    const {
      content
    } = this.state;
    const {
      name,
      description,
      stars
    } = content;
    fetch(`/api/v1/save/photo/${pictureId}/`,
      {
        credentials: 'same-origin',
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, description, stars }),
      })
      .then((response) => {
        if (!response.ok) throw Error(response.statusText);
        this.setState({ saveState: SAVED });
        return response.json();
      })
      .catch((error) => console.log(error));
  }

  handleChange(key, value) {
    const {
      content
    } = this.state;
    content[key] = value;
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
      uuid,
      imgClass,
    } = this.props;
    const {
      loaded,
      blownUp,
      content,
      saveState
    } = this.state;
    const {
      name,
      description,
      stars
    } = content;
    return (
      <>
        <div className={imgClass} key={uuid}>
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
                <div className='edit-box' id={uuid}>
                  <label id={uuid} className='fancy'>Name:</label>
                  <input id={uuid} className='span fancy' type='text' value={name} onChange={(e) => { this.handleChange("name", e.target.value) }} />
                  <br />
                  <label id={uuid} className='fancy'>Description:</label>
                  <input id={uuid} className='span fancy' type='text' value={description} onChange={(e) => { this.handleChange("description", e.target.value) }} />
                  <br />
                  <label id={uuid} className='fancy'>Stars:</label>
                  <input id={uuid} className='span fancy' type='number' min="1" max="5" value={stars} onChange={(e) => { this.handleChange("stars", e.target.value) }} />
                  <br />
                  <br />
                  <button id={uuid} type='submit' onClick={() => { this.doSave() }}>save</button>
                  <label id={uuid} className='fancy'>{saveState}</label>
                </div>
              </div>
            </div>
          ) : null
        }
      </>
    );
  }
}

EditablePhoto.defaultProps = {
  imgClass: 'photo-slot',
}

EditablePhoto.propTypes = {
  // prop types go here
  uuid: PropTypes.string.isRequired,
  pictureId: PropTypes.number.isRequired,
  imgClass: PropTypes.string,
  content: PropTypes.instanceOf(Object).isRequired,
};

export default EditablePhoto

// notes
// when clicked display photo in place of gallery
// requires 
  // delete confirmatory button
  // back to gallery button
  // save every 1s like gallery
  // include save now button