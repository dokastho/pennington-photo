/**
 * Pennington Photographics
 *
 * TJ Dokas <mailto:tjdokas@gmail.com>
 */

import React from "react";

class Accounts extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h1>Account Settings</h1>
        <form action="/accounts/logout/" method="post">
          <input type="submit" value="logout" />
        </form>
        <br />
        <a href="/accounts/password/">Change password</a>
        <br />
      </div>
    );
  }
}

export default Accounts;
