const Roles = require('../models').roleModel;
const Users = require('../models').userModel;
module.exports = {
  create(req, res) {
    return Roles
      .create({
        title: req.body.title,
      })
      .then(roles => res.status(201).send(roles))
      .catch(error => res.status(400).send(error));
  },
    listAll(req,res){
    return Roles
    .findAll({
      include: [{
        model: Users,
        as: 'users',
      }],
    })
    .then(roles => res.status(200).send(roles))
    .catch(error => res.status(400).send(error));
  },
  update(req,res) {
    return Roles
    .findById(req.params.roleId, {
      include: [{
        model: Users,
        as: 'users',
      }],
    })
    .then(roles => {
      if (!roles) {
        return res.status(404).send({
          message:'Not Found',
        });
      }
      return roles
      .update({
        title: req.body.title || roles.title
      })
      .then(() => res.status(200).send(roles))
      .catch((error) => res.status(400).send(error));
    })
    .catch((error) => res.status(400).send(error));
  },
  destroy(req, res){
    return Roles 
    .findById(req.params.roleId , {
      include: [{
        model: Users,
        as: 'users',
      }],
    })
    .then(roles => {
      if(!roles) {
        return res.status(400).send({
          message: 'Roles Not Found'
        });
      }
      return roles
      .destroy()
      .then(() => res.status(200).send({message: 'Role deleted successfully'}))
      .catch(error => res.status(400).send(error));
    })
    .catch(error => res.status(400).send({message: 'Bad request'}));
  }
};

