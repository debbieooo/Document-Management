 import React from 'react';
import sinon from 'sinon';
import { shallow } from 'enzyme';
import { browserHistory } from 'react-router';

// import { browserHistory } from 'react-router';
import documentListTable from '../../src/components/sections/DocumentListTable';
/* eslint-disable no-unused-expressions*/
const props = {
  document: 
       {
        id: 5,
        title: 'hello',
        content: 'hello hello',
        access: 'brooklyn 99',
        User: {
          name: 'mary'
        }
      },

    handleClick: sinon.spy(),
    authUser: {
      userName: 'hello', 
      name:'mary'
    }
}

const history = sinon.stub(browserHistory, 'push');
describe('documentListTable component', () => {
  const wrapper = shallow(<documentListTable {...props} />);
  it('should render td element', () => {
    expect(wrapper.find('td')).to.exist;
  });
  it('should contain a tr', () => {
    expect(wrapper.find('tr')).to.exist;
  });
  it('should contain an "a" tag', () => {
    expect(wrapper.find('a')).to.exist;
  });
  it('contains browserhistory function', () => {
    expect(history.calledOnce).to.exist;
  });
   it('contains handleClick function', () => {
    expect(props.handleClick.calledOnce).to.exist;
  });
});