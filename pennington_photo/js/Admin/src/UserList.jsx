/**
 * Pennington Photographics
 *
 * TJ Dokas <mailto:tjdokas@gmail.com>
 */

import PropTypes from "prop-types";
import React from "react";
import EditUser from "./EditUser";

const NOT_EDITING = -1;

class UserList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      logname: "",
      editingUserIdx: NOT_EDITING,
    };
    this.deleteUser = this.deleteUser.bind(this);
    this.selectUser = this.selectUser.bind(this);
    this.cancelEdit = this.cancelEdit.bind(this);
  }

  componentDidMount() {
    const { users } = this.props;
    const logname = document.getElementById("logname").content;

    this.setState({ users, logname, editingUserIdx: NOT_EDITING });
  }

  selectUser(idx) {
    this.setState({ editingUserIdx: idx });
  }

  cancelEdit() {
    this.setState({ editingUserIdx: NOT_EDITING });
  }

  deleteUser(args) {
    const { user } = args;
    fetch(`/accounts/?target=/admin/`, {
      credentials: "same-origin",
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ operation: "delete", user }),
    })
      .then((response) => {
        if (!response.ok) throw Error(response.statusText);
        this.setState((prevState) => ({
          editingUserIdx: NOT_EDITING,
          users: prevState.users.filter((u) => u.username !== user),
        }));
        return response.json();
      })
      .catch((error) => console.error(error));
  }

  render() {
    const { users, editingUserIdx, logname } = this.state;
    const isEditing = editingUserIdx !== NOT_EDITING;
    return (
      <>
        <h1>Manage Administrators</h1>
        {isEditing ? (
          <EditUser
            logname={logname}
            username={users[editingUserIdx].username}
            deleteUser={this.deleteUser}
            cancelEdit={this.cancelEdit}
          />
        ) : (
          <>
            <h3>
              <a href="/accounts/create/" className="logout-button">
                Create a new Administrator Account
              </a>
            </h3>
            {users.map((user, idx) => {
              return (
                <div
                  className="edit-list-item"
                  onClick={() => {
                    this.selectUser(idx);
                  }}
                >
                  <h3>{user.username}</h3>
                </div>
              );
            })}
          </>
        )}
      </>
    );
  }
}

UserList.propTypes = {
  users: PropTypes.instanceOf(Array).isRequired,
};

export default UserList;
