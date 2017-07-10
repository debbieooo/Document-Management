import authReducer from '../../src/reducers/authReducer';
import * as types from '../../src/actions/actionTypes';
describe('authReducer', () => {
  const initialState = {
    isAuthenticated: false
  };
  describe('CREATE_USER_SUCCESS', () => {
    it('should create a new user', (done) => {
      const user = {
        id: 32,
        name: 'deborah',
        userName: 'oni'
      };
      expect(initialState).to.eql(authReducer(initialState, ''));
      const action = { type: types.CREATE_USER_SUCCESS, user };
      const newState = authReducer(initialState, action);
      expect(newState).to.not.eql(initialState);
      expect(newState.isAuthenticated).to.eql(true);
      expect(newState).to.have.property('userName');
      done();
    });
  });
    describe('SIGNUP_USER_FAILED', () => {
    it('should fail to create a new user', (done) => {
      const user =  { isAuthenticated: false, error: 'OOPS!, AN ERROR OCCURED :P' }
      expect(initialState).to.eql(authReducer(initialState, ''));
      const action = { type: types.SIGNUP_USER_FAILED, user };
      const newState = authReducer(initialState, action);
      expect(newState).to.not.eql(initialState);
      expect(newState.isAuthenticated).to.eql(false);
      expect(newState).to.have.property('error');
      done();
    });
  });
  describe('LOGIN_USER_FAILED', () => {
    it('should fail to login a new user', (done) => {
      const user =  { isAuthenticated: false, error: 'OOPS!, AN ERROR OCCURED :P' }
      expect(initialState).to.eql(authReducer(initialState, ''));
      const action = { type: types.LOGIN_USER_FAILED, user };
      const newState = authReducer(initialState, action);
      expect(newState).to.not.eql(initialState);
      expect(newState.isAuthenticated).to.eql(false);
      expect(newState).to.have.property('error');
      done();
    });
  });
    describe('CLEAR_ERROR', () => {
    it('should clear error', (done) => {
      const user =  { isAuthenticated: false, error: 'OOPS!, AN ERROR OCCURED :P' }
      expect(initialState).to.eql(authReducer(initialState, ''));
      const action = { type: types.CLEAR_ERROR, user };
      const newState = authReducer(initialState, action);
      expect(newState).to.not.eql(initialState);
      expect(newState.isAuthenticated).to.eql(false);
      expect(newState).to.have.property('error');
      done();
    });
  });
    describe('LOGOUT_SUCCESSFUL', () => {
    it('should log user out', (done) => {
      const user =  { isAuthenticated: false, error: null }
      expect(initialState).to.eql(authReducer(initialState, ''));
      const action = { type: types.LOGOUT_SUCCESSFUL, user };
      const newState = authReducer(initialState, action);
      expect(newState).to.not.eql(initialState);
      expect(newState.isAuthenticated).to.eql(false);
      expect(newState).to.have.property('isAuthenticated');
      done();
    });
  });
  describe('CURRENT_USER_INFO', () => {
    it('should get information of logged in user', (done) => {
      const user = {
        id: 32,
        name: 'deborah',
        userName: 'oni'
      };
      expect(initialState).to.eql(authReducer(initialState, ''));
      const action = { type: types.CURRENT_USER_INFO, user };
      const newState = authReducer(initialState, action);
      expect(newState).to.not.eql(initialState);
      expect(newState.isAuthenticated).to.eql(true);
      expect(newState).to.have.property('userName');
      done();
    });
  });
  describe('LOGIN_USER_SUCCESS', () => {
    it('should log in a user', (done) => {
      const user = {
        id: 32,
        name: 'deborah',
        userName: 'oni'
      };
      expect(initialState).to.eql(authReducer(initialState, ''));
      const action = { type: types.LOGIN_USER_SUCCESS, user };
      const newState = authReducer(initialState, action);
      expect(newState).to.not.eql(initialState);
      expect(newState.isAuthenticated).to.eql(true);
      expect(newState).to.have.property('userName');
      done();
    });
  });
  describe('UPDATE_USER_SUCCESS', () => {
    it('should update a logged in user', (done) => {
      const oldUser = {
        id: 32,
        name: 'deborah',
        userName: 'oni'
      };
      const cloneInitialState = Object.assign({}, initialState, { ...oldUser, isAuthenticated: true });
      const user = {
        id: 32,
        name: 'deborah Oni',
        userName: 'debbie'
      };
      expect(cloneInitialState).to.eql(authReducer(cloneInitialState, ''));
      const action = { type: types.UPDATE_USER_SUCCESS, user };
      const newState = authReducer(initialState, action);
      expect(newState).to.not.eql(initialState);
      expect(newState.isAuthenticated).to.eql(true);
      expect(newState).to.have.property('userName');
      done();
    });
  });
});