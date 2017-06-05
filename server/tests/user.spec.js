const app = require('../../app');
const request = require('supertest');
const chai = require('chai');

const expect = chai.expect;

const api = request(app);
// api.get('/api/users/signup');


describe('User', () => {
  // sign up tests

  xdescribe('signup', () => {
    it('should sign a user up ', (done) => {
      api.post('/api/users/signup').send({
        name: 'test2',
        userName: 'test2',
        email: 'test2@debs.com',
        password: 'test2',
        roleId: '2'
      })
       .end((err, res) => {
        //  console.log(res.body, res.status);
         console.log('ressssss', res.status);
         expect(res.status).to.equal(201);
         done();
       });
    });
    it('should not allow an already existing user to sign up', (done) => {
      api.post('/api/users/signup').send({
        name: 'Deborah',
        userName: 'Deborah',
        email: 'debs@debs.com',
        password: 'testing',
        roleId: '2'
      })
      .end((err, res) => {
        expect(res.status).to.equal(409);
        done();
      });
    });
    it(
      'should not allow a user to sign up with an existing username'
      , (done) => {
        api.post('/api/users/signup').send({
          name: 'Mary',
          userName: 'Deborah',
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
        api.post('/api/users/signup').send({
          name: 'Mary',
          userName: 'Mary',
          email: 'debs@debs.com',
          password: 'testing',
          roleId: '2'
        })
      .end((err, res) => {
        expect(res.status).to.equal(409);
        done();
      });
      });
  });

  xdescribe('(login', () => {
    // log in tests

    it('should log an existing user in with email and password', (done) => {
      api.post('/api/users/login').send({
        email: 'test2@debs.com',
        password: 'test2'
      })
      .end((err, res) => {
        expect(res.status).to.equal(200);
        done();
      });
    });
    it('should log an existing user in with username and password', (done) => {
      api.post('/api/users/login').send({
        userName: 'test2',
        password: 'test2'
      })
      .end((err, res) => {
        expect(res.status).to.equal(200);
        done();
      });
    });
    it('should not log in a user with wrong email', (done) => {
      api.post('/api/users/login').send({
        email: 'test@debs.com',
        password: 'test2'
      })
      .end((err, res) => {
        expect(res.status).to.equal(404);
        done();
      });
    });
    it('should not log in a user with wrong username', (done) => {
      api.post('/api/users/login').send({
        email: 'testsss@debs.com',
        password: 'test2'
      })
      .end((err, res) => {
        expect(res.status).to.equal(404);
        done();
      });
    });
    it('should not log in a user with wrong password', (done) => {
      api.post('/api/users/login').send({
        userName: 'debs@manager.com',
        password: 'testingsss'
      })
      .end((err, res) => {
        expect(res.status).to.equal(404);
        done();
      });
    });
    it('should not log in a user with empty username field', (done) => {
      api.post('/api/users/login').send({
        userName: '',
        password: 'testing'
      })
      .end((err, res) => {
        expect(res.status).to.equal(400);
        done();
      });
    });
    it('should not log in a user with empty email field', (done) => {
      api.post('/api/users/login').send({
        email: '',
        password: 'testing'
      })
      .end((err, res) => {
        expect(res.status).to.equal(400);
        done();
      });
    });
    it('should not log in a user with empty password field', (done) => {
      api.post('/api/users/login').send({
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
    it('should not display all the users in the system if not authorized', (done) => {
      api.get('/api/users').end((err, res) => {
        expect(res.status).to.equal(401);
        done();
      });
    });
    it('should  display all the users in the system', (done) => {
      api.post('/api/users/login').send({
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
      api.delete('/api/users/10').end((err, res) => {
        expect(res.status).to.equal(401);
        done();
      });
    });
  });
});

