import PropTypes from 'prop-types';
import React from 'react'

class UserList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      users: []
    };
  }

  componentDidMount() {
    const {
      users
    } = this.props;

    this.setState({ users });
  }

  render() {
    const {
      users
    } = this.state;
    return (
      <>
        {
          users.map((user) => {
            return (<p>{user.username}</p>);
          })
        }
      </>
    );
  }
}

UserList.propTypes = {
  users: PropTypes.instanceOf(Array).isRequired,
};

export default UserList

// todo: add user delete with confirmatory buttons and user create