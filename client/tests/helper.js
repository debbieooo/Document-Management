import sinon from 'sinon';
import {jsdom} from 'jsdom';
import {mount, render} from 'enzyme';
import chai from 'chai';
import moment from 'moment';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import configureMockStore from 'redux-mock-store';
const ReactShallowRenderer = require('react-test-renderer/shallow');

const exposedProperties = ['window', 'navigator', 'document'];

global.document = jsdom('');
global.window = document.defaultView;
Object.keys(document.defaultView).forEach((property) => {
  if (typeof global[property] === 'undefined') {
    exposedProperties.push(property);
    global[property] = document.defaultView[property];
  }
});

global.window.localStorage = {
  getItem: () => {
    return 'token';
  },
    setItem: () => {
    return 'token';
  }
}

global.sinon = sinon
global.moxios = moxios
global.expect = chai.expect
global.moment = moment
global.thunk = thunk
global.mount = mount
global.render = render
global.configureMockStore = configureMockStore
global.shallow = new ReactShallowRenderer()
global.navigator = {
  userAgent : 'node.js'
}




