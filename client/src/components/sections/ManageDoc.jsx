import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import DocList from './DocList.jsx';
import { doclist, deleteDoc } from '../../actions/docAction';
import { activeUser } from '../../actions/userAction';
import SearchBox from './SearchBox.jsx';
import Paginate from './Paginate.jsx';


class ManageDoc extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      documents: props.documents,
      error: '',
      authUser: Object.assign({}, props.authUser),
      limit: 10

    };
    this.handleClick = this.handleClick.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.inputChange = this.inputChange.bind(this);


  }
  componentDidMount() {
    this.props.actions.doclist();
    this.props.actions.activeUser();
  }
  handleClick(docId) {
    this.props.actions.deleteDoc(docId);
  }
  handlePageChange(event) {
    this.props.actions.doclist(this.state.limit, event.target.value * this.state.limit);
    console.log('changing to');
  }
  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
    this.setState({ documents: nextProps.documents });
  }
  inputChange(event) {
    const documents = [...this.props.documents];
    this.setState({ limit: event.target.value, documents: documents.splice(0, event.target.value) });
  }

  render() {
    const { documents, authUser } = this.state;
    console.log('propsppss', this.props);
    return (
      <div>
        {this.props.documents.length > 1 ?
        <div>
          <div className="row">
            <div className="col s6"><SearchBox /></div>
            <div className="right-align">
              <div className="input-field inline">
                <input id="number" type="number" className="validate" onChange={this.inputChange} />
                <label for="number" className="active">Limit</label>
              </div>
              <Paginate
                pageCount={this.props.metadata.pageCount}
                handleChange={this.handlePageChange}
              />
            </div>
          </div>
          <DocList documents={documents} authUser={authUser} onClick={this.handleClick} />
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
  console.log('mapstate', state);
  return {

    documents: state.documents.documents,
    users: state.users,
    authUser: state.authUser,
    metadata: state.documents.metadata
  };
}
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ doclist, activeUser, deleteDoc }, dispatch)
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(ManageDoc);
