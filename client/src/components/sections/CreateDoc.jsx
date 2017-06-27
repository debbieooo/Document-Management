import React, { PropTypes } from 'react';
import TextEditor from './TextEditor.jsx';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createDoc } from '../../actions/docAction';
import { activeUser } from '../../actions/userAction';
import { browserHistory } from 'react-router';


class CreateDoc extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      document: {},
      authUser: Object.assign({}, props.authUser)
    };
    this.submit = this.submit.bind(this);
  }
  submit(document) {
    this.props.actions.createDoc(document)
    .then(() => alert('Document Added'))
    .then(() => {
      browserHistory.goBack();
    });
  }
  ComponentDidMount() {
    console.log('user', this.props.actions.activeUser());
  }


  render() {
    console.log('props for act', this.props);
    return (
    <div>
         <TextEditor onClick ={this.submit} />
      </div>
    );
  }
}

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
    actions: bindActionCreators({ createDoc, activeUser }, dispatch)
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(CreateDoc);
