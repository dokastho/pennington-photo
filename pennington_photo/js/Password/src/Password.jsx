import React from 'react'

class Password extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h1>Change Password</h1>
        <form action="/accounts/?admin/" method="post">
          <input type="hidden" name="operation" value="update_password" />
          <label htmlFor="oldpw">Old Password</label><br />
          <input type="password" name="oldpw" id="oldpw" /><br />
          <label htmlFor="newpw">New Password</label><br />
          <input type="password" name="newpw" id="newpw" /><br />
          <label htmlFor="renewpw">Retype New Password</label><br />
          <input type="password" name="renewpw" id="renewpw" /><br />
          <input type="submit" value="Reset Password" />
        </form>
      </div>
    );
  }
}

export default Password
