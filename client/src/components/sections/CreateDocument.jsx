import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';
import TextEditor from './TextEditor.jsx';
import { createDocument } from '../../actions/documentAction';
import { activeUser } from '../../actions/userAction';

/**
 * 
 * 
 * @class CreateDoc
 * @extends {React.Component}
 */
class CreateDocument extends React.Component {
  /**
   * Creates an instance of CreateDoc.
   * @param {any} props 
   * @param {any} context 
   * 
   * @memberof CreateDoc
   */
  constructor(props, context) {
    super(props, context);
    this.state = {
      document: {},
      authUser: Object.assign({}, props.authUser),
      error: ''
    };
    this.submit = this.submit.bind(this);
  }
  /**
   *
   *
   * @returns {null} null
   * @memberof CreateDoc
   */
  componentWillUnmount() {
  }
  /**
   *
   *
   * @param {any} document
   * @returns {null} null
   * @memberof CreateDoc
   */
  submit(document) {
    this.props.actions.createDocument(document)
      .then(() => {
        browserHistory.push('/documents');
      });
  }
  /**
   *
   *
   * @returns {div} null
   *
   * @memberof CreateDoc
   */
  render() {
    return (
      <div>
        <h5>New Document</h5>
        <TextEditor onClick={this.submit} />
      </div>
    );
  }
}

CreateDocument.propTypes = {
  actions: PropTypes.object.isRequired,
  authUser: PropTypes.object.isRequired,
};
/**
 * 
 * 
 * @param {any} state 
 * @returns {object} object
 */
function mapStateToProps(state) {
  return {
    documents: state.documents.documents,
    users: state.users,
    authUser: state.authUser
  };
}
/**
 * 
 * 
 * @param {any} dispatch 
 * @returns  {object} object
 */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ createDocument, activeUser }, dispatch)
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(CreateDocument);
