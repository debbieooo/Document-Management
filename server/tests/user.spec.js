const app = require('../../app');
const request = require('supertest');
const chai = require('chai');
const faker = require('faker');

const expect = chai.expect;

const api = request(app);
const user1data = {
  name: faker.name.firstName(),
  userName: faker.internet.userName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
  roleId: '2'
};
const user2data = {
  name: faker.name.firstName(),
  userName: faker.internet.userName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
  roleId: '1'
};

describe('User', () => {
  const user = {};
  const adminUser = {};
  // sign up tests
  before((done) => {
    api.post('/api/v1/users/signup').send(user1data)
       .end((err, res) => {
         user.id = res.body.id;
         user.token = res.body.token;
         expect(res.status).to.equal(201);
         api.post('/api/v1/users/signup').send(user2data)
          .end((err, res) => {
            adminUser.id = res.body.id;
            adminUser.token = res.body.token;
            expect(res.status).to.equal(201);
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

  describe('(login', () => {
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
  xdescribe('Display all users', () => {
      // list all users tests
    it('should not display all the users in the system if not authorized', (done) => {
      api.get('/api/v1/users').end((err, res) => {
        expect(res.status).to.equal(401);
        done();
      });
    });
    it('should  display all the users in the system', (done) => {
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
  describe('Cannot delete a user if youre not signed in', (done) => {
    it('deletes a particular user by id', () => {
      api.delete(`/api/v1/users/${user.id}`)
        .set('Authorization', adminUser.token)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          done();
        });
    });
  });
});

