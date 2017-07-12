 import React from 'react';
import sinon from 'sinon';
import { shallow } from 'enzyme';
// import { browserHistory } from 'react-router';
import DocList from '../../src/components/sections/DocList';
/* eslint-disable no-unused-expressions*/
const props = {
  documents: [
       {
        id: 5,
        title: 'hello',
        content: 'hello hello',
        access: 'brooklyn 99'
      },
    ],
    onClick: sinon.spy(),
    authUser: {
      userName: 'hello', 
    }
}
describe('DocList component with the elements available', () => {
  const wrapper = shallow(<DocList {...props} />);
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