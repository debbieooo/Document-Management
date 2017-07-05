import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import UserList from './UserList.jsx';
import Paginate from './Paginate.jsx';
import * as userActions from '../../actions/userAction';
import SearchBox from './SearchBox.jsx';

class ManageUser extends React.Component {
  /**
   * Creates an instance of ManageUser.
   * @param {any} props
   * @param {any} context
   *
   * @memberof ManageUser
   */
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
  /**
   *
   *
   *
   * @memberof ManageUser
   */
  componentDidMount() {
    this.props.actions.userlist();
  }
  /**
   *
   *
   * @param {any} userId
   *
   * @memberof ManageUser
   */
  handleClick(userId) {//eslint-disable-line
    this.props.actions.deleteAcc(userId);
  }
  /**
   *
   *
   * @param {any} nextProps
   *
   * @memberof ManageUser
   */
  componentWillReceiveProps(nextProps) {
    this.setState({ users: nextProps.users });
  }
/**
 *
 *
 * @param {any} event
 *
 * @memberof ManageUser
 */
  handlePageChange(page) {
    this.props.actions.userlist(
      this.state.limit, (page - 1) * this.state.limit
    );
  }
  /**
   *
   *
   * @param {any} event
   *
   * @memberof ManageUser
   */
  inputChange(event) {
    const users = [...this.props.users];
    this.setState({
      limit: event.target.value, users: users.splice(0, event.target.value)
    });
  }
  /**
   *
   *
   * @param {any} event
   *
   * @memberof ManageUser
   */
  handleSearch(event) {
    this.props.actions.searchUser(event.target.value);
    this.setState({ searching: event.target.value.length > 0 });
  }
  /**
   *
   *
   * @returns
   *
   * @memberof ManageUser
   */
  render() {
    const users = this.state.searching ? this.props.search : this.state.users;
    return (
      <div>
      {this.props.users && this.props.users.length > 1
        ? <div>
        <div className="row">
          <div className="col s12">
            <SearchBox onChange = {this.handleSearch}/>
          </div>
        </div>
        <UserList users = {users} onClick ={this.handleClick}/>
        {!this.state.searching ?
            <div className="col s12">
              <Paginate
                pageCount={this.props.metadata.pageCount}
                handleChange={this.handlePageChange}
                currentPage={this.props.metadata.page}
              />
            </div> : ''}
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
/**
 *
 *
 * @param {any} state
 * @returns
 */
function mapStateToProps(state) {
  return {
    users: state.users.users,
    metadata: state.users.metadata,
    search: state.search.search
  };
}
/**
 *
 *
 * @param {any} dispatch
 * @returns
 */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(userActions, dispatch)
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(ManageUser);
