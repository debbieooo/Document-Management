import React, { PropTypes } from 'react';
import TextEditor from './TextEditor.jsx';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as docActions from '../../actions/docAction';
import { browserHistory } from 'react-router';
import NotAuthorized from './NotAuthorized.jsx';
class UpdateDoc extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      document: Object.assign({}, props.document)
    };
  }
  componentDidMount() {
    this.props.actions.findDoc(this.props.params.id);
  }
  componentWillReceiveProps(nextProps) {
    this.setState({ document: nextProps.document });
  }
  createMarkup() {
    return { __html: this.state.document.content };
  }
  render() {
    return (
      <div>
        <h5>{this.state.document.title}</h5>
        {this.state.document.title ? <div dangerouslySetInnerHTML={this.createMarkup()}/> : <NotAuthorized/>}
      </div>
    );
  }
}

UpdateDoc.defaultProps = {
  documents: []
};

function mapStateToProps(state) {
  return {
    document: state.documents.document
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(docActions, dispatch)
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(UpdateDoc);
