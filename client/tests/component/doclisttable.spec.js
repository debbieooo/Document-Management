 import React from 'react';
import sinon from 'sinon';
import { shallow } from 'enzyme';
import { browserHistory } from 'react-router';

// import { browserHistory } from 'react-router';
import DocListTable from '../../src/components/sections/DocListTable';
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
describe('DocListTable component with the elements available', () => {
  const wrapper = shallow(<DocListTable {...props} />);
  it('it should render td element', () => {
    expect(wrapper.find('td')).to.exist;
  });
  it('it should contain a tr', () => {
    expect(wrapper.find('tr')).to.exist;
  });
  it('it should contain a a', () => {
    expect(wrapper.find('a')).to.exist;
  });
  it('contains browserhistory', () => {
    expect(history.calledOnce).to.exist;
  });
   it('contains handleClick', () => {
    expect(props.handleClick.calledOnce).to.exist;
  });
});