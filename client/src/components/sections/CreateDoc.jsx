import React, { PropTypes } from 'react';
import TextEditor from './TextEditor.jsx';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createDoc } from '../../actions/docAction';
import { activeUser } from '../../actions/userAction';

class CreateDoc extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      doc: {},
      authUser: Object.assign({}, props.authUser),
    };
    this.submit = this.submit.bind(this);
  }
  submit(doc) {
    console.log('csds', doc);
    this.props.actions.createDoc({ ...doc, userId: this.state.authUser.id })
    .then(() => alert('Document Added'));
  }
  ComponentDidMount() {
    console.log('user', this.props.actions.activeUser());
    // this.props.actions.activeUser();
  }


  render() {
    console.log('props for act', this.props);
    return (
    <div>
         <TextEditor onClick ={this.submit} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  console.log('mapstate', state);
  return {
    docs: state.docs.docs,
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
