import React from 'react';
import PropTypes from 'prop-types';
import TextEditor from './TextEditor.jsx';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as docActions from '../../actions/docAction';
/**
 * 
 * 
 * @export
 * @class UpdateDoc
 * @extends {React.Component}
 */
export class UpdateDoc extends React.Component {
  /**
   * Creates an instance of UpdateDoc.
   * @param {any} props
   * @param {any} context
   *
   * @memberof UpdateDoc
   */
  constructor(props, context) {
    super(props, context);
    this.state = {
      document: Object.assign({}, props.document)
    };
    this.submit = this.submit.bind(this);
  }
  /**
   *
   * @returns {null} null
   *
   * @memberof UpdateDoc
   */
  componentDidMount() {
    this.props.actions.findDoc(this.props.params.id);
  }
  /**
   *
   *
   * @param {any} nextProps
   * @returns {null} null
   * @memberof UpdateDoc
   */
  componentWillReceiveProps(nextProps) {
    this.setState({ document: nextProps.document });
  }
  /**
   * 
   * 
   * @returns {null} null
   * @memberof UpdateDoc
   */
  componentWillUnmount() {
    this.setState({ document: {} });
  }
  /**
   *
   *
   * @param {any} document
   * @returns {null} null
   * @memberof UpdateDoc
   */
  submit(document) {
    this.props.actions.updateDoc({ ...document, id: this.state.document.id })
      .then(() => {
        browserHistory.goBack();
      });
  }
  /**
   *
   *
   * @returns {object} element
   *
   * @memberof UpdateDoc
   */
  render() {
    return (
      <div>
        {this.state.document.title
          ? <TextEditor {...this.state.document} onClick={this.submit} />
          : <img src="/images/default.gif" alt="" />}
      </div>
    );
  }
}

UpdateDoc.propTypes = {
  actions: PropTypes.object.isRequired,
  document: PropTypes.object.isRequired,
  params: PropTypes.object.isRequired,
};
UpdateDoc.defaultProps = {
  documents: []
};
/**
 *
 *
 * @param {any} state
 * @returns {object} document
 */
function mapStateToProps(state) {
  return {
    document: state.documents.document
  };
}
/**
 *
 *
 * @param {any} dispatch
 * @returns {object} actions
 */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(docActions, dispatch)
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(UpdateDoc);
