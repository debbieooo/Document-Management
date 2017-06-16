import React from 'react';
import TinyMCE from 'react-tinymce';

class TextEditor extends React.Component {
  handleEditorChange = (e) => {
    console.log('Content was updated:', e.target.getContent());
  }

  render() {
    return (
    <div>
      <TinyMCE
        content="<p>This is the initial content of the editor</p>"
        config={{
          plugins: 'link image code',
          toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | code'
        }}
        onChange={this.handleEditorChange}
      />
    <button className="btn waves-effect waves-light" type="submit" name="action">Submit
    <i className="material-icons right">send</i>
  </button>
    </div>
    );
  }
}

export default TextEditor;