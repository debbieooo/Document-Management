import React from 'react';
import sinon from 'sinon';
import { shallow } from 'enzyme';
// import { browserHistory } from 'react-router';
import Footer from '../../src/components/layout/Footer.jsx';
/* eslint-disable no-unused-expressions*/

describe('Footer component with the elements available', () => {
  const wrapper = shallow(<Footer />);
  it('it should render div elements', () => {
    expect(wrapper.find('div')).to.exist;
  });

  it('it should contain a footer tag', () => {
    expect(wrapper.find('footer')).to.exist;
  });
    it('it should contain a link tag', () => {
    expect(wrapper.find('a')).to.exist;
  });
});
