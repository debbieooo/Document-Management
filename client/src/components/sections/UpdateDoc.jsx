import React, { PropTypes } from 'react';
import TextEditor from './TextEditor.jsx';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as docActions from '../../actions/docAction';

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
   *
   * @param {any} document
   *
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
   *
   * @memberof UpdateDoc
   */
  componentWillReceiveProps(nextProps) {
    this.setState({ document: nextProps.document });
  }

  componentWillUnmount() {
    this.setState({document: {}});
  }
  /**
   *
   *
   * @returns
   *
   * @memberof UpdateDoc
   */
  render() {
    return (
      <div>
        {this.state.document.title
        ? <TextEditor {...this.state.document} onClick ={this.submit} />
         : <img src= "/images/default.gif"/>}
      </div>
    );
  }
}

UpdateDoc.defaultProps = {
  documents: []
};
/**
 *
 *
 * @param {any} state
 * @returns
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
 * @returns
 */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(docActions, dispatch)
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(UpdateDoc);
