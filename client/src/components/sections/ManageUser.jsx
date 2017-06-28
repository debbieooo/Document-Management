import React, { PropTypes } from 'react';//eslint-disable-line
import { connect } from 'react-redux';//eslint-disable-line
import { bindActionCreators } from 'redux';//eslint-disable-line
import UserList from './UserList.jsx';//eslint-disable-line
import Paginate from './Paginate.jsx';//eslint-disable-line
import * as userActions from '../../actions/userAction';//eslint-disable-line
import SearchBox from './SearchBox.jsx';//eslint-disable-line


class ManageUser extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      users: [],
      error: '',
      limit: 10,
      searching: false
    };
    this.handleClick = this.handleClick.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.inputChange = this.inputChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }
  componentDidMount() {
    this.props.actions.userlist();
  }
  handleClick(userId) {//eslint-disable-line
    this.props.actions.deleteAcc(userId);
  }
  componentWillReceiveProps(nextProps) {
    this.setState({ users: nextProps.users });
  }

  handlePageChange(event) {
    this.props.actions.userlist(
      this.state.limit, event.target.value * this.state.limit
    );
  }
  inputChange(event) {
    const users = [...this.props.users];
    this.setState({
      limit: event.target.value, users: users.splice(0, event.target.value)
    });
  }
  handleSearch(event) {
    this.props.actions.searchUser(event.target.value);
    this.setState({ searching: event.target.value.length > 0 });
  }
  render() {
    const users = this.state.searching ? this.props.search : this.state.users;
    return (
      <div>
      {this.props.users && this.props.users.length > 1
        ? <div>
        <div className="row">
          <div className= "col s6">
            <SearchBox onChange = {this.handleSearch}/>
          </div>

          { !this.state.searching ? <div className="right-align">
              <div className="input-field inline">
                <input id="number"
                type="number"
                className="validate"
                onChange= {this.inputChange}/>
                <label htmlFor="number" className="active">Limit</label>
              </div>
                <Paginate
                  pageCount={this.props.metadata.pageCount}
                  handleChange={this.handlePageChange}
                />
          </div> : ''}
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
