const app = require('../../../app');
const expect = chai.expect;
const api = request(app);

const user1data = generateRegUser();
const user2data = generateAdminUser();
const Admin = generateAdminRole();
const Regular = generateRegularRole();
const Staff = generateStaffRole();
const document = generateDocument(user2data.id);
const userDocument =  generateDocument(user1data.id);
const privateDocument =  generateDocument(user1data.id);

describe('Document controller', () => {
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
                    adminUser.token = generateToken(createdAdmin);
                    document.userId = createdAdmin.id
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
                          })
                })
                

                   
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
  describe('find document', (done) => {
    it('should find specific document',(done) => {
      api.get
      (`/api/v1/search/documents/?title=${userDocument.title}&limit=10&offset=0`)
        .set({authorization : adminUser.token})
        .end((err, res) => {
          expect(res.status).to.equal(200);
          done();
      }); 
    });
    it('should get documents with title',(done) => {
      api.get(`/api/v1/search/documents/?title=${userDocument.title}`)
        .set({authorization : adminUser.token})
        .end((err, res) => {
          expect(res.status).to.equal(200);
          done();
      }); 
    });
  
    it('should get documents with default limit and offset',(done) => {
      api.get(`/api/v1/search/documents/?title=${userDocument.title}`)
        .set({authorization : user.token})
        .end((err, res) => {
          expect(res.status).to.equal(200);
          done();
      }); 
    });
    it('should get documents with default limit and offset',(done) => {
      api.get('/api/v1/search/documents/?title=034934ieiri')
        .set({authorization : user.token})
        .end((err, res) => {
          expect(res.status).to.equal(200);
          done();
      }); 
    });
  });
  describe('find user', (done) => {
    it('should get users',(done) => {
      api.get(`/api/v1/search/users/?q=${user2data.name}&limit=10&offset=0`)
        .set({authorization : adminUser.token})
        .end((err, res) => {
          expect(res.status).to.equal(200);
          done();
      }); 
    });
    it('should get users with default limit and offset',(done) => {
      api.get(`/api/v1/search/users/?q=${user2data.name}`)
        .set({authorization : adminUser.token})
        .end((err, res) => {
          expect(res.status).to.equal(200);
          done();
      }); 
    });
    it('should  not get users if user is not authorized',(done) => {
      api.get(`/api/v1/search/users/?q=${user2data.name}`)
        .set({authorization : user.token})
        .end((err, res) => {
          expect(res.status).to.equal(401);
          done();
      }); 
    });
    it('should display 404 for empty result',(done) => {
      api.get('/api/v1/search/users/?q=unknown')
        .set({authorization : adminUser.token})
        .end((err, res) => {
          expect(res.status).to.equal(200);
          done();
      }); 
    });
  });
});



 