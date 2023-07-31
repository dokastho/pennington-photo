import React from 'react'

const imgName = "IMG_3752.jpg"

class InfoPage extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='info-page'>
        <div className='bw-info'>
          <h1>What Makes Black and White The Best Medium?</h1>
          <br />
        </div>
        <div className='info-content'>
          <div className='info-text'>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi nec cursus dolor. Sed aliquet justo fermentum ligula accumsan molestie. Aliquam eleifend orci et mauris interdum, in pharetra nisl volutpat. Praesent quis diam volutpat, hendrerit lacus sed, sagittis tortor. Integer id dui fringilla, efficitur libero vel, auctor sapien. Sed ultrices, arcu et lobortis vestibulum, lorem quam pharetra sapien, in sollicitudin augue ligula id massa. Quisque aliquet luctus massa, ut sollicitudin metus aliquet sed. Aenean vel dignissim lorem. Nunc dignissim turpis ut dolor facilisis tincidunt. Duis nisl neque, tempus sed ullamcorper quis, consequat ut elit. Proin semper sem tortor, sed eleifend mauris vulputate sit amet. Cras a metus mauris. Suspendisse mollis pretium viverra. Fusce aliquam nunc a enim lacinia, sit amet sollicitudin sem finibus. Duis placerat orci non tristique iaculis. Cras tempor odio nisl, vitae sagittis sapien ullamcorper eu.
            </p>

            <p>Sed ornare sollicitudin libero id aliquam. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Suspendisse maximus augue nec dolor suscipit fermentum. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc molestie vestibulum sapien sed placerat. Cras auctor sem sit amet tempus convallis. Vestibulum tempus ex sed dolor venenatis volutpat. Integer id bibendum nisi, id ultrices nunc.
            </p>

            <p>Vivamus ultricies ex nec scelerisque venenatis. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nullam vulputate rutrum lectus sit amet blandit. Proin mollis diam quis sapien commodo condimentum. Morbi tincidunt ornare nisi a finibus. Sed nec tincidunt libero. Suspendisse eu orci ligula. Donec imperdiet vestibulum ultrices. Vivamus augue odio, lobortis id fringilla at, facilisis eleifend mi.
            </p>

            <p>Aenean id luctus odio. Praesent sagittis viverra convallis. Donec lorem nisl, vulputate ut mollis non, vulputate id diam. Aliquam facilisis nisi nec tortor varius fringilla. Suspendisse potenti. Integer bibendum magna ut cursus ullamcorper. Donec fermentum maximus neque, at malesuada ante tempor et. Maecenas in hendrerit arcu. Integer consectetur arcu et est posuere, at consectetur erat sollicitudin. Vestibulum tincidunt facilisis magna, rhoncus dignissim quam tincidunt rhoncus. Phasellus odio quam, commodo a purus in, lacinia vulputate ex. Duis eget pulvinar augue. Maecenas lacinia vehicula lorem euismod egestas. Fusce tempus leo metus, venenatis vestibulum dolor eleifend id.
            </p>

            <p>Praesent elementum sodales nisi, sed placerat ligula placerat rhoncus. In posuere mi sagittis sollicitudin feugiat. Sed sed consectetur purus. Fusce eget quam sed diam consequat iaculis a eget odio. Aliquam vestibulum mauris quam, sit amet dignissim dui tincidunt ut. Morbi pharetra sollicitudin justo ac ultrices. Sed et ante eget massa pretium accumsan. Proin lacus est, consequat a tempus eget, aliquam sit amet elit. Duis purus neque, consectetur a felis maximus, lobortis rhoncus augue. In in mi et felis lacinia dapibus viverra id lorem.
            </p>
          </div>
          <img src={`/static/img/${imgName}`} className='info-img' />
        </div>
      </div>
    );
  }
}

export default InfoPage
