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
                Pricing
              </h1>
              <div className='p'>
                <p>
                  I personally process all photographic prints to the highest quality and archival standards. All photographic images are printed onto glossy fiberbase silver gelatin double weight paper and selenium-toned for additional permanence, then washed and air-dried. An 8" X 10" negative is used to create photographic prints.
                </p>
                <p>
                  Prints are signed, numbered, mounted, matted and over-matted on white acid-free 4 ply 100% cotton rag museum board. Framing is silver or black metal. Contact me for additonal details.
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
                  These photographs are only printed 26" X 32", dry-mounted on 32" X 40" museum board, and if requested, framed 32" X 40" on silver or black metal frames. These exclusive photographic prints are limited to no more than 50 copies each.
                </p>
                <h3>
                  Mirror Image Prints
                </h3>
                <p>
                  These photographs consist of two prints with one printed in reverse of the other. They are then mounted together on a single 32" X 42" piece of museum board, then over-matted. Framing would consist of silver or black metal.
                </p>
                <h3>
                  Select Photographic Prints
                </h3>
                <table>
                  <tr>
                    <th>Print Size</th>
                    <th>Matted & Framed Size</th>
                    <th>Matted Price</th>
                    <th>Matted, Overmatted & Framed Price</th>
                  </tr>
                  <tr>
                    <td>11" X 14"</td>
                    <td>16" X 20"</td>
                    <td>{filler}</td>
                    <td>{filler}</td>
                  </tr>
                  <tr>
                    <td>16" X 20"</td>
                    <td>28" X 28"</td>
                    <td>{filler}</td>
                    <td>{filler}</td>
                  </tr>
                  <tr>
                    <td>20" X 24"</td>
                    <td>{filler}</td>
                    <td>{filler}</td>
                    <td>{filler}</td>
                  </tr>
                  <tr>
                    <td>26" X 32"</td>
                    <td>32" X 40"</td>
                    <td>{filler}</td>
                    <td>{filler}</td>
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
