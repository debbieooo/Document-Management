import React, { PropTypes } from 'react';//eslint-disable-line
import { connect } from 'react-redux';//eslint-disable-line
import { bindActionCreators } from 'redux';//eslint-disable-line
import DocList from './DocList.jsx';//eslint-disable-line
import { doclist, deleteDoc, searchDoc } from '../../actions/docAction';//eslint-disable-line
import { activeUser } from '../../actions/userAction';//eslint-disable-line
import SearchBox from './SearchBox.jsx';//eslint-disable-line
import Paginate from './Paginate.jsx';//eslint-disable-line


class ManageDoc extends React.Component {
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
  componentDidMount() {
    this.props.actions.doclist();
    this.props.actions.activeUser();
  }
  componentWillReceiveProps(nextProps) {
    this.setState({ documents: nextProps.documents });
  }
  handleClick(docId) {
    this.props.actions.deleteDoc(docId);
  }
  handlePageChange(event) {
    this.props.actions.doclist(
      this.state.limit, event.target.value * this.state.limit
    );
  }
  inputChange(event) {
    const documents = [...this.props.documents];
    this.setState(
      {
        limit: event.target.value,
        documents: documents.splice(0, event.target.value)
      }
  );
  }
  handleSearch(event) {
    this.props.actions.searchDoc(event.target.value);
    this.setState({ searching: event.target.value.length > 0 });
  }

  render() {
    const { authUser } = this.state;
    const documents =
    this.state.searching ? this.props.search : this.state.documents;

    return (
      <div>
        {this.props.documents.length > 1
        ? <div>
          <div className="row">
            <div className="col s6">
              <SearchBox onChange = {this.handleSearch}/>
            </div>
            {!this.state.searching ? <div className="right-align">
              <div className="input-field inline">
                <input id="number"
                 type="number"
                 className="validate"
                 onChange={this.inputChange} />
                <label htmlFor="number" className="active">Limit</label>
              </div>
              <Paginate
                pageCount={this.props.metadata.pageCount}
                handleChange={this.handlePageChange}
              />
            </div> : ''}
          </div>
          <DocList documents={documents}
           authUser={authUser}
           onClick={this.handleClick} />
            </div>
        : <img src="default.gif"/>
        }

      </div>
    );
  }
}

ManageDoc.propTypes = {
  documents: PropTypes.array.isRequired,
  users: PropTypes.array.isRequired,
  authUser: PropTypes.object.isRequired
};
ManageDoc.defaultProps = {
  documents: [],
  users: [],
  authUser: {}
};

function mapStateToProps(state) {
  return {
    search: state.search.search,
    documents: state.documents.documents,
    users: state.users,
    authUser: state.authUser,
    metadata: state.documents.metadata
  };
}
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      doclist, activeUser, deleteDoc, searchDoc }, dispatch
      )
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(ManageDoc);
