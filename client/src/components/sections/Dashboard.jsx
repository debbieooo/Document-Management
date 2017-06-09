import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import UserList from './UserList.jsx';
import * as userActions from '../../actions/userAction';

class Dashboard extends React.Component {

  render() {
    console.log('users', this.props.users);
    const { users } = this.props;
    return (
      <div>
        <h1>Users</h1>
        <UserList users = {users} />
      </div>
    );
  }
}

Dashboard.propTypes = {
  users: PropTypes.array.isRequired
};

function mapStateToProps(state) {
  console.log('mapstate', state.user);
  return {
    users: state.user
  };
}
function mapDispatchToProps(dispatch) {
  console.log('userActions', userActions);
  return {
    actions: bindActionCreators(userActions, dispatch)
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);



