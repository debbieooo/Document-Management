const Documents = require('../models').Documents;
const Users = require('../models').User;


module.exports = {
  create(req, res) {
    const access = req.body.access;
    if (!access) {
      return res.status(400).send({ message : 'Access required' });
    }
    if (access !== 'Public' && access !== 'Private' && access !== 'Role') {
      return res.status(400).send({ message : `No such access right  as ${access} available` });
    }
    const userId = req.decoded.id;
    return Documents
      .create({
        content: req.body.content,
        userId,
        title: req.body.title,
        access: req.body.access ? req.body.access : 'Public'
      })
      .then(documents => res.status(201).send(documents))
      .catch(error => res.status(400).send(error));
  },
  findDoc(req, res) {
    const userId = req.decoded.id;
    return Documents
      .findById(req.params.id)
      .then((documents) => {
        if (documents.userId !== userId && documents.access !== 'Public') {
          res.status(401).send({ message: 'Not authorized, its not your document' });
        } else {
          if (!documents) {
            return res.status(400).send({
              message: 'Document Not Found'
            });
          }

          res.status(200)
            .send({ documents });
        }
      })
      .catch(error => res.status(400).send({
        error,
        message: 'Bad request'
      }));
  },
  update(req, res) {
    const id = req.decoded.id;
    return Documents
      .findById(req.params.id)
      .then((documents) => {
        if (documents.userId !== id) {
          res.status(401).send({ message: 'Not authorized, its not your document :)' });
        } else {
          if (!documents) {
            return res.status(404).send({
              message: 'Document Not Found'
            });
          }
          if (documents.userId === id) {
            return documents
              .update(req.body)
              .then(() => res.status(200).send(documents))
              .catch(error => res.status(400).send(error));
          }
          return res.status(401).send({ message: 'You are not authorized :)' });
        }
      })
      .catch(error => res.status(400).send(error));
  },
  delete(req, res) {
    const userId = req.decoded.id;
    const role = req.decoded.role;
    return Documents
      .findById(req.params.id)
      .then((documents) => {
        if (documents.userId !== userId && role !== 1) {
          res.status(401).send({ message: 'Not authorized, its not your document :)' });
        } else {
          if (!documents) {
            return res.status(400).send({
              message: 'Documents Not Found'
            });
          }
          return documents
            .destroy()
            .then(() => res.status(200).send({
              message: 'Documents deleted successfully'
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
