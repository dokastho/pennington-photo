/**
 * Pennington Photographics
 *
 * TJ Dokas <mailto:tjdokas@gmail.com>
 */

import React from "react";
import SideBar from "./Sidebar";
import EditGallery from "./EditGallery";
import EditGalleries from "./EditGalleries";
import { BrowserView, MobileView } from "react-device-detect";
import MobilePage from "./MobilePage";
import UserList from "./UserList";
import Loading from "./Loading";
import SizeList from "./SizeList";

const NOT_EDITING = -1;

class Admin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      displayedContent: "galleries",
      galleries: [],
      users: [],
      sizes: [],
      editingGalleryIdx: NOT_EDITING,
    };
    this.showContent = this.showContent.bind(this);
    this.doEditGallery = this.doEditGallery.bind(this);
    this.deleteGallery = this.deleteGallery.bind(this);
    this.deselectGallery = this.deselectGallery.bind(this);
    this.fetchState = this.fetchState.bind(this);
  }

  componentDidMount() {
    this.fetchState();
  }

  fetchState() {
    fetch("/api/v1/admin/", { credentials: "same-origin" })
      .then((response) => {
        if (!response.ok) throw Error(response.statusText);
        return response.json();
      })
      .then((data) => {
        this.setState({
          galleries: data.galleries,
          users: data.users,
          sizes: data.sizes,
          loaded: true,
        });
      })
      .catch((error) => console.error(error));
  }

  showContent(displayedContent) {
    this.fetchState();
    this.setState({ displayedContent, editingGalleryIdx: NOT_EDITING });
  }

  doEditGallery(args) {
    const { galleryIdx } = args;
    document.body.scrollTop = document.documentElement.scrollTop = 0;
    this.setState({ editingGalleryIdx: galleryIdx });
  }

  deleteGallery(args) {
    const { galleryId } = args;
    fetch(`/api/v1/delete/gallery/${galleryId}/`, {
      credentials: "same-origin",
      method: "POST",
    })
      .then((response) => {
        if (!response.ok) throw Error(response.statusText);
        this.setState((prevState) => ({
          galleries: prevState.galleries.filter(
            (gallery) => gallery.galleryId !== galleryId,
          ),
          editingGalleryIdx: NOT_EDITING,
        }));
        return response.json();
      })
      .catch((error) => console.error(error));
  }

  deselectGallery() {
    this.setState({ editingGalleryIdx: NOT_EDITING });
  }

  render() {
    const {
      loaded,
      galleries,
      users,
      sizes,
      displayedContent,
      editingGalleryIdx,
    } = this.state;

    const isEditing = editingGalleryIdx !== NOT_EDITING;

    var content;
    if (isEditing) {
      content = (
        <EditGallery
          content={galleries[editingGalleryIdx]}
          galleryId={galleries[editingGalleryIdx].galleryId}
          deleteGallery={this.deleteGallery}
          deselectGallery={this.deselectGallery}
        />
      );
    } else if (displayedContent === "galleries") {
      content = (
        <EditGalleries
          galleries={galleries}
          doEditGallery={this.doEditGallery}
        />
      );
    } else if (displayedContent === "administrators") {
      content = <UserList users={users} />;
    } else if (displayedContent === "print sizes") {
      content = <SizeList sizes={sizes} />;
    }

    const rerender = Math.random();

    return (
      <>
        <BrowserView>
          {loaded ? null : <Loading />}
          <div className={loaded ? "loaded" : "loading"}>
            <div className="admin-page">
              <SideBar setContentFocus={this.showContent} />
              <div
                className="admin-content"
                key={`${displayedContent}-key-${rerender}`}
              >
                {content}
              </div>
            </div>
          </div>
        </BrowserView>
        <MobileView>
          <div className="site">
            <MobilePage />
          </div>
        </MobileView>
      </>
    );
  }
}

export default Admin;
