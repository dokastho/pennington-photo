import PropTypes from 'prop-types';
import React from 'react'

class UploadLock extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='upload-lock'>
        <div className='upload-lock-flexbox'>
          <div className='upload-lock-display'>
            <div className='upload-lock-content'>
              <h1 className='alt'>Uploading...</h1>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default UploadLock
