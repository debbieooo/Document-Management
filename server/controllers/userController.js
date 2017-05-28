const Users = require('../models').userModel;
const Roles = require('../models').roleModel;
const Docs = require('../models/docmodel').docModel;

module.exports = {
  create(req, res) {
    return Users
      .create({
        title: req.body.title,
      })
      .then(users => res.status(201).send(users))
      .catch(error => res.status(400).send(error));
  },
  listAll(req,res){
    return Users
    .findAll({
      include: [{
        model: Docs,
        as: 'docs',
      }],
    })
    .then(users => res.status(200).send(users))
    .catch(error => res.status(400).send(error));
  },
  update(req,res) {
    return Users
    .findById(req.params.userId, {
      include: [{
        model: Docs,
        as: 'docs',
      }],
    })
    .then(users => {
      if (!users) {
        return res.status(404).send({
          message:'Not Found',
        });
      }
      return users
      .update({
        roleId: req.body.roleId || user.roleId,
        userName: req.body.userName || user.userName,
        name: req.body.name || user.name,
        password: req.body.password || user.password,  
      })
      .then(() => res.status(200).send(roles))
      .catch((error) => res.status(400).send(error));
    })
    .catch((error) => res.status(400).send(error));
  },
  destroy(req, res){
    return Users 
    .findById(req.params.userId)
    .then(user => {
      if(!user) {
        return res.status(400).send({
          message: 'User Not Found'
        });
      }
      return user
      .destroy()
      .then(() => res.status(200).send({message: 'User deleted successfully'}))
      .catch(error => res.status(400).send(error));
    })
    .catch(error => res.status(400).send({message: 'Bad request'}));
  }
};