/*import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import UserList from './UserList.jsx';
import { userlist }  from '../../actions/userAction';
import * as userActions from '../../actions/userAction';
import CreateDoc from '../sections/CreateDoc.jsx';

class Dashboard extends React.Component {

  render() {
    console.log('users', this.props.users);
    const { users } = this.props;
    return (
      <div>
        <div className="row">
          <Link to="/users" className="waves-effect waves-light btn-large">Users</Link>
          <Link to="/documents" className="waves-effect waves-light btn-large">Documents</Link>
          <Link to="/profile" className=" disabled"> Edit Profile?</Link>
            <Link to="/documents/create" className=" disabled"><a className="btn-floating btn-large waves-effect waves-light red"><i className="material-icons">add</i></a></Link>
            

        </div>
      </div>
    );
  }
}


Dashboard.propTypes = {
  users: PropTypes.array.isRequired
};
Dashboard.defaultProps = {
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
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);*/
