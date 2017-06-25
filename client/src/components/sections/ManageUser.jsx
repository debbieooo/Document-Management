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
    this.props.actions.userlist();
    console.log('this.props.actions.userlist()', this.props.actions.userlist());

  }
  handleClick(userId) {
    this.props.actions.deleteAcc(userId);
  }
  render() {
    console.log('props', this.props);

    const { users } = this.props;
    return (
      <div>
        {console.log('userssssssss', this.props.users)}
        <UserList users = {users} onClick ={this.handleClick}/>
      </div>
    );
  }
}
ManageUser.propTypes = {
  user: PropTypes.array.isRequired
};
ManageUser.defaultProps = {
  users: []
};

function mapStateToProps(state) {
  console.log('state.users', state.users);
  return {
    users: state.users
  };
}
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(userActions, dispatch)
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(ManageUser);

