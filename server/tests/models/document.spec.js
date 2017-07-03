describe('Document Model', () => {
  let userId;
  let original;
  beforeEach((done) => {
    sequelize.sync({ force: true})
      .done(() => {
        Role.create({ title: 'admin' })
          .then(() => {
            User.create(generateAdminUser())
              .then((user) => {
                userId = user.id;
                original = generateDocument(userId);
                Documents.create(original)
                  .then(() => {
                    done();
                  });
              });
          });
      });
  })
  afterEach((done) => {
    Documents.destroy({
      where: {}
    })
    .then(() => {
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
      })
    })
  });
  it('should create a new document', (done) => {
    const document = generateDocument(userId);
    Documents.create(document)
      .then((createdDocument) => {
        expect(createdDocument.userId).to.eql(userId);
        expect(createdDocument.title).to.eql(document.title);
        expect(createdDocument.content).to.eql(document.content);
        done();       
      });
  });

  it('should not create a document without title', (done) => {
    const document = generateDocument(userId);
    delete document.title;
    Documents.create(document)
      .catch((error) => {
        expect(error.message).to.eql('notNull Violation: title cannot be null');
        done();       
      });
  });
});
