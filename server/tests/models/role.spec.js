describe('Roles Model', () => {
  afterEach((done) => {
    Role.destroy({
        where: {}
    })
    .then(() => {
      done();
    });
  });
  it('should create a new roles', (done) => {
    Role.create({ title: 'admin' })
      .then((createdRole) => {
        expect(createdRole.title).to.eql('admin');
        done();       
      });
  });
});
