/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/alt-text */
// eslint-disable-next-line import/no-extraneous-dependencies
import React from 'react';

const items = ['Home', 'Galleries', 'Contact'];

const timerInterval = 3500; // in ms
const transitionInterval = 200; // in ms

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: [false, false],
      displayLinks: false,
      displayTitles: true,
    };
    this.timeout = null;

    this.showLinks = this.showLinks.bind(this);
    this.showTitles = this.showTitles.bind(this);
    this.setLoaded = this.setLoaded.bind(this);
    this.mouseOver = this.mouseOver.bind(this);
    this.mouseLeave = this.mouseLeave.bind(this);
    this.contentDisplayTimer = this.contentDisplayTimer.bind(this);
  }

  componentDidMount() {
    this.contentDisplayTimer(2000);
  }

  setLoaded(index) {
    const {
      loaded,
    } = this.state;
    loaded[index] = true;
    this.setState({ loaded });
  }

  mouseOver() {
    if (this.timeout) {
      clearTimeout(this.timeout);
      this.timeout = null;
    }
    this.showLinks();
  }

  mouseLeave() {
    this.contentDisplayTimer(timerInterval);
  }

  showLinks() {
    setTimeout(() => {
      this.setState({ displayLinks: true });
    }, transitionInterval);
    this.setState({ displayTitles: false });
  }

  showTitles() {
    setTimeout(() => {
      this.setState({ displayTitles: true });
    }, transitionInterval);
    this.setState({ displayLinks: false });
  }

  contentDisplayTimer(interval) {
    this.timeout = setTimeout(() => {
      const { displayLinks } = this.state;
      if (displayLinks) {
        this.showTitles();
      } else {
        this.showLinks();
      }
      this.contentDisplayTimer(timerInterval);
    }, interval);
  }

  render() {
    const {
      loaded,
      displayLinks,
      displayTitles,
    } = this.state;
    return (
      <div className="navbar" onMouseEnter={() => { this.mouseOver(); }} onMouseLeave={() => { this.mouseLeave(); }}>
        <div className="navbar-icon">
          <a href="/admin/">
            <img src="/static/icon/Bio.png" className={`navbar-icon ${loaded[0] ? 'loaded-nf' : 'loading-nf'}`} key="admin-icon" onLoad={() => { this.setLoaded(0); }} />
          </a>
        </div>
        <div className="navbar-spacer" />
        <div className="navbar-content">
          <div className={`navbar-links ${displayLinks ? 'loaded' : 'navbar-loading'}`}>
            {
              items.map((item) => (
                <a href={`/${item.toLowerCase()}/`} key={item}>
                  <div className="navbar-link">
                    {item}
                  </div>
                </a>
              ))
            }
          </div>
          <div className={`navbar-titles ${displayTitles ? 'loaded' : 'navbar-loading'}`}>
            <h3 className="navbar-title">
              The Photograpy of Donald N. Pennington
            </h3>
            <h3 className="navbar-title fancy">
              <em>
                &quot;Focus on Nature&quot;
              </em>
            </h3>
          </div>
        </div>
        <div className="navbar-icon">
          <a href="/cart/">
            <img src="/static/icon/Cart.png" className={`navbar-icon ${loaded[0] ? 'loaded-nf' : 'loading-nf'}`} key="cart-icon" onLoad={() => { this.setLoaded(1); }} />
          </a>
        </div>
      </div>
    );
  }
}

export default NavBar;
