import React from 'react';
import swal from 'sweetalert';
import PropTypes from 'prop-types';
import TinyMCE from 'react-tinymce';
import { browserHistory } from 'react-router';
/**
 * 
 * 
 * @class TextEditor
 * @extends {React.Component}
 */
class TextEditor extends React.Component {
  /**
   * Creates an instance of TextEditor.
   * @param {any} props
   * @param {any} context
   *
   * @memberof TextEditor
   */
  constructor(props, context) {
    super(props, context);
    this.state = {
      content: this.props.content ? this.props.content : '',
      access: this.props.access ? this.props.access : '',
      title: this.props.title ? this.props.title : ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleEditorChange = this.handleEditorChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInput = this.handleInput.bind(this);
  }
  /**
   *
   *
   * @param {any} e
   * @returns {null} null
   * @memberof TextEditor
   */
  handleEditorChange(e) {
    this.setState({ content: e.target.getContent() });
  }
  /**
   *
   *
   * @returns {null} null
   * @memberof TextEditor
   */
  handleSubmit() {
    if (this.validate()) {
      this.props.onClick(this.state);
    }
  }
  /**
   * 
   * 
   * @returns {boolean} boolean
   * 
   * @memberof TextEditor
   */
  validate() {
    if (!this.state.title && this.state.title === '') {
      swal('Oops...', 'Something went wrong!, enter a title', 'error');
      return false;
    } else if (!this.state.access && this.state.access === '') {
      swal('Oops...', 'Something went wrong!, enter valid access', 'error');
      return false;
    }
    return true;
  }
  /**
   *
   *
   * @param {any} e
   * @returns {null} null
   * @memberof TextEditor
   */
  handleChange(e) {
    this.setState({ access: e.target.value });
  }
  /**
   *
   *
   * @param {any} e
   * @returns {null} null
   * @memberof TextEditor
   */
  handleInput(e) {
    this.setState({ title: e.target.value });
  }
  /**
   *
   *
   * @returns {object} object
   *
   * @memberof TextEditor
   */
  render() {
    const { access } = this.state;
    return (
      <div>
        <div className="row">
          <form className="col s8">
            <div className="row">
              <div className="input-field col s8">
                <input
                  id="textarea1"
                  className="materialize-textarea"
                  name="title"
                  value={this.state.title}
                  onChange={this.handleInput}
                />
                <label className="active" htmlFor="textarea1">Title</label>
              </div>

              <div>
                <input
                  checked={access === 'Public'}
                  name="access"
                  id="Public"
                  type="radio"
                  onChange={this.handleChange}
                  value="Public"
                />
                <label htmlFor="Public">Public</label>
                <input
                  checked={access === 'Private'}
                  name="access"
                  type="radio"
                  id="Private"
                  onChange={this.handleChange}
                  value="Private"
                />
                <label htmlFor="Private">Private</label>
                <input
                  checked={access === 'Role'}
                  name="access"
                  id="Role"
                  type="radio"
                  onChange={this.handleChange}
                  value="Role"
                />
                <label htmlFor="Role">Role</label>
              </div>

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
        <button
          className="btn"
          type="submit"
          name="action"
          onClick={this.handleSubmit}
        >Submit
        </button>
        <button
          className="btn"
          id="newDocumentBtn"
          type="submit"
          name="action"
          onClick={() => browserHistory.goBack()}
        > Cancel </button>
      </div>
    );
  }
}
TextEditor.propTypes = {
  onClick: PropTypes.func.isRequired,
  content: PropTypes.string,
  access: PropTypes.string,
  title: PropTypes.string,
};
TextEditor.defaultProps = {
  content: '',
  title: '',
  access: ''
};
export default TextEditor;
