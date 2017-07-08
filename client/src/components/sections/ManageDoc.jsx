import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import DocList from './DocList.jsx';
import { doclist, deleteDoc, searchDoc } from '../../actions/docAction';
import { activeUser } from '../../actions/userAction';
import SearchBox from './SearchBox.jsx';
import Paginate from './Paginate.jsx';

/**
 * 
 * 
 * @class ManageDoc
 * @extends {React.Component}
 */
class ManageDoc extends React.Component {
  /**
   * Creates an instance of ManageDoc.
   * @param {any} props from react component
   * @param {any} context from react
   *
   * @memberof ManageDoc
   */
  constructor(props, context) {
    super(props, context);
    this.state = {
      documents: props.documents,
      error: '',
      authUser: Object.assign({}, props.authUser),
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
   * @memberof ManageDoc
   */
  componentDidMount() {
    this.props.actions.activeUser().then(() => {
      this.props.actions.doclist();
    });
  }
  /**
   *
   *
   * @param {any} nextProps params
   * @returns {null} returns nothing
   * @memberof ManageDoc
   */
  componentWillReceiveProps(nextProps) {
    this.setState({ documents: nextProps.documents });
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
   * @param {any} docId param
   * @returns {null} returns nothing
   * @memberof ManageDoc
   */
  handleClick(docId) {
    this.props.actions.deleteDoc(docId);
  }
  /**
   *
   * @returns {null} returns nothing
   * @param {any} page params
   *
   * @memberof ManageDoc
   */
  handlePageChange(page) {
    // console.log(this.props);
    this.props.actions.doclist(
      this.state.limit, (page - 1) * this.state.limit
    );
  }
  /**
   *
   *
   * @param {any} event params
   * @returns {null} returns nothing
   * @memberof ManageDoc
   */
  inputChange(event) {
    const documents = [...this.props.documents];
    this.setState(
      {
        limit: event.target.value,
        documents: documents.splice(0, event.target.value)
      }
    );
  }
  /**
   *
   *
   * @param {any} event params
   * @returns {null} returns nothing
   * @memberof ManageDoc
   */
  handleSearch(event) {
    this.props.actions.searchDoc(event.target.value);
    this.setState({ searching: event.target.value.length > 0 });
  }
  /**
   *
   *
   * @returns {div} element
   *
   * @memberof ManageDoc
   */
  render() {
    const { authUser } = this.props;
    const documents = this.state.searching ?
      this.props.search : this.state.documents;
    return (
      <div id="manage-documents" className="manage-documents">
        {this.props.documents.length > 1
          ? <div>
            <div className="row">
              <div className="col s12">
                <SearchBox onChange={this.handleSearch} />
              </div>
            </div>
            <DocList
              documents={documents}
              authUser={authUser}
              onClick={this.handleClick}
            />
            {!this.state.searching ? <div className="col s12">
              <Paginate
                pageCount={this.props.metadata.pageCount}
                handleChange={this.handlePageChange}
                currentPage={this.props.metadata.page}
              />
            </div> : ''}
          </div>
          : <img src="default.gif" alt="loading" />
        }

      </div>
    );
  }
}

ManageDoc.propTypes = {
  authUser: PropTypes.object.isRequired,
  documents: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
  search: PropTypes.array.isRequired,
  metadata: PropTypes.object.isRequired
};
/**
 *
 * @returns {null} returns nothing
 * @param {any} state params
 *
 */
function mapStateToProps(state) {
  return {
    search: state.search.search,
    documents: state.documents.documents,
    users: state.users,
    authUser: state.authUser,
    metadata: state.documents.metadata
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
    actions: bindActionCreators({
      doclist, activeUser, deleteDoc, searchDoc
    }, dispatch
    )
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(ManageDoc);
