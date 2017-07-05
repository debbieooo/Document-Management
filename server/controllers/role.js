const models = require('../models');

const Role = models.Role;
module.exports = {
  /**
   *
   *
   * @param {any} req
   * @param {any} res
   */
  create(req, res) {
    Role
      .create({
        title: req.body.title
      })
      .then(
        role => res.status(201).send(role))
       .catch(error => res.status(400).send({
         message: `This Role could not be created ${error}` }));
  },
  /**
   *
   *
   * @param {any} req
   * @param {any} res
   * @returns
   */
  getAll(req, res) {
    return Role.findAll({})
      .then(roles => res.status(201).send(roles))
  }
};

