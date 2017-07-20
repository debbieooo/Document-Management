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

  it('should allow users with a valid token access the application', (done) => {
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

  it('should throw an error if the token does not exist', (done) => {
    req = httpMocks.createRequest({
      method: 'GET',
      url: '/api/v1/users',
      headers: { authorization: 'token' },
    });
    res = responseEvent();
    const middlewareStub = {
      callback: () => null
    };
    sinon.spy(middlewareStub, 'callback');
    authorization.authorize(req, res, middlewareStub.callback);
    res.on('end', () => {
      const response = JSON.parse(res._getData());
      expect(response.message).to
        .eql('wrong token');
      done();
    });
  });

  it('should allow only admin with a role id of 1', (done) => {
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
  it('should throw an error if the user is not authorized', (done) => {
    req = httpMocks.createRequest({
      method: 'GET',
      url: '/api/v1/users',
      headers: { authorization: token },
      decoded: { role: 2 }
    });
    res = responseEvent();
    const middlewareStub = {
      callback: () => null
    };
    sinon.spy(middlewareStub, 'callback');
    authorization.authorizeAdmin(req, res);
    expect(JSON.parse(res._getData()).message).to.eql('unathorized');
    done();
  });
});
