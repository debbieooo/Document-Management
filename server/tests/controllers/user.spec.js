const app = require('../../../app');
const expect = chai.expect;

const api = request(app);
const user1data = generateRegUser();
const user2data = generateAdminUser();
const Admin = generateAdminRole();
const Regular = generateRegularRole();
const Staff = generateStaffRole();
const document = generateDocument(user1data.id);

describe('User', () => {
  const user = {};
  const adminUser = {};
  // sign up tests
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

  describe('signup', () => {
    it('should sign a user up ', (done) => {
      api.post('/api/v1/users/signup').send({
        name: faker.name.firstName(),
        userName: faker.internet.userName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        roleId: '2'
      })
       .end((err, res) => {
         expect(res.status).to.equal(201);
         done();
       });
    });
    it('should not allow an already existing user to sign up', (done) => {
      api.post('/api/v1/users/signup')
      .send(user1data)
      .end((err, res) => {
        expect(res.status).to.equal(409);
        done();
      });
    });
    it(
      'should not allow a user to sign up with an existing username'
      , (done) => {
        api.post('/api/v1/users/signup').send({
          name: 'Mary',
          userName: user1data.userName,
          email: 'marybs@debs.com',
          password: 'testing',
          roleId: '2'
        })
      .end((err, res) => {
        expect(res.status).to.equal(409);
        done();
      });
    });
    it(
      'should not allow a user to sign up with an existing email'
      , (done) => {
        api.post('/api/v1/users/signup').send({
          name: 'Mary',
          userName: 'Mary',
          email: user1data.email,
          password: 'testing',
          roleId: '2'
        })
      .end((err, res) => {
        expect(res.status).to.equal(409);
        done();
      });
    });
  });

  describe('login', () => {
    // log in tests

    it('should log an existing user in with email and password', (done) => {
      api.post('/api/v1/users/login').send({
        email: user1data.email,
        password: user1data.password
      })
      .end((err, res) => {
        expect(res.status).to.equal(200);
        done();
      });
    });
    it('should log an existing user in with username and password', (done) => {
      api.post('/api/v1/users/login').send({
        userName: user1data.userName,
        password: user1data.password
      })
      .end((err, res) => {
        expect(res.status).to.equal(200);
        done();
      });
    });
    it('should not log in a user with wrong email', (done) => {
      api.post('/api/v1/users/login').send({
        email: 'test@debs.com',
        password: 'test2'
      })
      .end((err, res) => {
        expect(res.status).to.equal(404);
        done();
      });
    });
    it('should not log in a user with wrong username', (done) => {
      api.post('/api/v1/users/login').send({
        email: 'testsss@debs.com',
        password: 'test2'
      })
      .end((err, res) => {
        expect(res.status).to.equal(404);
        done();
      });
    });
    it('should not log in a user with wrong password', (done) => {
      api.post('/api/v1/users/login').send({
        userName: 'debs@manager.com',
        password: 'testingsss'
      })
      .end((err, res) => {
        expect(res.status).to.equal(404);
        done();
      });
    });
    it('should not log in a user with empty username field', (done) => {
      api.post('/api/v1/users/login').send({
        userName: '',
        password: 'testing'
      })
      .end((err, res) => {
        expect(res.status).to.equal(400);
        done();
      });
    });
    it('should not log in a user with empty email field', (done) => {
      api.post('/api/v1/users/login').send({
        email: '',
        password: 'testing'
      })
      .end((err, res) => {
        expect(res.status).to.equal(400);
        done();
      });
    });
    it('should not log in a user with empty password field', (done) => {
      api.post('/api/v1/users/login').send({
        email: 'debs@manager.com',
        password: ''
      })
      .end((err, res) => {
        expect(res.status).to.equal(400);
        done();
      });
    });
  });
  describe('Display all users', () => {
      // list all users tests
    it('should not display all the users in the application if its not the admin user', (done) => {
      api.get('/api/v1/users').end((err, res) => {
        expect(res.status).to.equal(401);
        done();
      });
    });
    it('should  display all the users in the application', (done) => {
      api.post('/api/v1/users/login').send({
        userName: 'test2',
        password: 'test2'
      });
      api.get('/api/users').end((err, res) => {
        expect(res.status).to.equal(200);
        done();
      });
    });
  });

  describe('Cannot delete a user if youre not signed in', () => {
    it('deletes a particular user by id', (done) => {
      api.delete(`/api/v1/users/${user.id}`)
        .set('Authorization', adminUser.token)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          done();
        });
    });
  });

  describe('Bad request error', () => {
    it('should be thrown when a user attempts signup with  empty params', (done) => {
      api.post('/api/v1/users/signup').send({
        name: faker.name.firstName(),
        userName: faker.internet.userName(),
        email: faker.internet.email(),
        roleId: '2'
      })
       .end((err, res) => {
         expect(res.status).to.equal(400);
         done();
       });
    })
    it('should be thrown when a user attempts login with  empty params', (done) => {
      api.post('/api/v1/users/login').send({
        email: user1data.email,
      })
      .end((err, res) => {
        expect(res.status).to.equal(400);
        done();
      });
    });
  });
  describe('listall users', () => {
    it('should have the list of all users without offset and limits', (done) => {
      api.get('/api/v1/users').set({authorization : adminUser.token})
      .end((err, res) => {
        expect(res.status).to.equal(200);
        done();
      });
    });
  });
  describe('find a user', () => {
    it('should find a particular user using id', (done) => {
      api.get(`/api/v1/users/${user.id}`)
      .set({authorization : adminUser.token})
      .end((err, res) => {
        expect(res.status).to.equal(200);
        done();
      });
    });
  });
  describe('update a user', () => {
    it('should update a particular user using id', (done) => {
      api.put(`/api/v1/users/${adminUser.id}`)
      .send({userName: 'admin'})
      .set({authorization : adminUser.token})
      .end((err, res) => {
        expect(res.status).to.equal(201);
        done();
      });
    });
  });
  describe('delete a user by the admin', (done) => {
    it('should update a particular user using id', (done) => {
      api.delete(`/api/v1/users/${user.id}`)
      .set({authorization : adminUser.token})
      .end((err, res) => {
        expect(res.status).to.equal(200);
        done();
      });
    });
    it('should throw an error with wrong id', (done) => {
      api.delete('/api/v1/users/3')
      .set({authorization : adminUser.token})
      .end((err, res) => {
        expect(res.status).to.equal(404);
        done();
      });
    });
    describe('Display documents for admin user', (done) => {
      it('should display documents and their authors', (done) => {
        api.get('/api/v1/documents')
        .set({authorization : adminUser.token})
        .end((err, res) => {
          expect(res.status).to.equal(200);
          done();
        })
      });
    });
      describe('Display documents for regular or staff user', (done) => {
      it('should display public documents and their authors on the regular users dashboard', (done) => {
        api.get('/api/v1/documents')
        .set({authorization : user.token})
        .end((err, res) => {
          expect(res.status).to.equal(200);
          done();
        })
      });
    });
    describe('Active user', (done) => {
      it('should get the current user logged in ', (done) => {
        api.get('/api/v1/users/active')
        .set({authorization : user.token})
        .end((err, res) => {
          expect(res.status).to.equal(200);
          done();
        });
      });
    });
  });
});

