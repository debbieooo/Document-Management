import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import UserList from './UserList.jsx';
import * as userActions from '../../actions/userAction';


class ManageUser extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      user: Object.assign({}, props.user),
      error: ''
    };
    this.handleClick = this.handleClick.bind(this);
  }
  componentDidMount() {
    console.log(localStorage.getItem('token'));
    this.props.actions.userlist();
  }
  handleClick(userId) {
    // console.log('i clicked here ');
    this.props.actions.deleteAcc(userId);
  }
  render() {
    console.log('users', this.props.users);
    const { users } = this.props;
    return (
      <div>
        <UserList users = {users} onClick ={this.handleClick}/>
      </div>
    );
  }
}
ManageUser.propTypes = {
  users: PropTypes.array.isRequired
};
ManageUser.defaultProps = {
  users: []
};

function mapStateToProps(state) {
  console.log('mapstate', state);
  return {

    users: state.users
  };
}
function mapDispatchToProps(dispatch) {
  // console.log('userActions', userActions);
  return {
    actions: bindActionCreators(userActions, dispatch)
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(ManageUser);

