const models = require('../models');

const Role = models.Role;
module.exports = {
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
  getAll(req, res) {
    return Role.findAll({})
      .then(roles => res.status(201).send(roles))
      .catch(error => res.status(400).send({
        error,
        message:  `No Roles Found ${error}`
      }));
  }
};

