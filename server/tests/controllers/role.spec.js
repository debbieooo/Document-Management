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

   describe('create role', (done) => {
    it('admin ', (done) => {
      api.post('/api/v1/roles')
     .set({authorization : adminUser.token})
      .send(Admin)
       .end((err, res) => {
         expect(res.status).to.equal(201);
         done();
       });
    });
     it('general ', (done) => {
      api.post('/api/v1/roles')
      .set({authorization : adminUser.token})
      .send(Regular)
       .end((err, res) => {
         expect(res.status).to.equal(201);
         done();
       });
    });
     it('staff ', (done) => {
      api.post('/api/v1/roles')
      .set({authorization : adminUser.token})
      .send(Staff)
       .end((err, res) => {
         expect(res.status).to.equal(201);
         done();
       });
    });
     it('staff role cannot be created due to bad request ', (done) => {
      api.post('/api/v1/roles')
      .set({authorization : adminUser.token})
      .send()
       .end((err, res) => {
         expect(res.status).to.equal(400);
         done();
       });
    });
  });
  describe('get all roles', (done) => {
    it('should display all the roles to the admin', (done) => {
    api.get('/api/v1/roles')
      .set({authorization : adminUser.token})
       .end((err, res) => {
         expect(res.status).to.equal(201);
         done();
       });
    });
  });
});