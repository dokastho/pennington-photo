import React from 'react';
import NavBar from './NavBar';
import Thumbnail from './Thumbnail';
import Photo from './Photo';
import Loading from './Loading';

class Galleries extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      galleries: [],
    };
  }

  componentDidMount() {
    // fetch all gallery metadata
    fetch("/api/v1/galleries/", { credentials: 'same-origin' })
      .then((response) => {
        if (!response.ok) throw Error(response.statusText);
        return response.json();
      })
      .then((data) => {
        this.setState({
          galleries: data,
          loaded: true
        });
      })
      .catch((error) => console.log(error));
  }

  render() {
    const {
      loaded,
      galleries
    } = this.state
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
          <NavBar />
          <div className='site-contents'>
            <div className='dialogue'>
              <h1>
                Galleries
              </h1>
              <h4>
                Welcome to my photographic galleries that display prints created using either an 8&quot;x10&quot; or 4&quot;x5&quot; film view camera. Traditional and tedious photographic darkroom processes are utilized to develop the negative and then printed on silver bromide, fiber based photographic paper. Each print is also toned in selenium for additional permanence and protection from atmospheric effects. Processed prints are mounted on white acid free 4 ply 100% cotton rag museum board. My ultimate goal is to present exceptional B &amp; W photographic images.
              </h4>
              <div className='galleries-tray center'>
                {
                  galleries.map((gallery) => {
                    return <Thumbnail key={gallery.galleryId} customClassName={"photo-slot-static-content"} name={gallery.name} galleryId={gallery.galleryId} imgSrc={gallery.thumbnail} galleryType={gallery.type} description={gallery.description} />
                  })
                }
              </div>
              <h3>
                Framed & Unframed Sizes
              </h3>
              <p>
                Pricing varies per print and can be viewed in your cart.
              </p>
              <table>
                <tr>
                  <th>Print Size</th>
                  <th>Matted & Framed Size</th>
                </tr>
                <tr>
                  <td>11" X 14"</td>
                  <td>16" X 20"</td>
                </tr>
                <tr>
                  <td>16" X 20"</td>
                  <td>28" X 28"</td>
                </tr>
                <tr>
                  <td>20" X 24"</td>
                  <td>22" x 40"</td>
                </tr>
                <tr>
                  <td>26" X 32"</td>
                  <td>32" X 40"</td>
                </tr>
              </table>
              <p>
                6% sales tax will be added to orders. Shipping costs are variable depending on delivery speed and carrier. Orders are shipped within 3-4 weeks unless otherwise specified at time of ordering.
              </p>
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default Galleries
