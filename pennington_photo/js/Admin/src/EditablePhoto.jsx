import PropTypes from 'prop-types';
import React from 'react'
import ConfirmatoryButton from './Buttons';
import EditablePriceCheckBox from './EditablePriceCheckBox';
import Photo from './Photo';
import axios from "axios";

const SAVED = "Saved.";
const SAVING = "Saving...";
const UNSAVED = "Unsaved Changes.";

class EditablePhoto extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      blownUp: false,
      loadedArrows: [false, false],
      content: {
        name: "",
        description: "",
        stars: "",
        qty: null,
        total: null,
        sizes: [],
      },
      saveState: SAVED,
    };
    this.clickToBlowUp = this.clickToBlowUp.bind(this);
    this.wrapperRef = React.createRef();
    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.deletePhotoWrapper = this.deletePhotoWrapper.bind(this);

    this.handleChange = this.handleChange.bind(this);
    this.doSave = this.doSave.bind(this);
    this.setArrowLoaded = this.setArrowLoaded.bind(this);

    this.timeout = null;

    this.setPhotoSizes = this.setPhotoSizes.bind(this);
  }

  setArrowLoaded(index) {
    const {
      loadedArrows
    } = this.state;
    loadedArrows[index] = true;
    this.setState({ loadedArrows });
  }

  deletePhotoWrapper() {
    const {
      deletePhoto,
      pictureId,
    } = this.props;
    this.setState({ blownUp: false });
    document.removeEventListener("mousedown", this.handleClickOutside);
    document.getElementById('body').style["overflow"] = "auto";
    deletePhoto({ pictureId });
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
      pictureId
    } = this.props;
    const {
      content
    } = this.state;
    const {
      name,
      description,
      stars,
      qty,
      total,
    } = content;
    fetch(`/api/v1/save/photo/${pictureId}/`,
      {
        credentials: 'same-origin',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, description, stars, qty, total }),
      })
      .then((response) => {
        if (!response.ok) throw Error(response.statusText);
        this.setState({ saveState: SAVED });
        return response;
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

  handleClickOutside(event) {
    const { uuid } = this.props;
    if (event.target.id != uuid) {
      document.removeEventListener("mousedown", this.handleClickOutside);
      this.setState({ blownUp: false });
      document.getElementById('body').style["overflow"] = "auto";
    }
  }

  clickToBlowUp() {
    const { blownUp } = this.state;
    if (blownUp) {
      return;
    }
    this.setState({ blownUp: true });
    document.addEventListener("mousedown", this.handleClickOutside);
    document.getElementById('body').style["overflow"] = "hidden";
  }

  setPhotoSizes(size) {
    const {
      content
    } = this.state;
    const {
      price,
      offered,
      sizeId,
      picturepriceId
    } = size;

    content.sizes.forEach((s) => {
      if (s.sizenameId == sizeId) {
        s.actualPrice = Number(price);
        s.offered = Number(offered);
        s.picturepriceId = picturepriceId;
      }
    })
    this.setState({ content });
  }

  render() {
    const {
      uuid,
      imgClass,
      pictureId,
      swapleft,
      swapright,
      idx,
    } = this.props;
    const {
      blownUp,
      content,
      saveState,
      loadedArrows,
    } = this.state;
    const {
      name,
      description,
      stars,
      qty,
      total,
      sizes,
    } = content;
    const loadingArrows = !loadedArrows[0] || !loadedArrows[1];

    let safariAR = '';
    const userAgent = navigator.userAgent.toLowerCase();
    if (userAgent.indexOf('safari') != -1) {
      if (userAgent.indexOf('chrome') > -1) {
        //browser is chrome
      } else {
        //browser is safari, add css
        safariAR = " ar";
      }
    }
    return (
      <>
        <div className={`${imgClass}${safariAR}`} key={uuid}>
          <Photo
            uuid={uuid}
            id={uuid}
            key={uuid}
            imgClass='clickable'
            clickCallback={this.clickToBlowUp}
          />
          <div className='arrows'>
            {loadingArrows ? (<div className='center'><em>Arrow icons are loading...</em></div>) : null}
            <img
              key={"leftarrow"}
              src="/static/img/left.svg"
              type="image/svg+xml"
              className={`arrow ${!loadingArrows ? 'loaded-nf' : 'loading-nf'}`}
              onLoad={() => { this.setArrowLoaded(0) }}
              onClick={() => { swapleft(idx) }}>
            </img>
            <img
              key={"rightarrow"}
              src="/static/img/right.svg"
              type="image/svg+xml"
              className={`arrow ${!loadingArrows ? 'loaded-nf' : 'loading-nf'}`}
              onLoad={() => { this.setArrowLoaded(1) }}
              onClick={() => { swapright(idx) }}>
            </img>
          </div>
        </div>
        {
          blownUp ? (
            <div className='blown-up-container-nh'>
              <div className='blown-up-content'>
                <div className='blown-up-img-and-sizes'>
                  <Photo
                    uuid={uuid}
                    id={uuid}
                    key={uuid}
                    imgClass='blown-up-image'
                  />
                  <div className='edit-box right' id={uuid}>
                    <h3 id={uuid}><em id={uuid}>Select which sizes you would like to offer, and edit the price (if necessary)</em></h3>
                    {
                      sizes.map((size) => {
                        return (
                          <EditablePriceCheckBox
                            offered={Boolean(size.offered)}
                            actualPrice={size.actualPrice}
                            defaultPrice={size.defaultPrice}
                            info={size.name}
                            picturepriceId={size.picturepriceId}
                            sizeId={size.sizenameId}
                            pictureId={pictureId}
                            uuid={uuid}
                            callback={this.setPhotoSizes}
                          />
                        )
                      })
                    }
                    <br />
                  </div>
                </div>
                <div className='edit-box-bottom wide' id={uuid}>
                  <div className='edit-box-column' id={uuid}>
                    {/* name desc stars */}
                    <label id={uuid} className='fancy'>Name:</label>
                    <br id={uuid} />
                    <input id={uuid} className='span fancy full-width' type='text' value={name} onChange={(e) => { this.handleChange("name", e.target.value) }} />
                    <br id={uuid} />
                    <label id={uuid} className='fancy'>Description:</label>
                    <br id={uuid} />
                    <textarea id={uuid} className='edit-menu-area' value={description} onChange={(e) => { this.handleChange("description", e.target.value) }} />
                    <br id={uuid} />
                    <div className='menu-buttons with1200px' id={uuid}>
                      <div id={uuid}>
                        <button id={uuid} type='submit' onClick={() => { this.doSave() }}>Save</button>
                        <label id={uuid} className='fancy'>{saveState}</label>
                      </div>
                      <ConfirmatoryButton id={uuid} text={"Delete"} callback={this.deletePhotoWrapper} />
                    </div>
                  </div>
                  <div className='edit-box-column' id={uuid}>
                    {/* edition qty, total and stars */}
                    <br id={uuid} />
                    <br id={uuid} />
                    <br id={uuid} />
                    <br id={uuid} />
                    <label id={uuid} className='fancy'>Edition:</label>
                    <input id={uuid} className='span fancy' type='number' value={qty} onChange={(e) => { this.handleChange("qty", e.target.value) }} />
                    <br id={uuid} />
                    <label id={uuid} className='fancy'>Limit:</label>
                    <input id={uuid} className='span fancy' type='number' value={total} onChange={(e) => { this.handleChange("total", e.target.value) }} />
                    <br id={uuid} />
                    <label id={uuid} className='fancy'>Stars:</label>
                    <input id={uuid} className='span fancy' type='number' min="1" max="5" value={stars} onChange={(e) => { this.handleChange("stars", e.target.value) }} />
                  </div>
                </div>
              </div>
            </div>
          ) : null
        }
      </>
    );
  }
}

EditablePhoto.defaultProps = {
  imgClass: 'photo-slot-default',
}

EditablePhoto.propTypes = {
  uuid: PropTypes.string.isRequired,
  pictureId: PropTypes.number.isRequired,
  imgClass: PropTypes.string,
  content: PropTypes.instanceOf(Object).isRequired,
  idx: PropTypes.number.isRequired,
  // swapleft
  // swapright
  // deletePhoto
};

export default EditablePhoto

// notes
// requires 
// delete confirmatory button
