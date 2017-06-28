import React, { PropTypes } from 'react';//eslint-disable-line
import TextEditor from './TextEditor.jsx';//eslint-disable-line
import { browserHistory } from 'react-router';//eslint-disable-line
import { connect } from 'react-redux';//eslint-disable-line
import { bindActionCreators } from 'redux';//eslint-disable-line
import * as docActions from '../../actions/docAction';//eslint-disable-line
class UpdateDoc extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      document: Object.assign({}, props.document)
    };
    this.submit = this.submit.bind(this);
  }
  submit(document) {//eslint-disable-line
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
        {this.state.document.title ?
        <TextEditor {...this.state.document} onClick ={this.submit} />
         : <img src= "/images/default.gif"/>}
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
