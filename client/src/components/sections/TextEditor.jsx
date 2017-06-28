import React from 'react';//eslint-disable-line
import TinyMCE from 'react-tinymce';//eslint-disable-line
import { browserHistory } from 'react-router';//eslint-disable-line

class TextEditor extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      content: (this.props.content) ? this.props.content : '',
      access: this.props.access ? this.props.access : '',
      title: (this.props.title) ? this.props.title : '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleEditorChange = this.handleEditorChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInput = this.handleInput.bind(this);
  }
  handleEditorChange(e) {
    this.setState({ content: e.target.getContent() });
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
                <input id="textarea1"
                className="materialize-textarea"
                value= {this.state.title}
                onChange = {this.handleInput} />
                <label className="active" htmlFor="textarea1">Title</label>
              </div>
                <p>
                  <div>
                    <input
                      checked={access === 'Public'}
                      name="access"
                      id="Public"
                      type="radio"
                      onChange={this.handleChange}
                      value="Public"/>
                    <label htmlFor="Public">Public</label>
                    <input
                      checked={access === 'Private'}
                      name="access"
                      type="radio"
                      id="Private"
                      onChange={this.handleChange}
                      value="Private"/>
                    <label htmlFor="Private">Private</label>
                  </div>
                </p>
            </div>
          </form>
        </div>
        <TinyMCE
          content={this.state.content}
          config={{
            plugins: 'link image code',
            toolbar:
            'undo redo | bold italic | alignleft aligncenter alignright | code'
          }}
          onChange={this.handleEditorChange}
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

export default TextEditor;
