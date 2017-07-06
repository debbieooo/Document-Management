import React from 'react';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';
import TextEditor from './TextEditor.jsx';
import { connect } from 'react-redux';
import { createDoc } from '../../actions/docAction';
import { activeUser } from '../../actions/userAction';


class CreateDoc extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      document: {},
      authUser: Object.assign({}, props.authUser)
    };
    this.submit = this.submit.bind(this);
  }
  /**
   * 
   * 
   * 
   * @memberof CreateDoc
   */
  componentWillUnmount() {

  }
/**
 * 
 * 
 * @param {any} document 
 * 
 * @memberof CreateDoc
 */
  submit(document) {
    this.props.actions.createDoc(document)
    .then(() => {
      browserHistory.push('/documents');
    });
  }
/**
 * 
 * 
 * @returns 
 * 
 * @memberof CreateDoc
 */
  render() {
    return (
      <div>
         <TextEditor onClick={this.submit} />
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