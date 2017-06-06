import React from 'react';
import 'babel-polyfill';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import Footer from './components/layouts/Footer.jsx';
// import routes from './routes';
// import './styles/main.scss';


class App extends React.Component {
  render() {
    return <div>
      < Footer />
    </div>
  }
}

render(<App/>, global.document.getElementById('app'));
