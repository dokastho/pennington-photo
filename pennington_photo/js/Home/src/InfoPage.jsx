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
            <p>
              Visualization and exploration of our natural environment is a rewarding experience. Beauty and composition can be found at arm's reach in our back yard, across the country and around the world. I believe that my next photograph could be my finest. I strive for this concept and continue to cherish for the splendor and magnificence of our natural environment.
            </p>
            <p>
              To capture the extreme detail, a full range of contrast, and delicate tonalities of the natural scene, my photography is Black & White with an 8 x 10 view camera. I believe that B & W photographs emphasize comprehensive visualization of the scene and focuses specifically on the interaction of light as it relates to form, tonality, contrast, mood, texture, shape, composition, and raw emotion within the scene. I believe that a dynamic B & W photograph is a beautiful and timeless image.
            </p>
            <p>
              All prints are mnade on Silver Gelatin Fiber based photographic paper, processed to archival standards, selenium toned and dry mounted on 100% rag museum board. I personally print and process all prints to order.
            </p>
          </div>
          <img src={`/static/img/${imgName}`} className='home-info-img' />
        </div>
      </div>
    );
  }
}

export default InfoPage
