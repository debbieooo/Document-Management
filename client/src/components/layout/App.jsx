import React from 'react';
import PropTypes from 'prop-types';
import Nav from './Nav.jsx';


export default class App extends React.Component {
  render() {
    return (
      <div>
       <Nav/>
        <div>
          <div className="container" id="container">
          {this.props.children}
          </div>
        </div>
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.element.isRequired
};
