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
      <div>
        <h1>main page</h1>
      </div>
    )
  }
}

render(
  <Index />,
  document.getElementById('reactEntry')
)