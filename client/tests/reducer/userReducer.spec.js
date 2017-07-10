import userReducer from '../../src/reducers/userReducer';
import * as types from '../../src/actions/actionTypes';

describe('userReducer', () => {
        const  initialState= { users: [], metadata: {} }

  describe('LOAD_USERS_SUCCESS', () => {
    it('should load users', (done) => {
      const  initialState= { users: [], metadata: {} }
      const users = {
    "users": {
        "count": 41,
        "rows": [
            {
                "id": 202,
                "userName": "Mays",
                "email": "mays22@mail.com",
                "name": "Mays",
                "roleId": 2,
                "createdAt": "2017-07-02T17:04:53.707Z",
                "updatedAt": "2017-07-02T17:04:53.707Z"
            },
           
        ]
    },
    "metadata": {
        "pageCount": 5,
        "page": 1,
        "pageSize": 10,
        "count": 41
    }
}
      expect(initialState).to.eql(userReducer(initialState, ''));
      const action = { type: types.LOAD_USERS_SUCCESS, users };
      const newState = userReducer(initialState, action);
      expect(newState).to.not.eql(initialState);
      expect(newState).to.have.property('metadata');
      done();
    });
  });
    describe('DELETE_USER_SUCCESS', () => {
     const cloneInitialState = Object.assign({}, initialState, {
         users: [
           { id: 1, 'userName': 'debs', name: 'Deborah' },
           { id: 3, 'userName': 'doni', name: 'Debbie' }
         ]
       });
     const users= [
           { id: 1, 'userName': 'debs', name: 'Deborah' },
           { id: 3, 'userName': 'doni', name: 'Debbie' }
         ]
      const id = 3
         expect(cloneInitialState).to.eql(userReducer(cloneInitialState, ''));
       const action = { type: types.DELETE_USER_SUCCESS, id };
       const newState = userReducer(cloneInitialState, action);
       expect(newState).to.not.eql(cloneInitialState)
       expect(newState.users.length).to.eql(1);
       });     
  });
