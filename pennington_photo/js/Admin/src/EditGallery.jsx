import PropTypes from 'prop-types';
import React from 'react'
import EditablePhoto from './EditablePhoto';
import ConfirmatoryButton from './Buttons';

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
        dateTaken: null,
      },
      saveState: SAVED,
    };
    this.deletePhoto = this.deletePhoto.bind(this);
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
      galleryId
    } = this.props;
    const {
      content
    } = this.state;
    const {
      name,
      description,
      dateTaken
    } = content;
    fetch(`/api/v1/save/gallery/${galleryId}/`,
      {
        credentials: 'same-origin',
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, description, dateTaken }),
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

  deletePhoto(args) {
    const { pictureId } = args;
    fetch(`/api/v1/delete/photo/${pictureId}/`,
      {
        credentials: 'same-origin',
        method: 'POST',
      })
      .then((response) => {
        if (!response.ok) throw Error(response.statusText);
        this.setState((prevState) => ({
          content: {
            dateTaken: prevState.content.dateTaken,
            description: prevState.content.description,
            name: prevState.content.name,
            photos: prevState.content.photos.filter((photo) => photo.pictureId !== pictureId)
          }
        }));
        return response.json();
      })
      .catch((error) => console.log(error));
  }

  render() {
    const {
      galleryId,
      deleteGallery,
    } = this.props;
    const {
      content,
      saveState
    } = this.state;

    const {
      description,
      name,
      dateTaken,
      photos,
    } = content;

    return (
      <>
        <div className='dialogue'>
          <label>Name:</label>
          <input className='h1' type='text' value={name} onChange={(e) => { this.handleChange("name", e.target.value) }} />
          <label>Description:</label>
          <input className='h3 em fancy' type='text' value={description} onChange={(e) => { this.handleChange("description", e.target.value) }} />
          <label>Date:</label>
          <input className='h5' type='date' value={dateTaken} onChange={(e) => { this.handleChange("dateTaken", e.target.value) }} />
          <br />
        </div>
        <div className='photos-tray'>
          {
            photos.map((photo) => {
              const { name, description, stars } = photo;
              return (<EditablePhoto uuid={photo.uuid} content={{ name, description, stars }} pictureId={photo.pictureId} deletePhoto={this.deletePhoto} />)
            })
          }
        </div>
        <button type='submit' onClick={() => { this.doSave() }}>save</button>
        <label>{saveState}</label>
        <br />
        <ConfirmatoryButton text={"Delete"} callback={deleteGallery} args={{ galleryId }} />
      </>
    );
  }
}

EditGallery.propTypes = {
  content: PropTypes.instanceOf(Object).isRequired,
  galleryId: PropTypes.number.isRequired,
  // deleteGallery
};

export default EditGallery
