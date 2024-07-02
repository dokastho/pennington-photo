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
              My love for photography began at an early age when I first became aware of the Polaroid Land camara which my parents had purchased. After taking a picture with it, a small B &amp; W print would come out of the camara, which to me appeared to be magic. From that time on, I became hooked on taking pictures and seeing them in dynamic B &amp; W. It wasn’t long until advanced types of film camaras became available and with my early love for B &amp; W photography, acquiring a more professional camara became a goal. After some time, I was able to purchase a 35 mm Nikon camara and soon afterward build a home dark room. The dark room allowed me to develop my own negatives and make various sizes of B &amp; W prints. As I became more involved in photography, including negative development, and making of photographic prints, I saw the need for an additional camara. My choice was a 4 x 5 view camara that provided for a larger negative which could be individually developed allowing more specific control. This camara system continued to provide exceptional results, however I wanted to add one more camara that would provide additional opportunities to provide further quality and photographic possibilities. I eventually purchased an 8 x 10 Deardoff view camera. With the 4 x 5 and the 8 x 10 view camaras I am able to provide various sizes of photographic prints of exceptional uniqueness and quality.
            </p>
            <p>
              Early in my photographic career, I was able to review the work of numerous national photographers including Alfred Steiglitz, Minor White, Walker Evans, Edward and Brett Weston, Ansel Adams and many others. After reviewing several prominent photographers, I discovered that some provided in-depth specialized workshops. My first choice was to apply to Ansel Adams's workshop held in Yosemite National Park. After being accepted, I studied negative development, printing procedures, and presentation techniques with Ansel and other prominent photographers in attendance. Over the years I have continued to correspond with renowned B x W photographers adding to my knowledge and experience.
            </p>
            <p>
              Currently, I photograph using my 8 x 10 view camara. When I go photographing, a large suitcase contains my camara, three lenses, two light meters, camara leveling device, focus lupe, and usually four film holders allowing for eight pieces of film. Also, I carry a carbon fiber tripod. All of this equipment is carried on a specially made aluminum cart with 27-inch titanium wheels and off-road tires. With this setup I can hike into remote wilderness areas where no trails exist.
            </p>
            <p> My darkroom contains three enlargers. First is an 10” x 10” cold light head that was specially made for me and attached to an Elwood structural frame. Second is a Bessler 45 MCRX with three heads including a universal color head and a dichro 45 computerized color head. My third enlarger is a Fortar Supper Chromega F which is usually my go to enlarger. With this equipment I strive to produce exceptional, permanent B &amp; W photographs
            </p>
            <p> In summary, I believe that my B &amp; W photographs emphasize comprehensive visualization of the natural scene and focuses specifically on the interaction of light as it relates to form, tonality, contrast, mood, texture, shape, composition, and raw emotion within the scene. A dynamic B &amp; W photograph is a beautiful and timeless image.
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default InfoPage
