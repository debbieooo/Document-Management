const app = require('../../app');
const request = require('supertest');
const chai = require('chai');

const expect = chai.expect;

const api = request(app);
// api.get('/api/users/signup');


describe('User', () => {
  // sign up tests

  describe('signup', () => {
    it('should sign a user up ', () => {
      api.post('/api/users/signup').send({
        name: 'Deborah',
        userName: 'Deborah',
        email: 'debs@debs.com',
        password: 'testing',
        roleId: '2'
      })
       .end((err, res) => {
         console.log(res.body, res.status);
         expect(res.status).to.be(201);
       });
    });
    it('should not allow an already existing user to sign up', () => {
      api.post('/api/users/signup').send({
        name: 'Deborah',
        userName: 'Deborah',
        email: 'debs@debs.com',
        password: 'testing',
        roleId: '2'
      })
      .end((err, res) => {
        expect(res.status).to.be(409);
      });
    });
    it('should not allow a user to sign up with an existing username', () => {
      api.post('/api/users/signup').send({
        name: 'Mary',
        userName: 'Deborah',
        email: 'marybs@debs.com',
        password: 'testing',
        roleId: '2'
      })
      .end((err, res) => {
        expect(res.status).to.be(409);
      });
    });
    it('should not allow a user to sign up with an existing email', () => {
      api.post('/api/users/signup').send({
        name: 'Mary',
        userName: 'Mary',
        email: 'debs@debs.com',
        password: 'testing',
        roleId: '2'
      })
      .end((err, res) => {
        expect(res.status).to.be(409);
      });
    });
  });

  describe('(login', () => {
    // log in tests

    it('should log an existing user in with email and password', () => {
      api.post('api/users/login').send({
        email: 'debs@debs.com',
        password: 'testing'
      })
      .end((err, res) => {
        expect(res.status).to.be(200);
      });
    });
    it('should log an existing user in with username and password', () => {
      api.post('api/users/login').send({
        userName: 'Mary',
        password: 'testing'
      })
      .end((err, res) => {
        expect(res.status).to.be(200);
      });
    });
    it('should not log in a user with wrong email', () => {
      api.post('api/users/login').send({
        email: 'debs@manager.com',
        password: 'testing'
      })
      .end((err, res) => {
        expect(res.status).to.be(400);
      });
    });
    it('should not log in a user with wrong username', () => {
      api.post('api/users/login').send({
        userName: 'debs@manager.com',
        password: 'testing'
      })
      .end((err, res) => {
        expect(res.status).to.be(400);
      });
    });
    it('should not log in a user with wrong password', () => {
      api.post('api/users/login').send({
        userName: 'debs@manager.com',
        password: 'testingsss'
      })
      .end((err, res) => {
        expect(res.status).to.be(400);
      });
    });
    it('should not log in a user with empty username field', () => {
      api.post('api/users/login').send({
        userName: '',
        password: 'testing'
      })
      .end((err, res) => {
        expect(res.status).to.be(400);
      });
    });
    it('should not log in a user with empty email field', () => {
      api.post('api/users/login').send({
        email: '',
        password: 'testing'
      })
      .end((err, res) => {
        expect(res.status).to.be(400);
      });
    });
    it('should not log in a user with empty password field', () => {
      api.post('api/users/login').send({
        email: 'debs@manager.com',
        password: ''
      })
      .end((err, res) => {
        expect(res.status).to.be(400);
      });
    });
  });
  describe('list all users function', () => {
    it('should display all the users in the system', () => {
      api.get('api/users').end((err, res) => {
        expect(res.status).to(50);
      });
    });
  });
});

