import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import NotAuthorized from './NotAuthorized.jsx';
import * as documentActions from '../../actions/documentAction';
/**
 * 
 * 
 * @class ViewDoc
 * @extends {React.Component}
 */
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
      document: Object.assign({}, props.document),
      error: null
    };
  }
  /**
   * 
   * 
   * @returns {null} null
   * @memberof ViewDoc
   */
  componentDidMount() {
    this.props.actions.findDoc(this.props.params.id);
  }
  /**
   * 
   * 
   * @param {any} nextProps 
   * @returns {null} null
   * @memberof ViewDoc
   */
  componentWillReceiveProps(nextProps) {
    if (nextProps.error === 'Unauthorized') {
      this.setState({ error: 'Unathorized' });
    } else {
      this.setState({ document: nextProps.document });
    }
  }
  /**
   * 
   * 
   * @returns {null} null
   * @memberof ViewDoc
   */
  componentWillUnmount() {
    this.setState({ document: {} });
  }
  /**
   * 
   * 
   * @returns {object} content
   * 
   * @memberof ViewDoc
   */
  createMarkup() {
    return { __html: this.state.document.content };
  }
  /**
   * 
   * 
   * @returns {object} element
   * 
   * @memberof ViewDoc
   */
  render() {
    if (this.state.error === 'Unathorized') {
      return <NotAuthorized />;
    }
    return (
      <div>
        {this.state.document.title
          ? <div className="z-depth-3 document-view">
            <h3>{this.state.document.title}</h3>
            <div>
              <div dangerouslySetInnerHTML={this.createMarkup()} />
            </div>
          </div>
          : ''}
      </div>
    );
  }
}

ViewDoc.propTypes = {
  actions: PropTypes.object.isRequired,
  params: PropTypes.object.isRequired,
  document: PropTypes.object.isRequired,
  error: PropTypes.string,
};
ViewDoc.defaultProps = {
  error: ''
};
/**
 *
 *
 * @param {any} state
 * @returns {object} document
 */
function mapStateToProps(state) {
  return {
    document: state.documents.document,
    error: state.documents.error
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
    actions: bindActionCreators(documentActions, dispatch)
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(ViewDoc);
