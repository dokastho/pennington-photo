import React from 'react'
import SideBar from './Sidebar';
import EditGallery from './EditGallery';
import EditGalleries from './EditGalleries';
import UserList from './UserList';
import Loading from './Loading';

const NOT_EDITING = -1;

class Admin extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      displayedContent: "galleries",
      galleries: [],
      users: [],
      editingGalleryIdx: NOT_EDITING,

    };
    this.showContent = this.showContent.bind(this);
    this.doEditGallery = this.doEditGallery.bind(this);
    this.deleteGallery = this.deleteGallery.bind(this);
    this.deselectGallery = this.deselectGallery.bind(this);
  }

  componentDidMount() {
    // fetch all gallery metadata
    fetch("/api/v1/admin/", { credentials: 'same-origin' })
      .then((response) => {
        if (!response.ok) throw Error(response.statusText);
        return response.json();
      })
      .then((data) => {
        console.log(data)
        this.setState({
          galleries: data.galleries,
          users: data.users,
          loaded: true
        });
      })
      .catch((error) => console.log(error));
  }

  showContent(displayedContent) {
    this.setState({ displayedContent, editingGalleryIdx: NOT_EDITING });
  }

  doEditGallery(editingGalleryIdx) {
    this.setState({ editingGalleryIdx });
  }

  deleteGallery(args) {
    const { galleryId } = args;
    fetch(`/api/v1/delete/gallery/${galleryId}/`,
      {
        credentials: 'same-origin',
        method: 'POST',
      })
      .then((response) => {
        if (!response.ok) throw Error(response.statusText);
        this.setState((prevState) => ({
          galleries: prevState.galleries.filter((gallery) => gallery.galleryId !== galleryId),
          editingGalleryIdx: NOT_EDITING,
        }));
        return response.json();
      })
      .catch((error) => console.log(error));
  }

  deselectGallery() {
    this.setState({ editingGalleryIdx: NOT_EDITING });
  }

  render() {
    const {
      loaded,
      galleries,
      users,
      displayedContent,
      editingGalleryIdx,
    } = this.state;

    const isEditing = editingGalleryIdx !== NOT_EDITING;

    var content;
    if (isEditing) {
      content = <EditGallery content={galleries[editingGalleryIdx]} galleryId={galleries[editingGalleryIdx].galleryId} deleteGallery={this.deleteGallery} deselectGallery={this.deselectGallery} />;
    }
    else if (displayedContent === "galleries") {
      content = <EditGalleries galleries={galleries} doEditGallery={this.doEditGallery} />;
    }
    else if (displayedContent === "administrators") {
      content = <UserList users={users} />
    }

    return (
      <>
        {
          loaded ? (
            null
          ) : (
            <Loading />
          )
        }
        <div className={loaded ? 'loaded' : 'loading'}>
          <div className='admin-page'>
            <SideBar setContentFocus={this.showContent} />
            <div className='admin-content'>
              {content}
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Admin
