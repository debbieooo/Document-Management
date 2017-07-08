// import * as docAction from '../../src/actions/docAction';
// import * as types from '../../src/actions/actionTypes';

// const middlewares = [thunk];
// const mockStore = configureMockStore(middlewares);
// const state = {
//   documents: {
//     documents: [],
//     metadata: {},
//     document: {}
//   }
// };
// describe('Documents actions', () => {
//   beforeEach(() => {
//     moxios.install();
//   });
//   afterEach(() => {
//     moxios.uninstall();
//   });
//   it('dispatch LOAD_DOCUMENTS_SUCCESS when documents has been fetched',
//   (done) => {
//     const expectedActions = [
//       {
//           type: types.LOAD_DOCUMENTS_SUCCESS,
//           documents: {
//             documents: {
//                 count: 0,
//                 rows: []
//             },
//             metadata: {
//                 count: 0,
//                 pageCount: 0,
//                 page: 1,
//                 pageSize: 10
//             }
//           }
//       }
//     ];
//     const store = mockStore(state);
//     store.dispatch(docAction.doclist()).then(() => {
//       expect(store.getActions()).to.eql(expectedActions);
//       done();
//     });
//     moxios.wait(() => {
//       const request = moxios.requests.mostRecent();
//       request.respondWith({
//         status: 200,
//         response: {
//             documents: {
//                 count: 0,
//                 rows: []
//             },
//             metadata: {
//                 count: 0,
//                 pageCount: 0,
//                 page: 1,
//                 pageSize: 10
//             }
//         } });
//     });
//   });
//   it('dispatch ERROR when error occurs while fetching documents',
//   (done) => {
//     const expectedActions = [
//       {
//           type: 'Error',
//           error: {
//             message: 'error'
//           }
//       }
//     ];
//     const store = mockStore(state);
//     store.dispatch(docAction.doclist()).then(() => {
//       expect(store.getActions()).to.eql(expectedActions);
//       done();
//     });
//     moxios.wait(() => {
//       const request = moxios.requests.mostRecent();
//       request.respondWith({
//         status: 400,
//         response: {
//             message: 'error'
//         } });
//     });
//   });
//   it('dispatch DELETE_DOCUMENTS_SUCCESS when a document has been deleted',
//   (done) => {
//     const expectedActions = [
//       {
//         type: types.DELETE_DOCUMENTS_SUCCESS,
//         id: 1
//       }
//     ];
//     const store = mockStore(state);
//     store.dispatch(docAction.deleteDoc(1))
//     .then(() => {
//       expect(store.getActions()).to.eql(expectedActions);
//       done();
//     });
//     moxios.wait(() => {
//       const request = moxios.requests.mostRecent();
//       request.respondWith({
//         status: 200,
//         response: {
//           docId: 1
//         }
//       });
//     });
//   });
//   it('dispatch Error when error occurs while deleting document',
//   (done) => {
//     const expectedActions = [
//       {
//         type: 'Error',
//         error: {
//             message: 'error'
//         }
//       }
//     ];
//     const store = mockStore(state);
//     store.dispatch(docAction.deleteDoc(1))
//     .then(() => {
//       expect(store.getActions()).to.eql(expectedActions);
//       done();
//     });
//     moxios.wait(() => {
//       const request = moxios.requests.mostRecent();
//       request.respondWith({
//         status: 400,
//         response: {
//           message: 'error'
//         }
//       });
//     });
//   });
//   it('dispatch UPDATE_DOCUMENTS_SUCCESS when a document was updated',
//   (done) => {
//     const expectedActions = [
//       {
//         type: types.UPDATE_DOCUMENTS_SUCCESS,
//         document: { title: 'update' }
//       }
//     ];
//     const store = mockStore(state);
//     store.dispatch(docAction.updateDoc({ title: 'update' }))
//       .then(() => {
//         expect(store.getActions()).to.eql(expectedActions);
//         done();
//     });
//     moxios.wait(() => {
//       const request = moxios.requests.mostRecent();
//       request.respondWith({
//         status: 200,
//         response: {
//           title: 'update'
//         } });
//     });
//   });
//   it('dispatch ERROR when error occurs updating documents',
//   (done) => {
//     const expectedActions = [
//       {
//         type: 'Error',
//         error: { message: 'error' }
//       }
//     ];
//     const store = mockStore(state);
//     store.dispatch(docAction.updateDoc({ title: 'update' }))
//       .then(() => {
//         expect(store.getActions()).to.eql(expectedActions);
//         done();
//     });
//     moxios.wait(() => {
//       const request = moxios.requests.mostRecent();
//       request.respondWith({
//         status: 400,
//         response: {
//           message: 'error'
//         } });
//     });
//   });
//   it('dispatch FETCH_DOCUMENT_SUCCESS when a single document was fetched',
//   (done) => {
//     const expectedActions = [
//       {
//         type: types.FETCH_DOCUMENT_SUCCESS,
//         document: {
//           title: 'update',
//           id: 1
//         }
//       }
//     ];
//     const store = mockStore(state);
//     store.dispatch(docAction.findDoc(1))
//       .then(() => {
//         expect(store.getActions()).to.eql(expectedActions);
//         done();
//     });
//     moxios.wait(() => {
//       const request = moxios.requests.mostRecent();
//       request.respondWith({
//         status: 200,
//         response: {
//           documents: {
//             title: 'update',
//             id: 1
//           }
//         } });
//     });
//   });
//   it('dispatch ERROR when error occurs while fetching a single document',
//   (done) => {
//     const expectedActions = [
//       {
//         type: 'Error',
//         error: {
//           message: 'error'
//         }
//       }
//     ];
//     const store = mockStore(state);
//     store.dispatch(docAction.findDoc(1))
//       .then(() => {
//         expect(store.getActions()).to.eql(expectedActions);
//         done();
//     });
//     moxios.wait(() => {
//       const request = moxios.requests.mostRecent();
//       request.respondWith({
//         status: 400,
//         response: {
//           message: 'error'
//         } });
//     });
//   });
//   it('dispatch CREATE_DOCUMENTS_SUCCESS when a user creates a document',
//   (done) => {
//     const expectedActions = [
//       {
//         type: types.CREATE_DOCUMENTS_SUCCESS,
//         document: {
//           document: {
//             title: 'update',
//             content: 'stuff'
//           }
//         }
//       }
//     ];
//     const store = mockStore(state);
//     store.dispatch(docAction.createDoc({ title: 'update', content: 'stuff' }))
//       .then(() => {
//         expect(store.getActions()).to.eql(expectedActions);
//         done();
//     });
//     moxios.wait(() => {
//       const request = moxios.requests.mostRecent();
//       request.respondWith({
//         status: 200,
//         response: {
//           document: {
//             title: 'update',
//             content: 'stuff'
//           }
//         } });
//     });
//   });
//   it('dispatch ERROR when error occurs while creating a document',
//   (done) => {
//     const expectedActions = [
//       {
//         type: 'Error',
//         error: {
//           message: 'error'
//         }
//       }
//     ];
//     const store = mockStore(state);
//     store.dispatch(docAction.createDoc({}))
//       .then(() => {
//         expect(store.getActions()).to.eql(expectedActions);
//         done();
//     });
//     moxios.wait(() => {
//       const request = moxios.requests.mostRecent();
//       request.respondWith({
//         status: 400,
//         response: {
//           message: 'error'
//         } });
//     });
//   });
//   it('dispatch SEARCH_SUCCESS when a user successfully searches for a document',
//   (done) => {
//     const expectedActions = [
//       {
//         type: types.SEARCH_SUCCESS,
//         search: [],
//         metadata: {}
//       }
//     ];
//     const store = mockStore(state);
//     store.dispatch(docAction.searchDoc({ title: 'update' }))
//       .then(() => {
//         expect(store.getActions()).to.eql(expectedActions);
//         done();
//     });
//     moxios.wait(() => {
//       const request = moxios.requests.mostRecent();
//       request.respondWith({
//         status: 200,
//         response: {
//           result: {
//               rows: []
//           },
//           metadata: {}
//         } });
//     });
//   });
//   it('dispatch ERROR when error occurs while searching for documents',
//   (done) => {
//     const expectedActions = [
//       {
//         type: 'Error',
//         error: {
//           message: 'error'
//         }
//       }
//     ];
//     const store = mockStore(state);
//     store.dispatch(docAction.searchDoc({}))
//       .then(() => {
//         expect(store.getActions()).to.eql(expectedActions);
//         done();
//     });
//     moxios.wait(() => {
//       const request = moxios.requests.mostRecent();
//       request.respondWith({
//         status: 400,
//         response: {
//           message: 'error'
//         } });
//     });
//   });
// });