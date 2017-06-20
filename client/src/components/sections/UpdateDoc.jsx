import React, { PropTypes } from 'react';
import TextEditor from './TextEditor.jsx';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as docActions from '../../actions/docAction';

class UpdateDoc extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      doc: Object.assign({}, props.doc)
    };
    this.submit = this.submit.bind(this);
  }
  submit(doc) {
    this.props.actions.updateDoc({ ...doc, id: this.state.doc.id });
  }
  componentDidMount() {
    this.props.actions.findDoc(this.props.params.id);
  }
  componentWillReceiveProps(nextProps) {
    this.setState({ doc: nextProps.doc });
  }
  render() {
    return (
      <div>
        {(this.state.doc.title) ? <TextEditor {...this.state.doc} onClick ={this.submit} /> : <img src= "/images/default.gif"/>}
      </div>
    );
  }
}

UpdateDoc.defaultProps = {
  docs: [],
};

function mapStateToProps(state) {
  return {
    doc: state.docs.doc
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(docActions, dispatch)
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(UpdateDoc);
