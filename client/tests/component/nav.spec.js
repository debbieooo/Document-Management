import React from 'react';
import { Provider } from 'react-redux';
import Nav from '../../src/components/layout/Nav'
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('<Nav />', () => {
  let props;
  let store;
  let wrapper;
  let copyStore;
  beforeEach(() => {
    require('fbjs/lib/ExecutionEnvironment').canUseDOM = true; //eslint-disable-line
    copyStore = {
      authUser: {
        isAuthenticated: false
      },
      users: { users: [], metadata:{} },
      documents: { documents: [], metadata:{}, document:{} },
      search: { search: [], metadata:{} }
    };
    store = mockStore(copyStore);
    props = {
      params: { id: 2 },
      actions: {
        deleteAcc: sinon.spy()
      },
      dispatch: sinon.spy()
    };
    wrapper = mount(
      <Provider store={store} >
          <Nav {...props} />
      </Provider>
    );
  });
  it('should connect to the redux store', () => {
    expect(wrapper.props().store.getState()).to.eql(copyStore);
  });
    it('should render nav class', () => {
     expect(wrapper.find('.nav-wrapper')).to.exist;
    });
  it('should render div elements', () => {
     expect(wrapper.find('div')).to.exist;
    });
  it('should render nav elements', () => { 
     expect(wrapper.find('nav')).to.exist;
    });
   it('should render li elements', () => { 
     expect(wrapper.find('li')).to.exist;
    });
    it('should render ul elements', () => { 
     expect(wrapper.find('ul')).to.exist;
    });
});

