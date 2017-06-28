import React from 'react';//eslint-disable-line
import { bindActionCreators } from 'redux';//eslint-disable-line
import { browserHistory } from 'react-router';//eslint-disable-line
import TextEditor from './TextEditor.jsx';//eslint-disable-line
import { connect } from 'react-redux';//eslint-disable-line
import { createDoc } from '../../actions/docAction';//eslint-disable-line
import { activeUser } from '../../actions/userAction';//eslint-disable-line


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
    .then(() => {
      browserHistory.goBack();
    });
  }

  render() {
    return (
    <div>
         <TextEditor onClick ={this.submit} />
      </div>
    );
  }
}

CreateDoc.propTypes = {
  actions: React.PropTypes.object,
  authUser: React.PropTypes.object,
  submit: React.PropTypes.func
};

function mapStateToProps(state) {
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
