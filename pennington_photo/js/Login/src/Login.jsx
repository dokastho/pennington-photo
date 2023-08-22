import React from 'react'

class Login extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h1>Log In</h1>
        <form action="/accounts/?target=/admin/" method="post">
          <input type="hidden" name="operation" value="login" />
          <label htmlFor="username">Username</label><br />
          <input type="text" name="username" id="username" /><br />
          <label htmlFor="password">Password</label><br />
          <input type="password" name="password" id="password" /><br />
          <input type="submit" value="log in" /><br />
        </form>
      </div>
    );
  }
}

export default Login
