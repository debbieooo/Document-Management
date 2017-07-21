import documentReducer from '../../src/reducers/documentReducer';
import * as types from '../../src/actions/actionTypes';
describe('documentReducer', () => {
const initialState = {
    documents: { documents: [], metadata: {}, document: {}, error: null },
}

describe('CREATE_DOCUMENTS_SUCCESS', () => {
    it('should create a new document', (done) => {
      const document = {
        id: 32,
        title: 'deborah',
        content: 'oni'
      };
      expect(initialState).to.eql(documentReducer(initialState, ''));
      const action = { type: types.CREATE_DOCUMENTS_SUCCESS, document };
      const newState = documentReducer(initialState, action);
      expect(newState).to.not.eql(initialState);
      expect(newState).to.have.property('title');
      done();
    });
  });
  describe('DELETE_DOCUMENTS_SUCCESS', () => {
    it('should delete a document', (done) => {
      const document = {
        id: 32,
        title: 'deborah',
        content: 'oni'
      };
      const id = 32;
      expect(initialState).to.eql(documentReducer(initialState, ''));
      const action = { type: types.DELETE_DOCUMENTS_SUCCESS, id };
      const newState = documentReducer(initialState, action);
      expect(newState).to.not.eql(initialState);
      done();
    });
  });
 describe('UPDATE_DOCUMENTS_SUCCESS', () => {
    it('should delete a document', (done) => {
      const oldDocument = {
        id: 32,
        title: 'deborah',
        content: 'oni'
      };
      const cloneInitialState = Object.assign({}, initialState,{ ...oldDocument});
      const document = {
        id: 32,
        name: 'deborah Oni',
        userName: 'debbie'
      };
      expect(cloneInitialState).to.eql(documentReducer(cloneInitialState, ''));
      const action = { type: types.UPDATE_DOCUMENTS_SUCCESS, document };
      const newState = documentReducer(initialState, action);
      expect(newState).to.not.eql(initialState);
      done();
    });
  });
  describe('LOAD_DOCUMENTS_SUCCESS', () => {
    it('should load documents', (done) => {
      const  initialState= { documents: [], metadata: {} }
      const documents = {
    "documents": {
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
      expect(initialState).to.eql(documentReducer(initialState, ''));
      const action = { type: types.LOAD_DOCUMENTS_SUCCESS, documents };
      const newState = documentReducer(initialState, action);
      expect(newState).to.not.eql(initialState);
      expect(newState).to.have.property('metadata');
      done();
    });
  });
  describe('FETCH_DOCUMENT_SUCCESS', () => {
    it('should fetch a particular document', (done) => {
      const  initialState= { documents: [], metadata: {} }
      const document = {
        id: 32,
        title: 'deborah',
        content: 'oni'
      };
      expect(initialState).to.eql(documentReducer(initialState, ''));
      const action = { type: types.FETCH_DOCUMENT_SUCCESS, document };
      const newState = documentReducer(initialState, action);
      expect(newState).to.not.eql(initialState);
      expect(newState).to.have.property('metadata');
      done();
    });
  });

  
});