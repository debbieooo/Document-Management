const app = require('../../app');
const request = require('supertest');
const chai = require('chai');

const expect = chai.expect;

const api = request(app);
api.get('/api/users/signup');

describe('User', () => {
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
  });
});
