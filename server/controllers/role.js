const models = require('../models');

const Role = models.Role;
module.exports = {
  /**
   *
   *
    * @param {any} req request
   * @param {any} res response
   * @returns {null} nothing
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
    * @param {any} req request
   * @param {any} res response
   * @returns {null} nothing
   */
  getAll(req, res) {
    return Role.findAll({})
      .then(roles => res.status(201).send(roles));
  }
};

