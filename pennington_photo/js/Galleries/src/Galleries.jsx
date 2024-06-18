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
              {
                galleries.map((gallery) => {
                  return <Thumbnail key={gallery.galleryId} customClassName={"photo-slot-static-content"} name={gallery.name} galleryId={gallery.galleryId} imgSrc={gallery.thumbnail} galleryType={gallery.type} />
                })
              }
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
