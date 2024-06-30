import PropTypes from 'prop-types';
import React from 'react'
import EditThumbnail from './EditThumbnail';

const SAVED = "Saved.";
const SAVING = "Saving...";
const UNSAVED = "Unsaved Changes.";

class EditGalleries extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      galleries: [],
      saveState: SAVED,
    }

    this.swap = this.swap.bind(this);
    this.swapleft = this.swapleft.bind(this);
    this.swapright = this.swapright.bind(this);
  }

  componentDidMount() {
    const { galleries } = this.props;
    this.setState({ galleries });
  }

  swap(lhs, rhs) {
    const { galleries } = this.state;
    fetch('/api/v1/swap/galleries/',
      {
        credentials: 'same-origin',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          lhsId: galleries[lhs].galleryId,
          rhsId: galleries[rhs].galleryId,
          lhsOrdernum: galleries[lhs].ordernum,
          rhsOrdernum: galleries[rhs].ordernum
        }),
      })
      .then((response) => {
        if (!response.ok) throw Error(response.statusText);
        const temp = galleries[lhs];
        galleries[lhs] = galleries[rhs];
        galleries[rhs] = temp;
        const tempon = galleries[lhs].ordernum;
        galleries[lhs].ordernum = galleries[rhs].ordernum;
        galleries[rhs].ordernum = tempon;
        this.setState({ saveState: SAVED });
        return response;
      })
      .catch((error) => console.log(error));
  }

  swapleft(idx) {
    const { galleries } = this.state;
    const lhs = (idx + galleries.length - 1) % galleries.length;
    this.swap(lhs, idx);
  }

  swapright(idx) {
    const { galleries } = this.state;
    const rhs = (idx + 1) % galleries.length;
    this.swap(idx, rhs);
  }

  render() {
    const {
      doEditGallery,
    } = this.props;
    const {
      galleries
    } = this.state;
    return (
      <>
        <div className='dialogue'>
          <h1>
            Your Galleries
          </h1>
          <br />
        </div>
        <div className='galleries-tray'>
          {
            galleries.map((gallery, idx) => {
              return (<EditThumbnail key={gallery.galleryId} name={gallery.name} galleryIdx={idx} imgSrc={gallery.thumbnail} doEditGallery={doEditGallery} galleryType={gallery.type} swapleft={this.swapleft} swapright={this.swapright} />)
            })
          }
        </div>
      </>
    );
  }
}

EditGalleries.propTypes = {
  galleries: PropTypes.instanceOf(Array).isRequired,
  // doEditGallery
};

export default EditGalleries

// notes
// still need to do all css