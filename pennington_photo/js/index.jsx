import React from 'react';
import { render } from 'react-dom';

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  componentDidMount() {}

  render() {
    return (
      <>
        <div className='welcome-page'>
          test content
        </div>
      </>
    )
  }
}

render(
  <Index />,
  document.getElementById('reactEntry')
)