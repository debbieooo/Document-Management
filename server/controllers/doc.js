const Docs = require('../models').Doc;
const Users = require('../models').User;

module.exports = {
  create(req, res) {
    return Docs
          .create({
            content: req.body.content,
            userId: req.body.userId,
            title: req.body.title,
            access: req.body.access ? req.body.access : 'Public'
          })
          .then(docs => res.status(201).send(docs))
          .catch(error => res.status(400).send(error));
  },
  findDoc(req, res) {
    return Docs
     .findById(req.params.id)
     .then((doc) => {
       if (!doc) {
         return res.status(400).send({
           message: 'Document Not Found'
         });
       }

       res.status(200)
           .send({ doc });
     })
     .catch(error => res.status(400).send({
       message: 'Bad request'
     }));
  },
  listAllDocs(req, res) {
    return Docs
    .findAll({})
    .then(docs => res.status(200).send(docs))
    .catch(error => res.status(404).send(error));
  },
  // search(req, res) {
  //   return Docs
  //   .findAndCountAll({
  //     where: {
  //       title: req.params.title
  //     }
  //   })
  //   .then((doc) => {
  //     if (doc.count === 0) {
  //       res.status(404)
  //       .send({ message: '' });
  //     } else {
  //       return res.status(200).send(doc);
  //     }
  //   })
  //   .catch(error => res.status(400).send({
  //     message: 'Bad request'
  //   }));
  // },
  update(req, res) {
    return Docs
    .findById(req.params.id)
    .then((docs) => {
      if (!docs) {
        return res.status(404).send({
          message: 'Document Not Found',
        });
      }
      return docs
        .update(req.body)
        .then(() => res.status(200).send(docs))
        .catch(error => res.status(400).send(error));
    })
    .catch(error => res.status(400).send(error));
  },
  delete(req, res) {
    return Docs
     .findById(req.params.id)
     .then((docs) => {
       if (!docs) {
         return res.status(400).send({
           message: 'User Not Found'
         });
       }
       return docs
       .destroy()
       .then(() => res.status(200).send({
         message: 'Docs deleted successfully'
       }))
       .catch(error => res.status(400).send(error));
     })
     .catch(error => res.status(400).send({
       message: 'Bad request'
     }));
  }

};
