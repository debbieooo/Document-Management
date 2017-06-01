const models = require('../models');
const Users = require('../models/user');

const Role = models.Role;
// console.log('roles ', Role);
module.exports = {
  create(req, res) {
    // console.log(req)
    Role
      .create({
        title: req.body.title,
      })
      .then(
        // console.log('we are here');
        role => res.status(201).send(role))
       .catch(error => res.status(400).send({
         message: `This Role could not be created ${error}` }));
  },
  getAll(req, res) {
    return Role.findAll({})
      .then(roles => res.status(201).send(roles))
      .catch(error => res.status(400).send({
        message: 'No roles found'
      }));
  },
  listAll(req, res) {
    return Role
     .findAll({
       include: [{
         model: Users,
         as: 'users',
       }],
     })
     .then(roles => res.status(200).send(roles))
     .catch(error => res.status(400).send(error));
  },
  // update(req,res) {
  //   return Roles
  //   .findById(req.params.roleId, {
  //     include: [{
  //       model: Users,
  //       as: 'users',
  //     }],
  //   })
  //   .then(roles => {
  //     if (!roles) {
  //       return res.status(404).send({
  //         message:'Not Found',
  //       });
  //     }
  //     return roles
  //     .update({
  //       title: req.body.title || roles.title
  //     })
  //     .then(() => res.status(200).send(roles))
  //     .catch((error) => res.status(400).send(error));
  //   })
  //   .catch((error) => res.status(400).send(error));
  // },
  destroy(req, res) {
    return Role
    .findById(req.params.roleId)
    .then((roles) => {
      if (!roles) {
        return res.status(400).send({
          message: 'Roles Not Found'
        });
      }
      return roles
      .destroy()
      .then(() => res.status(200).send({
        message: 'Role deleted successfully'
      }))
      .catch(error => res.status(400).send(error));
    })
    .catch(error => res.status(400).send({
      message: 'Bad request'
    }));
  }
};

