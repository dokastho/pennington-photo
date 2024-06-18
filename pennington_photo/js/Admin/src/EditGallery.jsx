import PropTypes from 'prop-types';
import React from 'react'
import EditablePhoto from './EditablePhoto';
import ConfirmatoryButton from './Buttons';
import GALLERYTYPES from './GalleryTypes';
import UploadLock from './UploadLock';

const SAVED = "Saved.";
const SAVING = "Saving...";
const UNSAVED = "Unsaved Changes.";

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
      displayLock: false,
    };
    this.deletePhoto = this.deletePhoto.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.doSave = this.doSave.bind(this);
    this.showLock = this.showLock.bind(this);

    this.swap = this.swap.bind(this);
    this.swapleft = this.swapleft.bind(this);
    this.swapright = this.swapright.bind(this);

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
      dateTaken,
      type,
    } = content;
    fetch(`/api/v1/save/gallery/${galleryId}/`,
      {
        credentials: 'same-origin',
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, description, dateTaken, type }),
      })
      .then((response) => {
        if (!response.ok) throw Error(response.statusText);
        this.setState({ saveState: SAVED });
        return response.json();
      })
      .catch((error) => console.log(error));
  }

  swap(lhs, rhs) {
    const { content } = this.state;
    const { photos } = content;
    console.log(photos[lhs]);
    console.log(photos[rhs]);
    fetch('/api/v1/swap/pictures/',
      {
        credentials: 'same-origin',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          lhsId: photos[lhs].pictureId,
          rhsId: photos[rhs].pictureId,
          lhsOrdernum: photos[lhs].ordernum,
          rhsOrdernum: photos[rhs].ordernum
        }),
      })
      .then((response) => {
        if (!response.ok) throw Error(response.statusText);
        this.setState({ saveState: SAVED });
        const temp = photos[lhs];
        photos[lhs] = photos[rhs];
        photos[rhs] = temp;
        const tempon = photos[lhs].ordernum;
        photos[lhs].ordernum = photos[rhs].ordernum;
        photos[rhs].ordernum = tempon;
        return response;
      })
      .catch((error) => console.log(error));
  }

  swapleft(idx) {
    const { content } = this.state;
    const { photos } = content;
    const lhs = (idx + photos.length - 1) % photos.length;
    this.swap(lhs, idx);
  }

  swapright(idx) {
    const { content } = this.state;
    const { photos } = content;
    const rhs = (idx + 1) % photos.length;
    this.swap(idx, rhs);
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

  showLock() {
    this.setState({ displayLock: true });
  }

  render() {
    const {
      galleryId,
      deleteGallery,
      deselectGallery,
    } = this.props;
    const {
      content,
      saveState,
      displayLock,
    } = this.state;

    const {
      description,
      name,
      dateTaken,
      photos,
      type,
    } = content;

    return (
      <>
        <div className='dialogue'>
          <div className='edit-stuff'>
            <h3>Edit Gallery Details</h3>
            <button onClick={() => { deselectGallery() }}>Return to Galleries</button><br />
            <br />
            <label>Name:</label>
            <input className='h1' type='text' value={name} onChange={(e) => { this.handleChange("name", e.target.value) }} /><br />
            <br />
            <label>Description:</label>
            <textarea className='h3 em fancy' type='text' value={description} onChange={(e) => { this.handleChange("description", e.target.value) }} /><br />
            <br />
            <label>Date:</label>
            <input className='h5' type='date' value={dateTaken} onChange={(e) => { this.handleChange("dateTaken", e.target.value) }} /><br />
            <br />
            <p>Type of photographics in this gallery</p>
            <input type="radio" id="default" name="type" value="default"
              checked={type === GALLERYTYPES.SELECT ? "checked" : null}
              onChange={(e) => { this.handleChange("type", e.target.value) }}
            />
            <label for="default">Default</label><br />
            <input type="radio" id="mirror_image" name="type" value="mirror_image"
              checked={type === GALLERYTYPES.MIRRORIMAGE ? "checked" : null}
              onChange={(e) => { this.handleChange("type", e.target.value) }}
            />
            <label for="mirror_image">Mirror Image</label><br />
            <input type="radio" id="triptych" name="type" value="triptych"
              checked={type === GALLERYTYPES.TRIPTYCH ? "checked" : null}
              onChange={(e) => { this.handleChange("type", e.target.value) }}
            />
            <label for="triptych">Triptych</label>
            <br />
            <br />
            <div className='upload-picture-form'>
              <h3>Add new photos to this gallery by clicking the "Attach" button below</h3>
              <form action="/api/v1/photo/new/" name='upload-pictures' encType="multipart/form-data" method="post">
                <input type='hidden' name='galleryId' value={galleryId} />
                <label htmlFor="file">Attach Pictures (.png, .jpg or .jpeg)</label><br />
                <input type="file" name="file" id="file" multiple required accept=".png, .jpg, .jpeg" onChange={() => { this.showLock(); }} />
                {
                  displayLock ? (
                    <>
                      <UploadLock />
                      {document.forms["upload-pictures"].submit()}
                    </>
                  ) : (null)
                }
              </form>
            </div>
            <br />
            <div className='menu-buttons'>
              <div className='save-buttons'>
                <button type='submit' onClick={() => { this.doSave() }}>Save Changes</button>
                <label className='save-label'>{saveState}</label>
              </div>
              <ConfirmatoryButton text={"Delete This Gallery"} callback={deleteGallery} args={{ galleryId }} />
            </div>
            <br />
            <h3><a href={`/gallery/${galleryId}/`} className='logout-button'>View This Gallery</a></h3>
            <br />
          </div>
          <br />
        </div>
        <div className='photos-tray'>
          {
            photos.map((photo, idx) => {
              const { name, description, stars, qty, total, sizes } = photo;
              return (
                <EditablePhoto
                  key={photo.uuid}
                  uuid={photo.uuid}
                  content={{ name, description, stars, qty, total, sizes }}
                  pictureId={photo.pictureId}
                  deletePhoto={this.deletePhoto}
                  swapleft={this.swapleft}
                  swapright={this.swapright}
                  idx={idx}
                />
              )
            })
          }
        </div>
      </>
    );
  }
}

EditGallery.propTypes = {
  content: PropTypes.instanceOf(Object).isRequired,
  galleryId: PropTypes.number.isRequired,
  // deleteGallery
  // deselectGallery
};

export default EditGallery
