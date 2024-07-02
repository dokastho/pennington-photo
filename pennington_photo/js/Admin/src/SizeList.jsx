import PropTypes from 'prop-types';
import React from 'react'
import EditSize from './EditSize';

const NOT_EDITING = -1;

class SizeList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      sizes: [],
      editingSizeIdx: NOT_EDITING,
    };
    this.deleteSize = this.deleteSize.bind(this);
    this.createSize = this.createSize.bind(this);
    this.selectSize = this.selectSize.bind(this);
    this.cancelEdit = this.cancelEdit.bind(this);
    this.setSizeInfo = this.setSizeInfo.bind(this);
  }

  componentDidMount() {
    const {
      sizes
    } = this.props;

    this.setState({ sizes, editingSizeIdx: NOT_EDITING });
  }

  selectSize(idx) {
    this.setState({ editingSizeIdx: idx });
  }

  cancelEdit() {
    this.setState({ editingSizeIdx: NOT_EDITING });
  }

  setSizeInfo(size) {
    const {
      sizes
    } = this.state;
    const { sizenameId, info, price } = size;
    sizes.forEach((s) => {
      if (s.sizenameId == sizenameId) {
        s.name = info;
        s.price = price;
      }
    })
    this.setState({ sizes });
  }

  createSize() {
    fetch(`/api/v1/size/new/`,
      {
        credentials: 'same-origin',
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: "blank", price: 0 }),
      })
      .then((response) => {
        if (!response.ok) throw Error(response.statusText);
        return response.json();
      })
      .then((data) => {
        this.setState((prevState) => ({ editingSizeIdx: NOT_EDITING, sizes: [...prevState.sizes, data] }));
      })
      .catch((error) => console.log(error));
  }

  deleteSize(args) {
    const {
      sizenameId
    } = args;
    fetch(`/api/v1/delete/sizenames/${sizenameId}/`,
      {
        credentials: 'same-origin',
        method: 'POST',
      })
      .then((response) => {
        if (!response.ok) throw Error(response.statusText);
        this.setState((prevState) => ({ editingSizeIdx: NOT_EDITING, sizes: prevState.sizes.filter((u) => u.sizenameId !== sizenameId) }));
        return response;
      })
      .catch((error) => console.log(error));
  }

  render() {
    const {
      sizes,
      editingSizeIdx,
    } = this.state;
    const isEditing = editingSizeIdx !== NOT_EDITING;
    return (
      <>
        <h1>Manage Print Sizes</h1>
        {
          isEditing ? (
            <EditSize sizename={sizes[editingSizeIdx].name} price={sizes[editingSizeIdx].price} sizenameId={sizes[editingSizeIdx].sizenameId} deleteSize={this.deleteSize} cancelEdit={this.cancelEdit} callback={this.setSizeInfo} />
          ) : (
            <>
              <h3><div className='submit-button' onClick={() => { this.createSize() }}>Create a new print size</div></h3>
              {
                sizes.map((size, idx) => {
                  return (
                    <>
                      <div className='edit-list-item' onClick={() => { this.selectSize(idx) }}>
                        <h3>{size.name}</h3>
                        <h3>${size.price}</h3>
                      </div>
                      <hr style={{width: '1200px', minWidth: "fit-content", float: "left"}} />
                      <br />
                    </>
                  );
                })
              }
            </>
          )

        }
      </>
    );
  }
}

SizeList.propTypes = {
  sizes: PropTypes.instanceOf(Array).isRequired,
};

export default SizeList
