// This component handles the App template used on every page.
import { browserHistory } from 'react-router';
import React, { PropTypes } from 'react';
import Nav from './Nav.jsx';
import Footer from './Footer.jsx';

export default class App extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    return (
      <div>
       <Nav/>
        <div>
          <div className="container" id="container">
          {this.props.children}
          </div>
        {/*<Footer />*/}
          
        </div>
      </div>
    );
  }
}

