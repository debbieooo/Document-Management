describe('User Model', () => {
  beforeEach((done) => {
    sequelize.sync({ force: true})
      .done(() => {
        Role.create({ title: 'admin' })
          .then(() => {
            done();
          });
      });
  })
  afterEach((done) => {
    User.destroy({
      where: {}
    })
    .then(() => {
      Role.destroy({
        where: {}
      })
      .then(() => {
        done();
      });
    });
  });
  it('should create a new user', (done) => {
    const user = generateAdminUser();
    User.create(user)
      .then((createdUser) => {
        expect(createdUser.name).to.eql(user.name);
        expect(createdUser.userName).to.eql(user.userName);
        expect(createdUser.email).to.eql(user.email);
        expect(createdUser.password).to.not.eql(user.password);
        done();       
      });
  });
});
