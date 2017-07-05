const app = require('../../../app');
const expect = chai.expect;
const api = request(app);

const user1data = generateRegUser();
const user2data = generateAdminUser();
const Admin = generateAdminRole();
const Regular = generateRegularRole();
const Staff = generateStaffRole();
const document = generateDocument(user1data.id);

describe('Role', () => {
  const user = {};
  const adminUser = {};
  beforeEach((done) => {
    sequelize.sync({ force: true})
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
                    console.log(createdAdmin.roleId)
                    adminUser.token = generateToken(createdAdmin);
                document.userId = user.id
                Documents.create(document)
                .then((createdDoc) => {
                    adminUser.id = createdDoc.userId;
                })
                    done();
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

describe(' create document', () => {
  it('should create documents',(done) => {
    api.post('/api/v1/documents')
    .send(document)
      .set({authorization : user.token})
      .end((err, res) => {
      expect(res.status).to.equal(201);
      done();
      }); 
  });
  it('should create documents',(done) => {
     document.access = 'Private'
    api.post('/api/v1/documents')
    .send(document)
      .set({authorization : user.token})
      .end((err, res) => {
      expect(res.status).to.equal(201);
      done();
      }); 
  });
  it('should create documents',(done) => {
    document.access = 'Role'
    api.post('/api/v1/documents')
    .send(document)
      .set({authorization : user.token})
      .end((err, res) => {
      expect(res.status).to.equal(201);
      done();
      }); 
  });
  it('should not create documents without title',(done) => {
    delete document.title
    api.post('/api/v1/documents')
    .send(document)
      .set({authorization : user.token})
      .end((err, res) => {
      expect(res.status).to.equal(400);
      done();
      }); 
  });
  it('should not create documents without title',(done) => {
    delete document.access
    api.post('/api/v1/documents')
    .send(document)
      .set({authorization : user.token})
      .end((err, res) => {
      expect(res.status).to.equal(400);
      done();
      });
  });
  it('should not create documents without title',(done) => {
    delete document.access
    api.post('/api/v1/documents')
    .send({...document, access: 'hh'})
      .set({authorization : user.token})
      .end((err, res) => {
      expect(res.status).to.equal(400);
      done();
      });
  });
  it('should not create documents without title',(done) => {
    delete document.title
    delete document.access
    api.post('/api/v1/documents')
    .send(document)
      .set({authorization : user.token})
      .end((err, res) => {
      expect(res.status).to.equal(400);
      done();
      });
  });
})

describe('find document', (done) => {
  it('should throw an error for bad request to get a document',(done) => {
    api.get(`/api/v1/documents/${document.id}`)
      .set({authorization : user.token})
      .end((err, res) => {
      expect(res.status).to.equal(400);
      done();
      }); 
  });
it('should get documents',(done) => {
    api.get(`/api/v1/documents/${document.id}/documents`)
      .set({authorization : user.token})
      .end((err, res) => {
      expect(res.status).to.equal(200);
      done();
    }); 
  });
  xit('should not get document if its not owned by the user',(done) => {
    document.access = 'Private'
console.log('documentedss', document.access)
console.log('documented id', document.userId)
console.log('user', user.id)
console.log('user1data', user1data);
    api.get('/api/v1/documents/1/documents')
      .set({authorization : user.token})
      .end((err, res) => {
      expect(res.status).to.equal(400);
      done();
    }); 
    })
  });
});



 