/**
 * Pennington Photographics
 *
 * TJ Dokas <mailto:tjdokas@gmail.com>
 */

import React from "react";
import NavBar from "./NavBar";
import Thumbnail from "./Thumbnail";
import Photo from "./Photo";
import Loading from "./Loading";

class Galleries extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      galleries: [],
    };
  }

  componentDidMount() {
    fetch("/api/v1/galleries/", { credentials: "same-origin" })
      .then((response) => {
        if (!response.ok) throw Error(response.statusText);
        return response.json();
      })
      .then((data) => {
        this.setState({
          galleries: data,
          loaded: true,
        });
      })
      .catch((error) => console.error(error));
  }

  render() {
    const { loaded, galleries } = this.state;
    return (
      <>
        {loaded ? null : <Loading />}
        <div className={loaded ? "loaded" : "loading"}>
          <NavBar />
          <div className="site-contents">
            <div className="dialogue">
              <h1>Galleries</h1>
              <h4 className="text-justify">
                Welcome to my photographic galleries that display prints created
                using either an 8&quot;x10&quot; or 4&quot;x5&quot; film view
                camera. Traditional and tedious photographic darkroom processes
                are utilized to develop the negative and then printed on silver
                bromide, fiber based photographic paper. Each print is also
                toned in selenium for additional permanence and protection from
                atmospheric effects. Processed prints are mounted on white acid
                free 4 ply 100% cotton rag museum board. My ultimate goal is to
                present exceptional B &amp; W photographic images.
              </h4>
              <br />
              <div className="galleries-tray center">
                {galleries.map((gallery) => {
                  return (
                    <Thumbnail
                      key={gallery.galleryId}
                      customClassName={"photo-slot-static-content"}
                      name={gallery.name}
                      galleryId={gallery.galleryId}
                      imgSrc={gallery.thumbnail}
                      galleryType={gallery.type}
                      description={gallery.description}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Galleries;
