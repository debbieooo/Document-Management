import React, { PropTypes } from 'react';
import swal from 'sweetalert';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import UserList from './UserList.jsx';
import Paginate from './Paginate.jsx';
import * as userActions from '../../actions/userAction';
import SearchBox from './SearchBox.jsx';
/**
 * 
 * 
 * @class ManageUser
 * @extends {React.Component}
 */
class ManageUser extends React.Component {
  /**
   * Creates an instance of ManageUser.
   * @param {any} props from react component
   * @param {any} context from react
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
   * @returns {null} returns nothing
   * @memberof ManageUser
   */
  componentDidMount() {
    this.props.actions.userlist();
  }
  /**
   *
   *
   * @param {any} nextProps for this.props
   * @returns {null} returns nothing
   * @memberof ManageUser
   */
  componentWillReceiveProps(nextProps) {
    this.setState({ users: nextProps.users });
  }
  /**
   *
   *
   * @returns {null} returns nothing
   * @memberof ManageUser
   */
  componentWilUnmount() {
    this.setState({});
  }
  /**
   *
   *
   * @param {any} userId params
   * @returns {null} returns nothing
   * @memberof ManageUser
   */
  handleClick(userId) {//eslint-disable-line
    swal({
      title: 'Are you sure?',
      text: 'You will not be able to recover this user!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#DD6B55',
      confirmButtonText: 'Yes, delete it!',
      closeOnConfirm: false
    },
    () => {
      this.props.actions.deleteAcc(userId);
      swal('Deleted!', 'The user has been deleted.', 'success');
    });
  }
  /**
 *
 *
 * @param {any} page parameter
 * @returns {null} returns nothing
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
   * @param {any} event parameter
   * @returns {null} returns nothing
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
   * @param {any} event parameter
   * @returns {null} returns nothing
   * @memberof ManageUser
   */
  handleSearch(event) {
    this.props.actions.searchUser(event.target.value);
    this.setState({ searching: event.target.value.length > 0 });
  }
  /**
   *
   *
   * @returns {null} returns nothing
   *
   * @memberof ManageUser
   */
  render() {
    const users = this.state.searching ? this.props.search : this.state.users;
    return (
      <div id="manage-users" className="manage-users">
        {this.props.users && this.props.users.length > 1
          ? <div>
            <div className="row">
              <div className="col s12">
                <SearchBox onChange={this.handleSearch} />
              </div>
            </div>
            <UserList users={users} onClick={this.handleClick} />
            {!this.state.searching ?
              <div className="col s12">
                <Paginate
                  pageCount={this.props.metadata.pageCount}
                  handleChange={this.handlePageChange}
                  currentPage={this.props.metadata.page}
                />
              </div> : ''}
          </div>
          : <img src="default.gif" alt="" />
        }
      </div>
    );
  }
}
ManageUser.propTypes = {
  users: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
  search: PropTypes.array.isRequired,
  metadata: PropTypes.object.isRequired
};
ManageUser.defaultProps = {
  users: []
};
/**
 *
 *
 * @param {any} state parameter
 * @returns {null} returns nothing
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
 * @param {any} dispatch params
 * @returns {null} returns nothing
 */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(userActions, dispatch)
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(ManageUser);
