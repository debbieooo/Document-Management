// This component handles the App template used on every page.
import React, {PropTypes} from 'react';
import Nav from './Nav.jsx';
import Footer from './Footer.jsx';

export default class App extends React.Component {
  render() {
    return (
      <div>
       <Nav />
        {this.props.children}
        <Footer />
      </div>
    );
  }
}

