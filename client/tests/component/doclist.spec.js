 import React from 'react';
import sinon from 'sinon';
import { shallow } from 'enzyme';
// import { browserHistory } from 'react-router';
import documentList from '../../src/components/sections/DocumentList';
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
describe('documentList component', () => {
  const wrapper = shallow(<documentList {...props} />);
  it('should render div elements', () => {
    expect(wrapper.find('div')).to.exist;
  });
  it('should contain a thead', () => {
    expect(wrapper.find('thead')).to.exist;
  });
  it('should contain a table', () => {
    expect(wrapper.find('table')).to.exist;
  });
});