import React from 'react'

const imgName = "IMG_6867.png"

class InfoPage extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='info-page'>
        <div className='bw-info'>
          <br />
          <br />
          <br />
          <br />
          <h1>The Beauty and Power of Black & White Photography</h1>
          <br />
        </div>
        <div className='home-info-content'>
          <div className='home-info-text'>
            <img src={`/static/img/${imgName}`} className='home-info-img background-img' />
            <p>
              Visualization and exploration of our natural environment is a rewarding experience. Beauty and composition can be found at arm's reach in our backyard, across the country, and around the world. I believe that my next photograph could be my finest. I strive for this concept and continue to cherish the splendor and magnificence of our natural environment. I believe that B & W photographs emphasize comprehensive visualization of the scene and focuses specifically on the interaction of light as it relates to form, tonality, contrast, mood, texture, shape, composition, and raw emotion within the scene. I believe that a dynamic B & W photograph is a beautiful and timeless image.
            </p>
            <p>
              My images are created using either an 8"x10" or 4"x5" film camera. After the image is exposed, traditional and tedious photographic darkroom processes are incorporated in creating archival silver gelatin prints. Also prints are selenium toned for additional permanence. Processed prints are signed, mounted and over-matted on white acid free 4 ply 100% cotton rag museum board. My ultimate goal is to present exceptional B & W images, inspire viewers to develop a deep appreciation for natural landscapes, and encourage a desire to preserve our physical environment.
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default InfoPage
