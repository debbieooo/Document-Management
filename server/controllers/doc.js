const Docs = require('../models').Doc;
const Users = require('../models').User;


module.exports = {
  create(req, res) {
    const userId = req.decoded.id;
    return Docs
      .create({
        content: req.body.content,
        userId,
        title: req.body.title,
        access: req.body.access ? req.body.access : 'Public'
      })
      .then(docs => res.status(201).send(docs))
      .catch(error => res.status(400).send(error));
  },
  findDoc(req, res) {
    const userId = req.decoded.id;
    return Docs
      .findById(req.params.id)
      .then((doc) => {
        if (doc.userId !== userId && doc.access !== 'Public') {
          res.status(401).send({ message: 'Not authorized, its not your document' });
        } else {
          if (!doc) {
            return res.status(400).send({
              message: 'Document Not Found'
            });
          }

          res.status(200)
            .send({ doc });
        }
      })
      .catch(error => res.status(400).send({
        error,
        message: 'Bad request'
      }));
  },
  update(req, res) {
    const userId = req.decoded.id;
    return Docs
      .findById(req.params.id)
      .then((docs) => {
        if (docs.userId !== userId) {
          res.status(401).send({ message: 'Not authorized, its not your document' });
        } else {
          if (!docs) {
            return res.status(404).send({
              message: 'Document Not Found'
            });
          }
          return docs
            .update(req.body)
            .then(() => res.status(200).send(docs))
            .catch(error => res.status(400).send(error));
        }
      })
      .catch(error => res.status(400).send(error));
  },
  delete(req, res) {
    const userId = req.decoded.id;
    const role = req.decoded.role;
    console.log('role', role);
    console.log('userId', userId);
    return Docs
      .findById(req.params.id)
      .then((docs) => {
        if (docs.userId !== userId && role !== 1) {
          res.status(401).send({ message: 'Not authorized, its not your document' });
        } else {
          if (!docs) {
            return res.status(400).send({
              message: 'Docs Not Found'
            });
          }
          return docs
            .destroy()
            .then(() => res.status(200).send({
              message: 'Docs deleted successfully'
            }))
            .catch(error => res.status(400).send(error));
        }
      })
      .catch(error => res.status(400).send({
        error,
        message: 'Bad request'
      }));
  }

};
