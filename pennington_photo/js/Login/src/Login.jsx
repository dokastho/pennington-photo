import React from 'react'

class Login extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const badpass = document.getElementById("badpass").content === "True";
    return (
      <div className='center-static'>
        <h1>Log In</h1>
        <div className='badpass'>
          {
            badpass ? 'Username or Password was incorrect.' : ''
          }
        </div>
        <div className='center-static-content'>
          <form action="/accounts/?target=/admin/" method="post">
            <input type="hidden" name="operation" value="login" />
            <label htmlFor="username">Username</label><br />
            <input type="text" name="username" id="username" /><br />
            <label htmlFor="password">Password</label><br />
            <input type="password" name="password" id="password" /><br />
            <br />
            <div className='menu-buttons'>
              <div>
              </div>
              <input type="submit" value="log in" /><br />
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Login
