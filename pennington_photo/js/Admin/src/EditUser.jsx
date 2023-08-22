import PropTypes from 'prop-types';
import React from 'react'
import ConfirmatoryButton from './Buttons';

class EditUser extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      content: {
        pass1: "",
        pass2: "",
        success: false,
      }
    }
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(key, val) {
    const {
      content
    } = this.state;
    content[key] = val;
    this.setState({ content });
  }

  render() {
    const {
      username,
      logname,
      deleteUser,
      cancelEdit,
    } = this.props;
    const {
      content
    } = this.state;
    const {
      pass1,
      pass2,
      success,
    } = content;
    const isOtherAdmin = logname !== username && username !== 'dokastho';
    return (
      <div className='edit-account'>
        <h3>Manage Administrator {username}</h3>
        <hr />
        <h5>Change Password</h5>
        <form action="/accounts/?target=/admin/" method="post" onSubmitCapture={() => {
          this.handleChange("success", true)
        }}>
          <input type="hidden" name="operation" value="update_password" />
          <input type="hidden" name="username" value={username} />
          <input type="hidden" name="pass1val" value={pass1} />
          <input type="hidden" name="pass2val" value={pass2} />
          <label htmlFor="newpw">New Password</label><br />
          <input type="password" name="newpw" id="newpw" value={success ? "" : pass1} onChange={(e) => { this.handleChange('pass1', e.target.value) }} /><br />
          <label htmlFor="renewpw">Retype New Password</label><br />
          <input type="password" name="renewpw" id="renewpw" value={success ? "" : pass2} onChange={(e) => { this.handleChange('pass2', e.target.value) }} /><br />
          {
            success ? <span className='successpass'>Password reset successfully!</span> :
              pass1 !== pass2 ? (
                <span className='badpass'>Passwords do not match</span>
              ) : (
                <input type="submit" value="Reset Password" />
              )
          }
        </form>
        <hr />
        {
          isOtherAdmin ? <ConfirmatoryButton text={'Delete this administrator'} args={{'user': username}} callback={deleteUser} /> : null
        }
        <button onClick={() => { cancelEdit() }}>{success ? 'go back' : 'cancel'}</button>
      </div>
    );
  }
}

EditUser.propTypes = {
  // prop types go here
  username: PropTypes.string.isRequired,
  logname: PropTypes.string.isRequired,
  // deleteUser
  // cancelEdit
};

export default EditUser
