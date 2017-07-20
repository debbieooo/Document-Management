import React from 'react';
import swal from 'sweetalert';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import sweetAlert from '../../alert.js';
import DocumentList from './DocumentList.jsx';
import { documentsList, deleteDoc, searchDoc } from '../../actions/documentAction';
import { activeUser } from '../../actions/userAction';
import SearchBox from './SearchBox.jsx';
import Paginate from './Paginate.jsx';

/**
 * 
 * 
 * @class ManageDocuments
 * @extends {React.Component}
 */
class ManageDocuments extends React.Component {
  /**
   * Creates an instance of ManageDocuments.
   * @param {any} props from react component
   * @param {any} context from react
   *
   * @memberof ManageDocuments
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
   * @memberof ManageDocuments
   */
  componentDidMount() {
    this.props.actions.activeUser().then(() => {
      this.props.actions.documentsList();
    });
  }
  /**
   *
   *
   * @param {any} nextProps params
   * @returns {null} returns nothing
   * @memberof ManageDocuments
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
   * @memberof ManageDocuments
   */
  handleClick(docId) {
    const text = 'You will not be able to recover this document';
    swal(sweetAlert(text),
      () => {
        this.props.actions.deleteDoc(docId);
        swal('Deleted!', 'The document has been deleted.', 'success');
      });
  }
  /**
   *
   * @returns {null} returns nothing
   * @param {any} page params
   *
   * @memberof ManageDocuments
   */
  handlePageChange(page) {
    this.props.actions.documentsList(
      this.state.limit, (page - 1) * this.state.limit
    );
  }
  /**
   *
   *
   * @param {any} event params
   * @returns {null} returns nothing
   * @memberof ManageDocuments
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
   * @memberof ManageDocuments
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
   * @memberof ManageDocuments
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
            <div>
              {this.state.searching && documents.length === 0 ?
                <center> <p>
                  <i className="material-icons">warning</i>
                   Document Not found </p>
                </center> :
                <DocumentList
                  documents={documents}
                  authUser={authUser}
                  onClick={this.handleClick}
                />}
            </div>
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

ManageDocuments.propTypes = {
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
      documentsList, activeUser, deleteDoc, searchDoc
    }, dispatch
    )
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(ManageDocuments);
