import React from 'react';
import sinon from 'sinon';
import { shallow } from 'enzyme';
// import { browserHistory } from 'react-router';
import Paginate from '../../src/components/sections/Paginate.jsx';
/* eslint-disable no-unused-expressions*/

describe('Pagination component with the elements available', () => {
  const wrapper = shallow(<Paginate />);
  it('it should render div elements', () => {
    expect(wrapper.find('ul')).to.exist;
  });

  it('it should contain a link tag', () => {
    expect(wrapper.find('li')).to.exist;
  });
  it('it should contain an a tag', () => {
    expect(wrapper.find('a')).to.exist;
  });
});
