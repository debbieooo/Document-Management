import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import DocList from './DocList.jsx';
import { doclist, deleteDoc } from '../../actions/docAction';
import { activeUser } from '../../actions/userAction';
import SearchBox from './SearchBox.jsx';

class ManageDoc extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      documents: Object.assign({}, props.documents),
      error: '',
      authUser: Object.assign({}, props.authUser)

    };
    this.handleClick = this.handleClick.bind(this);
  }
  componentDidMount() {
    this.props.actions.doclist();
    this.props.actions.activeUser();
  }
  handleClick(docId) {
    console.log(docId);
    this.props.actions.deleteDoc(docId);
  }
  render() {
    console.log('docsss', this.props.documents);
    console.log(this.props, 'This is my props');
    const { documents, authUser } = this.props;
    return (
      <div>
        <div className="row">
        <div className= "col s6"><SearchBox /></div>
        </div>
       <DocList documents = {documents} authUser ={authUser} onClick={this.handleClick}/>
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
    authUser: state.authUser
  };
}
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ doclist, activeUser, deleteDoc }, dispatch)
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(ManageDoc);
