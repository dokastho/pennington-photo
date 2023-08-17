import React from 'react'
import SideBar from './Sidebar';
import EditGallery from './EditGallery';
import EditGalleries from './EditGalleries';
import UserList from './UserList';

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
  }

  componentDidMount() {
    // fetch all gallery metadata
    fetch("/api/v1/admin/", { credentials: 'same-origin' })
      .then((response) => {
        if (!response.ok) throw Error(response.statusText);
        return response.json();
      })
      .then((data) => {
        this.setState({
          galleries: data.galleries,
          users: data.users,
          loaded: true
        });
      })
      .catch((error) => console.log(error));
  }

  showContent(displayedContent) {
    this.setState({ displayedContent });
  }

  doEditGallery(editingGalleryIdx) {
    this.setState({ editingGalleryIdx });
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
      content = <EditGallery content={galleries[editingGalleryIdx]} />;
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
          <SideBar setContentFocus={this.showContent} />
          <a href='/gallery/new/'>
            <div className='new-button'>
              Create a new gallery
            </div>
          </a>
          {content}
        </div>
      </>
    );
  }
}

export default Admin
