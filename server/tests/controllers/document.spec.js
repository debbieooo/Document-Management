/* global Documents:true */

const app = require('../../../app');

const expect = chai.expect;
const api = request(app);

const user1data = generateRegUser();
const user2data = generateAdminUser();
const Admin = generateAdminRole();
const Regular = generateRegularRole();
const Staff = generateStaffRole();
const document = generateDocument(user2data.id);
const userDocument = generateDocument(user1data.id);
const privateDocument = generateDocument(user1data.id);

describe('Document controller', () => {
  const user = {};
  const adminUser = {};
  beforeEach((done) => {
    sequelize.sync({ force: true })
      .done(() => {
        Role.bulkCreate([{ title: 'admin' }, { title: 'regular' }])
          .then(() => {
            api.post('/api/v1/users/signup').send(user1data)
              .end((err, res) => {
                user.id = res.body.id;
                user.token = res.body.token;
                expect(res.status).to.equal(201);
                User.create(user2data)
                  .then((createdAdmin) => {
                    adminUser.id = createdAdmin.id;
                    adminUser.token = generateToken(createdAdmin);
                    document.userId = createdAdmin.id;
                    Documents.create(document)
                      .then((createdDoc) => {
                        document.id = createdDoc.id;
                        adminUser.id = createdDoc.userId;
                        userDocument.userId = user.id;
                        Documents.create(userDocument)
                          .then((createdDoc) => {
                            userDocument.id = createdDoc.id;
                            user.id = createdDoc.userId;
                            privateDocument.userId = adminUser.id;
                            privateDocument.access = 'Private';
                            Documents.create(privateDocument)
                              .then((createdDoc) => {
                                privateDocument.id = createdDoc.id;
                                done();
                              });
                          });
                      });
                  });
              });
          });
      });
  });
  afterEach((done) => {
    User.destroy({ where: {} })
      .then(() => {
        Role.destroy({ where: {} })
          .then(() => {
            done();
          });
      });
  });

  describe(' Document', () => {
    it('should create documents', (done) => {
      api.post('/api/v1/documents')
        .send(document)
        .set({ authorization: adminUser.token })
        .end((err, res) => {
          expect(res.status).to.equal(201);
          done();
        });
    });
    it('should not create documents without title', (done) => {
      const newDocument = { ...document };
      delete newDocument.title;
      api.post('/api/v1/documents')
        .send(newDocument)
        .set({ authorization: user.token })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          done();
        });
    });
    it('should not create documents without access', (done) => {
      const newDocument = { ...document };
      delete newDocument.access;
      api.post('/api/v1/documents')
        .send(newDocument)
        .set({ authorization: user.token })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          done();
        });
    });
    it('should not create documents with a wrong access option', (done) => {
      document.access = 'Hi';
      api.post('/api/v1/documents')
        .send(document)
        .set({ authorization: user.token })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          done();
        });
    });
  });

  describe('find document', () => {
    it('should get documents with a specific id', (done) => {
      api.get(`/api/v1/documents/${document.id}`)
        .set({ authorization: user.token })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          done();
        });
    });
    it('should throw a not found error for documents that do not exist', (done) => {
      api.get('/api/v1/documents/09099')
        .set({ authorization: user.token })
        .end((err, res) => {
          expect(res.status).to.equal(404);
          done();
        });
    });
    it('should not get document if its not owned by the user', (done) => {
      const privateDoc = { ...privateDocument, access: 'Private' };
      api.get(`/api/v1/documents/${privateDoc.id}`)
        .set({ authorization: user.token })
        .end((err, res) => {
          expect(res.status).to.equal(401);
          done();
        });
    });
  });
  describe('delete document', () => {
    it('should delete a document', (done) => {
      api.delete(`/api/v1/documents/${userDocument.id}`)
        .set({ authorization: user.token })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          done(err);
        });
    });
    it('should not  delete a document if user is not authorized', (done) => {
      api.delete(`/api/v1/documents/${privateDocument.id}`)
        .set({ authorization: user.token })
        .end((err, res) => {
          expect(res.status).to.equal(401);
          done();
        });
    });
    it('should throw a not found error for documents that do not exist', (done) => {
      api.delete('/api/v1/documents/09099')
        .set({ authorization: user.token })
        .end((err, res) => {
          expect(res.status).to.equal(404);
          done();
        });
    });
  });
  describe('update document', () => {
    it('should update a document', (done) => {
      api.put(`/api/v1/documents/${userDocument.id}`)
        .send({ title: 'hello' })
        .set({ authorization: user.token })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          done(err);
        });
    });
    it('should not update a document if not owned by the user', (done) => {
      api.put(`/api/v1/documents/${privateDocument.id}`)
        .send({ title: 'hello' })
        .set({ authorization: user.token })
        .end((err, res) => {
          expect(res.status).to.equal(401);
          done();
        });
    });
    it('should throw a not found error for documents that do not exist', (done) => {
      api.put('/api/v1/documents/09099')
        .send({ title: 'hello' })
        .set({ authorization: user.token })
        .end((err, res) => {
          expect(res.status).to.equal(404);
          done();
        });
    });
  });
});

