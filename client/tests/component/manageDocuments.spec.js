import React from 'react';
import { Provider } from 'react-redux';
import sinon from 'sinon'; 
import ManageDoc from '../../src/components/sections/ManageDoc.jsx';
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
describe('<ManageDoc />', () => {
  let props;
  let store;
  let copyStore;
  let wrapper;
  beforeEach(() => {
    require('fbjs/lib/ExecutionEnvironment').canUseDOM = true;
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
        <ManageDoc {...props} />
      </Provider>
    );
  });
  it('should connect to the redux store', () => {
    expect(wrapper.props().store.getState()).to.eql(copyStore);
  });
  it('it should render div elements', () => {
     expect(wrapper.find('div')).to.exist;
    });
  it('it should render img element', () => {
     expect(wrapper.find('img')).to.exist;
    });
  it('it should render Paginate element', () => {
     expect(wrapper.find('Paginate')).to.exist;
    });

  sinon.spy(ManageDoc.prototype, 'componentWillReceiveProps');
  sinon.spy(ManageDoc.prototype, 'render');

  it(' componentWillReceiveProps exists', () => {
    expect(ManageDoc.prototype.componentWillReceiveProps.calledOnce).to.exist;
  });
   it(' Render exists', () => {
    expect(ManageDoc.prototype.render.calledOnce).to.exist;
  });
  it('componentWillUnmount exists', () => {
    wrapper.unmount();
    sinon.spy(ManageDoc.prototype, 'componentWillUnmount');
    expect(ManageDoc.prototype.componentWillUnmount.calledOnce);
  });
});