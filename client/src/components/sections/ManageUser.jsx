import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import UserList from './UserList.jsx';
import Paginate from './Paginate.jsx';
import * as userActions from '../../actions/userAction';
import SearchBox from './SearchBox.jsx';


class ManageUser extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      users: props.user,
      error: '',
      limit: 10,
      search: ''
    };
    this.handleClick = this.handleClick.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.inputChange = this.inputChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }
  componentDidMount() {
    this.props.actions.userlist();
  }
  handleClick(userId) {
    this.props.actions.deleteAcc(userId);
  }
  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
    this.setState({ users: nextProps.users });
  }

  handlePageChange(event) {
    this.props.actions.userlist(this.state.limit, event.target.value * this.state.limit);
    console.log('changing to');
  }
  inputChange(event) {
    const users = [...this.props.users];
    this.setState({ limit: event.target.value, users: users.splice(0, event.target.value) });
  }
  handleSearch(event) {
    this.props.actions.searchUser(event.target.value);
    console.log('handles state');

  }
  render() {
    console.log('this.properties', this.props.search.length);
    const  users  = this.props.search && this.props.search.length > 1 ? this.props.search : this.state.users;
    return (
      <div>
      {this.props.users.length > 1
        ? <div>
        <div className="row">
          <div className= "col s6"><SearchBox onChange = {this.handleSearch}/></div>

          <div className="right-align">
              <div className="input-field inline">
                <input id="number" type="number" className="validate" onChange= {this.inputChange}/>
                <label for="number" className="active">Limit</label>
              </div>
                <Paginate
                  pageCount={this.props.metadata.pageCount}
                  handleChange={this.handlePageChange}
                />
          </div>
        </div>
        <UserList users = {users} onClick ={this.handleClick}/>
      </div>
      : <img src="default.gif" />
      }
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
  console.log('state.users', state.search);
  return {
    users: state.users.users,
    metadata: state.users.metadata,
    search: state.search.search
  };
}
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(userActions, dispatch)
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(ManageUser);

