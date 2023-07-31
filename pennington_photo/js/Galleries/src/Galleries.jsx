import React from 'react';
import NavBar from './NavBar';

class Galleries extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loaded: true
    };
  }

  componentDidMount() {
    const { } = this.props;

    this.setState({});
  }

  render() {
    const {
      loaded,
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
          
        </div>
      </>
    )
  }
}

export default Galleries
