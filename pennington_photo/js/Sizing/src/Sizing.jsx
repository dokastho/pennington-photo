import React from 'react'
import NavBar from './NavBar';
import Loading from './Loading';

const filler = "++++++++";

class Sizing extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
    }
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ loaded: true });
    }, 40);
  }

  render() {
    const {
      loaded
    } = this.state;
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
                Photographics Info
              </h1>
              <div className='p'>
                <p>
                  I personally process all photographic prints to the highest quality and archival standards. All photographic images are processed using fiberbase silver gelatin double weight paper, selenium-toned for additional permanence, then washed and air-dried to create a permanent photograph and present a full tonal range and dynamic quality. A 4" X 5" negative is used to create photographic prints.
                </p>
                <p>
                  Prints are signed, numbered, mounted, matted and over-matted on white acid-free 4 ply 100% cotton rag museum board. Framing is silver or black metal. Contact me for additonal details.
                </p>
                <p>
                  Pricing varies per print and can be viewed in your cart.
                </p>
              </div>
              <h1>
                Print Selection
              </h1>
              <div className='p'>
                <h3>
                  Exclusive Photographic Prints
                </h3>
                <p>
                  In my collection of archival processed photographic prints, I have selected what I consider to be exclusive photographs that are my favorites and stand out from the rest. These prints are only printed 26" x 32", dry mounted on 32" x 40" museum board, and also framed 32" x 40". These exclusive photographic prints are limited to no more than 50 copies each.
                </p>
                <h3>
                  Mirror Image Prints
                </h3>
                <p>
                  Certain photographic images have the opportunity to be presented as mirror images. Mirror image photographs present a unique visual photographic presentation which is accomplished by printing the same image side by side with one image being printed in reverse of the other. The perspective of this type of combined photographic image is unusual and visually dynamic.
                </p>
                <h3>
                  Triptych Prints
                </h3>
                <p>
                  These photographic prints consist of three segments of one image arranged in a traditional triptych format. Two neighboring 6" x 10" photogrpahics accompany one central 10" x 10" print on a single piece of museum mount board that is then matted and framed 16" x 32".
                </p>
                <h3>
                  Favorite Images
                </h3>
                <p>
                  In the years spent photographing unique aspects of the natural environment, I have acquired a variety of images that I consider significant and desirable regarding composition, expressions of visual tonalities and images that can be beautifully expressed as a Black and White photograph. In the category of featured photographs, I have thus included some of the images that are my favorites. I also hope you enjoy the other photographic images in the adjoining categories.
                </p>
                <h3>
                  Framed & Unframed Sizes
                </h3>
                <p>
                  Prices for each print in a given size are as follows (unless otherwise listed)
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
        </div>
      </>
    );
  }
}

export default Sizing
