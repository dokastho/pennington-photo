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
              <div className='p'>
                <h3>
                  Exclusive Photographic Images
                </h3>
                <p>
                  In my collection of archival processed photographic prints, I have selected what I consider to be exclusive photographs that are my favorites and stand out from the rest. These prints are only printed 26" x 32", dry mounted on 32" x 40" museum board, and also framed 32" x 40". These exclusive photographic prints are limited to no more than 50 copies each.
                </p>
                <div className='info-content'>
                  {
                    galleries.length === 0 ? null : (
                      <Thumbnail key={galleries[0].galleryId} customClassName={"photo-slot-static-content"} name={galleries[0].name} galleryId={galleries[0].galleryId} imgSrc={galleries[0].thumbnail} galleryType={galleries[0].type} />
                    )
                  }
                </div>
                <h3>
                  Mirror Image Images
                </h3>
                <p>
                  Certain photographic images have the opportunity to be presented as mirror images. Mirror image photographs present a unique visual photographic presentation which is accomplished by printing the same image side by side with one image being printed in reverse of the other. The perspective of this type of combined photographic image is unusual and visually dynamic.
                </p>
                <div className='info-content'>
                  <div className='info-img nopadside'>
                    <Photo uuid={"miex1.jpg"} imgClass={"photo-slot-static-content"} />
                  </div>
                  <div className='info-img nopadside'>
                    <Photo uuid={"miex2.jpg"} imgClass={"photo-slot-static-content"} />
                  </div>
                </div>
                <div className='info-content'>
                  <div className='info-img nopadside'>
                    <Photo uuid={"miex3.jpg"} imgClass={"photo-slot-static-content"} />
                  </div>
                  <div className='info-img nopadside'>
                    <Photo uuid={"miex4.jpg"} imgClass={"photo-slot-static-content"} />
                  </div>
                </div>
                <h3>
                  Triptych Images
                </h3>
                <p>
                  These photographic prints consist of three segments of one image arranged in a traditional triptych format. Two neighboring 6" x 10" photogrpahics accompany one central 10" x 10" print on a single piece of museum mount board that is then matted and framed 16" x 32".
                </p>
                <div className='info-content'>
                  <Photo uuid={"tripex.jpg"} imgClass={"photo-slot-static-content"} />
                </div>
                <div className='info-content favorites-info-content-side-by-side'>
                  <div className='info-text'>
                    <h3>
                      Favorite Images
                    </h3>
                    <p>
                      In the years spent photographing unique aspects of the natural environment, I have acquired a variety of images that I consider significant and desirable regarding composition, expressions of visual tonalities and images that can be beautifully expressed as a Black and White photograph. In the category of featured photographs, I have thus included some of the images that are my favorites. I also hope you enjoy the other photographic images in the adjoining categories.
                    </p>
                  </div>
                  <div className='info-img'>
                    <Photo uuid={"img073.jpg"} imgClass={"photo-slot-static-content"} />
                  </div>
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
            {/* <div className='dialogue'>
              <h1>
                Photo Galleries
              </h1>
              <h3>
                Explore below
              </h3>
              <br />
            </div>
            <div className='galleries-tray'>
              {
                galleries.map((gallery) => {
                  return (<Thumbnail key={gallery.galleryId} name={gallery.name} galleryId={gallery.galleryId} imgSrc={gallery.thumbnail} galleryType={gallery.type} />)
                })
              }
            </div> */}
          </div>
        </div>
      </>
    )
  }
}

export default Galleries
