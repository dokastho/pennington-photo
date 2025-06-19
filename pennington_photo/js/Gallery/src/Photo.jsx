/**
 * Pennington Photographics
 *
 * TJ Dokas <mailto:tjdokas@gmail.com>
 */

import PropTypes from "prop-types";
import React from "react";
import Loading from "./Loading";

class Photo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      focused: true,
      defaultClassName: "photo",
    };
    this.setLoaded = this.setLoaded.bind(this);
    this.toggleFocused = this.toggleFocused.bind(this);
    this.handleContextMenu = this.handleContextMenu.bind(this);
  }

  componentDidMount() {
    window.addEventListener("blur", (e) => {
      this.toggleFocused(e, false);
    });
    window.addEventListener("focus", (e) => {
      this.toggleFocused(e, true);
    });
    document.addEventListener("contextmenu", (e) => {
      this.handleContextMenu(e);
    });

    const userAgent = navigator.userAgent.toLowerCase();
    if (userAgent.indexOf("safari") != -1) {
      if (userAgent.indexOf("chrome") > -1) {
      } else {
        this.setState({ defaultClassName: "photo-no-border" });
      }
    }
  }

  componentWillUnmount() {
    window.removeEventListener("blur", (e) => {
      this.toggleFocused(e, false);
    });
    window.removeEventListener("focus", (e) => {
      this.toggleFocused(e, true);
    });
    document.removeEventListener("contextmenu", (e) => {
      this.handleContextMenu(e);
    });
  }

  setLoaded() {
    this.setState({ loaded: true });
  }

  toggleFocused(e, focused) {
    this.setState({ focused });
  }

  handleContextMenu(e) {
    e.preventDefault();
  }

  render() {
    const { loaded, focused, defaultClassName } = this.state;
    const { uuid, imgClass, id, clickCallback, clickArgs } = this.props;
    return (
      <>
        {loaded ? null : <Loading />}
        <img
          src={`/static/img/${uuid}`}
          id={id === "" ? uuid : id}
          className={`${defaultClassName} ${imgClass} ${loaded ? "loaded" : "loading-invis"}${focused ? "" : " blur"}`}
          onLoad={() => {
            this.setLoaded();
          }}
          onClick={() => {
            clickCallback(clickArgs);
          }}
        />
      </>
    );
  }
}

Photo.defaultProps = {
  imgClass: "photo-slot-default",
  id: "",
  clickArgs: {},
};

Photo.propTypes = {
  uuid: PropTypes.string.isRequired,
  id: PropTypes.string,
  imgClass: PropTypes.string,
  clickArgs: PropTypes.instanceOf(Object),
};

export default Photo;
