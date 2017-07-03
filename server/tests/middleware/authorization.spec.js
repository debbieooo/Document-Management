import authorization from '../../middleware/authorization';

let req = {};
let res = {};

describe('Authorization middleware', () => {
  let token;

  const responseEvent = () => httpMocks.createResponse({
    eventEmitter: events.EventEmitter
  });
  
      beforeEach((done) => {
        sequelize.sync({ force: true })
         .done(() => {
            Role.create({ title: 'admin' })
              .then(() => {
                User.create(generateAdminUser())
                  .then((user) => {
                    token = generateToken(user);
                    done();
                  });
              });
         });
      });
  

  afterEach((done) => {
    Role.destroy({ where: {} })
      .then(() => {
        User.destroy({ where: {} })
          .then(() => {
            done();
          });
      });
  });

  it('should allow users with a valid token', (done) => {
    req = httpMocks.createRequest({
      method: 'GET',
      url: '/api/v1/users',
      headers: { authorization: token },
    });
    res = httpMocks.createResponse();
    const middlewareStub = {
      callback: () => expect(middlewareStub.callback.called).to.be.true
    };

    sinon.spy(middlewareStub, 'callback');
    authorization.authorize(req, res, middlewareStub.callback);
    
    done();
  });
   it.only('should allow only admin with a role id of 1', (done) => {
    req = httpMocks.createRequest({
      method: 'GET',
      url: '/api/v1/users',
      headers: { authorization: token },
      decoded: { role: 1 }
    });
    res = httpMocks.createResponse();
    const middlewareStub = {
      callback: () => expect(middlewareStub.callback.called).to.be.true
    };

    sinon.spy(middlewareStub, 'callback');
    authorization.authorizeAdmin(req, res, middlewareStub.callback);
    
    done();
  });
});