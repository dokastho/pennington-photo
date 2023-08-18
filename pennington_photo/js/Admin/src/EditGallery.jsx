import PropTypes from 'prop-types';
import React from 'react'
import EditablePhoto from './EditablePhoto';

const SAVED = "saved.";
const SAVING = "saving...";
const UNSAVED = "unsaved changes.";

class EditGallery extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      content: {
        description: "",
        name: "",
        photos: [],
      },
      saveState: SAVED,
    };
    this.handleChange = this.handleChange.bind(this);
    this.doSave = this.doSave.bind(this);
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
      galleryId
    } = this.props;
    const {
      content
    } = this.state;
    const {
      name,
      description
    } = content;
    fetch(`/api/v1/save/gallery/${galleryId}/`,
      {
        credentials: 'same-origin',
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, description }),
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
    setTimeout(() => {
      const { saveState } = this.state;
      if (saveState !== UNSAVED) {
        return;
      }
      this.setState({ saveState: SAVING });
      this.doSave();
    }, 1000);
  }

  render() {
    const {
      content,
      saveState
    } = this.state;

    const {
      description,
      name,
      photos,
    } = content;

    return (
      <>
        <div className='dialogue'>
          <label>Name:</label>
          <input className='h1' type='text' value={name} onChange={(e) => { this.handleChange("name", e.target.value) }} />
          <label>Description:</label>
          <input className='h3 em fancy' type='text' value={description} onChange={(e) => { this.handleChange("description", e.target.value) }} />
          <br />
        </div>
        <div className='photos-tray'>
          {
            photos.map((photo) => {
              return (<EditablePhoto uuid={photo.uuid} description={photo.description} />)
            })
          }
        </div>
        <button type='submit' onClick={() => { this.doSave() }}>save</button>
        <label>{saveState}</label>
      </>
    );
  }
}

EditGallery.propTypes = {
  content: PropTypes.instanceOf(Object).isRequired,
  galleryId: PropTypes.number.isRequired,
};

export default EditGallery

// notes
// save every 1s after changes for this component
// add save now button, no cancel
// delete photos using the editable photo component
