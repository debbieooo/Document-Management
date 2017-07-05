const Documents = require('../models').Documents;
const Users = require('../models').User;


module.exports = {
  /**
   *
   *
   * @param {any} req
   * @param {any} res
   * @returns
   */
  create(req, res) {
    const access = req.body.access;
    const title = req.body.title;
    if(!title || title === '') {
      return res.status(400).send({ message: 'title required' })
    } else if (!access) {
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
        access: req.body.access
      })
      .then(documents => res.status(201).send(documents));
  },
  /**
   *
   *
   * @param {any} req
   * @param {any} res
   * @returns
   */
  findDoc(req, res) {
    const userId = req.decoded.id;
    return Documents
      .findById(req.params.id)
      .then((documents) => {
        if (!documents) {
            return res.status(404).send({
              message: 'Document Not Found'
            });
        } else if (documents.userId !== userId && documents.access === 'Private') {
          return res.status(401).send({ message: 'Not authorized, its not your document' });
        } else {
          res.status(200)
            .send({ documents });
        }
      });
  },
  /**
   *
   *
   * @param {any} req
   * @param {any} res
   * @returns
   */
  update(req, res) {
    const id = req.decoded.id;
    return Documents
      .findById(req.params.id)
      .then((documents) => {
        if (!documents) {
            return res.status(404).send({
              message: 'Document Not Found'
            });
          } else if (documents.userId !== id) {
          return res.status(401).send({ message: 'Not authorized, its not your document :)' });
        } else {
          if (documents.userId === id) {
            return documents
              .update(req.body)
              .then(() => res.status(200).send(documents));
          }
        }
      })
  },
  /**
   *
   *
   * @param {any} req
   * @param {any} res
   * @returns
   */
  delete(req, res) {
    const userId = req.decoded.id;
    const role = req.decoded.role;
    return Documents
      .findById(req.params.id)
      .then((documents) => {
        if (!documents) {
            return res.status(404).send({
              message: 'Documents Not Found'
            });
          } else if (documents.userId !== userId && role !== 1) {
          res.status(401).send({ message: 'Not authorized, its not your document :)' });
        } else {
          return documents
            .destroy()
            .then(() => res.status(200).send({
              message: 'Documents deleted successfully'
            }))
        }
      })
  }

};
