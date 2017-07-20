import React from 'react';
import { Provider } from 'react-redux';
import sinon from 'sinon'; 
import ManageUser from '../../src/components/sections/ManageUser.jsx';
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
describe('<ManageUser />', () => {
  let props;
  let store;
  let copyStore;
  let wrapper;
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
      dispatch: sinon.spy(),
      action: {
        deleteAcc: sinon.spy
      }
    };
     wrapper = mount(
      <Provider store={store} >
        <ManageUser {...props} />
      </Provider>
    );
  });
  it('should connect to the redux store', () => {
    expect(wrapper.props().store.getState()).to.eql(copyStore);
  });
  it('should render div elements', () => {
     expect(wrapper.find('div')).to.exist;
    });
  it('should render img element', () => {
     expect(wrapper.find('img')).to.exist;
    });
  it('should render Paginate element', () => {
     expect(wrapper.find('Paginate')).to.exist;
    });

  sinon.spy(ManageUser.prototype, 'componentWillReceiveProps');
  sinon.spy(ManageUser.prototype, 'render');

  it(' componentWillReceiveProps function exists', () => {
    expect(ManageUser.prototype.componentWillReceiveProps.calledOnce).to.exist;
  });
   it(' Render exists', () => {
    expect(ManageUser.prototype.render.calledOnce).to.exist;
  });
  it('ComponentWillUnmount function exists', () => {
    wrapper.unmount();
    sinon.spy(ManageUser.prototype, 'componentWillUnmount');
    expect(ManageUser.prototype.componentWillUnmount.calledOnce);
  });
});