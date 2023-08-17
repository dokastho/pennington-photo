import PropTypes from 'prop-types';
import React from 'react'
import EditablePhoto from './EditablePhoto';

class EditGallery extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      description: "",
      name: "",
      photos: [],
    };
  }

  componentDidMount() {
    const {
      content
    } = this.props;

    this.setState({
      description: content.description,
      name: content.name,
      photos: content.photos,
    });
  }

  render() {
    const {
      description,
      name,
      photos,
    } = this.state;
    return (
      <>
        <div className='dialogue'>
          <h1>
            {name}
          </h1>
          <h3 className='fancy'>
            {
              description.length === 0 ? <br /> : (
                <em>
                  "{description}"
                </em>
              )
            }
          </h3>
          <br />
        </div>
        <div className='photos-tray'>
          {
            photos.map((photo) => {
              return (<EditablePhoto uuid={photo.uuid} description={photo.description} />)
            })
          }
        </div>
        <form>
          <button type='submit'>save</button>
        </form>
      </>
    );
  }
}

EditGallery.propTypes = {
  content: PropTypes.instanceOf(Object).isRequired,
};

export default EditGallery

// notes
// save every 1s after changes for this component
// add save now button, no cancel
// delete photos using the editable photo component
