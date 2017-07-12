import React from 'react';
import sinon from 'sinon';
import { shallow } from 'enzyme';
// import { browserHistory } from 'react-router';
import App from '../../src/components/layout/App.jsx';
/* eslint-disable no-unused-expressions*/

describe('App component with the elements available', () => {
  const wrapper = shallow(<App />);
  it('it should render div elements', () => {
    expect(wrapper.find('div')).to.exist;
  });

  it('it should contain a link tag', () => {
    expect(wrapper.find('Nav')).to.exist;
  });
});
