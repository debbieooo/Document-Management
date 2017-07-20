import * as userAction from '../../src/actions/userAction';
import * as types from '../../src/actions/actionTypes';
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const state = {
  users: {
    users: [],
    metadata:{}
  }
};
describe('User actions', () => {
  beforeEach(() => {
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
  });
  it('dispatch CREATE_USER_SUCCESS when user has been created',
  (done) => {
    const expectedActions = [
      {
        type: types.CREATE_USER_SUCCESS,
        user: {
          name: 'deborah',
          userName: 'oni'
        }
      }
    ];
    const store = mockStore(state);
    store.dispatch(userAction.signUp({
            name: 'deborah',
            userName: 'oni'
          })).then(() => {
      expect(store.getActions()).to.eql(expectedActions);
      done();
    });
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {
            user: {
              name: 'deborah',
              userName: 'oni'
            },
            token: 'token'
        } });
    });
  });
  it('dispatch ERROR, when error occurs while creating user',
  (done) => {
  const expectedActions = [ { type: 'LOGIN_USER_FAILED', error: { message: 'error' } } ];    // creating a store from your mock store defined above
    const store = mockStore(state);
    store.dispatch(userAction.signUp({})).then(() => {
      expect(store.getActions()).to.eql(expectedActions);
      done();
    });
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 400,
        response: {
            message: 'error'
        } });
    });
  });
    it('dispatch LOGIN_USER_SUCCESS when user has been created',
  (done) => {
    const expectedActions = [ { type: 'LOGIN_USER_SUCCESS',
    user: { name: 'deborah', userName: 'oni' } } ];
    const store = mockStore(state);
    store.dispatch(userAction.login({
            name: 'deborah',
            userName: 'oni'
          })).then(() => {
      expect(store.getActions()).to.eql(expectedActions);
      done();
    });
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {
            userInfo: {
              name: 'deborah',
              userName: 'oni'
            },
            token: 'token'
        } });
    });
  });
  it('dispatch ERROR, when error occurs while creating user',
  (done) => {
  const expectedActions = [ { type: 'SIGNUP_USER_FAILED', error: { message: 'error' } } ];    // creating a store from your mock store defined above
    const store = mockStore(state);
    store.dispatch(userAction.login({})).then(() => {
      expect(store.getActions()).to.eql(expectedActions);
      done();
    });
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 400,
        response: {
            message: 'error'
        } });
    });
  });
});