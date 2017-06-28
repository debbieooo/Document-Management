import React from 'react';
import { browserHistory } from 'react-router';
const FroalaEditor = require('react-froala-wysiwyg');

class CreateText extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      content: (this.props.content) ? this.props.content : '<p>This is the initial content of the editor</p>',
      access: this.props.access ? this.props.access : '',
      title: (this.props.title) ? this.props.title : '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleModelChange = this.handleModelChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInput = this.handleInput.bind(this);
  }
  handleModelChange(model) {
    this.setState({ content: model });
  }
  handleSubmit() {
    this.props.onClick(this.state);
  }
  handleChange(e) {
    const val = e.target.value;
    this.setState({ access: e.target.value });
  }
  handleInput(e) {
    this.setState({ title: e.target.value });
  }


  render() {
    const { access } = this.state;
    return (
      <div>
        <div className="row">
          <form className="col s8">
            <div className="row">
              <div className="input-field col s8">
                <input id="textarea1" className="materialize-textarea" value={this.state.title} onChange={this.handleInput} />
                <label className="active" htmlFor="textarea1">Title</label>
              </div>
              {/* <p>
                  {(access === 'Public') ? <div><input name="Public" type="radio" />
                  <label htmlFor="test2">Public</label></div> : <div><input name="Private" type="radio" id="test2" />
                  <label htmlFor="test2">Private</label></div>}
                </p>
                <p>
                  {(access === 'Private') ? <div><input name="Private" type="radio" />
                  <label htmlFor="test2">Public</label></div> : <div><input name="Private" type="radio" id="test2" />
                  <label htmlFor="test2">Private</label></div>}
                </p>*/}
              <p>
                <div>
                  <input
                    checked={access === 'Public'}
                    name="access"
                    id="Public"
                    type="radio"
                    onChange={this.handleChange}
                    value="Public" />
                  <label htmlFor="Public">Public</label>
                  <input
                    checked={access === 'Private'}
                    name="access"
                    type="radio"
                    id="Private"
                    onChange={this.handleChange}
                    value="Private" />
                  <label htmlFor="Private">Private</label>
                </div>
              </p>
            </div>
          </form>
        </div>
        <FroalaEditor
          tag='textarea'
          model={this.state.content}
          onModelChange={this.handleModelChange}
        />
        <button className="btn waves-effect waves-light"
          type="submit"
          name="action"
          onClick={this.handleSubmit}>Submit
        </button>
        <button className="btn waves-effect waves-light"
          type="submit"
          name="action"
          onClick={() => browserHistory.goBack()}> Cancel </button>
      </div>
    );
  }
}

export default CreateText;


