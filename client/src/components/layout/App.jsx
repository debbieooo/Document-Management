import React from 'react';//eslint-disable-line
import PropTypes from 'prop-types';//eslint-disable-line
import Nav from './Nav.jsx';//eslint-disable-line


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
