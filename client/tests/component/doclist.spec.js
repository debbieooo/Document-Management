import React from 'react';
import sinon from 'sinon';
import { shallow } from 'enzyme';
// import { browserHistory } from 'react-router';
import DocList from '../../src/components/sections/DocList.jsx';
/* eslint-disable no-unused-expressions*/

describe('Pagination component with the elements available', () => {
  const wrapper = shallow(<DocList />);
  it('it should render div elements', () => {
    expect(wrapper.find('div')).to.exist;
  });

  xit('it should contain a tbody', () => {
    expect(wrapper.find('tbody')).to.exist;
  });
  it('it should contain a thead', () => {
    expect(wrapper.find('thead')).to.exist;
  });
  it('it should contain a table', () => {
    expect(wrapper.find('table')).to.exist;
  });
});

