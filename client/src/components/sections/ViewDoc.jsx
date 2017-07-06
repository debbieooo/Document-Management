import React, { PropTypes } from 'react';
import TextEditor from './TextEditor.jsx';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as docActions from '../../actions/docAction';
class ViewDoc extends React.Component {
/**
 * Creates an instance of ViewDoc.
 * @param {any} props 
 * @param {any} context 
 * 
 * @memberof ViewDoc
 */
  constructor(props, context) {
    super(props, context);
    this.state = {
      document: Object.assign({}, props.document)
    };
  }
 /**
  * 
  * 
  * 
  * @memberof ViewDoc
  */
  componentDidMount() {
    this.props.actions.findDoc(this.props.params.id);
  }
/**
 * 
 * 
 * @param {any} nextProps 
 * 
 * @memberof ViewDoc
 */
  componentWillReceiveProps(nextProps) {
    this.setState({ document: nextProps.document });
  }
/**
 * 
 * 
 * 
 * @memberof ViewDoc
 */
  componentWillUnmount() {
    this.setState({document: {}});
  }
  /**
   * 
   * 
   * @returns 
   * 
   * @memberof ViewDoc
   */
createMarkup() {
  return {__html: this.state.document.content};
}
/**
 * 
 * 
 * @returns 
 * 
 * @memberof ViewDoc
 */
  render() {
    return (
      <div>
        {this.state.document.title
        ?
        <div className="z-depth-3 document-view">
          <h3>{this.state.document.title}</h3>
          <div>
            <div dangerouslySetInnerHTML= {this.createMarkup()} />
          </div>
        </div>
        :'' }
      </div>
    );
  }
}

ViewDoc.defaultProps = {
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
export default connect(mapStateToProps, mapDispatchToProps)(ViewDoc);
