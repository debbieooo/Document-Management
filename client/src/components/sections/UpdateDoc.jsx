import React, { PropTypes } from 'react';
import TextEditor from './TextEditor.jsx';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as docActions from '../../actions/docAction';
import { browserHistory } from 'react-router';
class UpdateDoc extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      document: Object.assign({}, props.document)
    };
    this.submit = this.submit.bind(this);
  }
  submit(document) {
    this.props.actions.updateDoc({ ...document, id: this.state.document.id })
    .then(() => {
      browserHistory.goBack();
    });
  }
  componentDidMount() {
    this.props.actions.findDoc(this.props.params.id);
  }
  componentWillReceiveProps(nextProps) {
    this.setState({ document: nextProps.document });
  }
  render() {
    return (
      <div>
        {this.state.document.title ? <TextEditor {...this.state.document} onClick ={this.submit} /> : <img src= "/images/default.gif"/>}
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
