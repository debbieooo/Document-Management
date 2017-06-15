import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import DocList from './DocList.jsx';
import * as docActions from '../../actions/docAction';

class ManageDoc extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      doc: Object.assign({}, props.docs),
      error: ''
    };
  }
  componentDidMount() {
    console.log(this.props)
    this.props.actions.doclist();
  }
  render() {
    console.log('docsss', this.props.docs);
    const { docs } = this.props;
    return (
      <div>
        
       <DocList docs = {docs} />
      </div>
    );
  }
}

ManageDoc.propTypes = {
  docs: PropTypes.array.isRequired
};
ManageDoc.defaultProps = {
  docs: []
};

function mapStateToProps(state) {
  console.log('mapstate', state);
  return {

    docs: state.docs
  };
}
function mapDispatchToProps(dispatch) {
  // console.log('userActions', userActions);
  return {
    actions: bindActionCreators(docActions, dispatch)
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(ManageDoc);
