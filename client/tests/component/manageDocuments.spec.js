import React from 'react';
import { Provider } from 'react-redux';
import sinon from 'sinon'; 
import ManageDocuments from '../../src/components/sections/ManageDocuments.jsx';
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
describe('<ManageDocuments />', () => {
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
        <ManageDocuments {...props} />
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

  sinon.spy(ManageDocuments.prototype, 'componentWillReceiveProps');
  sinon.spy(ManageDocuments.prototype, 'render');

  it(' componentWillReceiveProps function exists', () => {
    expect(ManageDocuments.prototype.componentWillReceiveProps.calledOnce).to.exist;
  });
   it(' Render exists', () => {
    expect(ManageDocuments.prototype.render.calledOnce).to.exist;
  });
  it('ComponentWillUnmount function exists', () => {
    wrapper.unmount();
    sinon.spy(ManageDocuments.prototype, 'componentWillUnmount');
    expect(ManageDocuments.prototype.componentWillUnmount.calledOnce);
  });
});