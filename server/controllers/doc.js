const Docs = require('../models').Doc;
const Users = require('../models').User;

module.exports = {
  create(req, res) {
    return Docs
          .create({
            content: req.body.content,
            userId: req.params.userId,
          })
          .then(docs => res.status(201).send(docs))
          .catch(error => res.status(400).send(error));
  },
  update(req, res) {
    return Docs
    .find({
      where: {
        id: req.params.docId,
        userId: req.params.userId,
      },
    })
    .then((docs) => {
      if (!docs) {
        return res.status(404).send({
          message: 'Document Not Found',
        });
      }

      return docs
        .update({
          content: req.body.content || docs.content,
          complete: req.body.complete || docs.complete,
        })
        .then(updatedDocs => res.status(200).send(updatedDocs))
        .catch(error => res.status(400).send(error));
    })
    .catch(error => res.status(400).send(error));
  },
  destroy(req, res) {
    return Docs
    .find({
      where: {
        id: req.params.docId,
        userId: req.params.userId,
      },
    })
    .then((docs) => {
      if (!docs) {
        return res.status(404).send({
          message: 'Document Not Found',
        });
      }

      return docs
        .destroy()
        .then(() => res.status(204).send({
          message: 'Document deleted successfully',
        }))
        .catch(error => res.status(400).send(error));
    })
    .catch(error => res.status(400).send(error));
  },
};
