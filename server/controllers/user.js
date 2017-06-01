const Users = require('../models').User;
// const Roles = require('../models').Role;
const Docs = require('../models').Doc;

module.exports = {
  create(req, res) {
    console.log(req.body);
    return Users
      .create({
        userName: req.body.userName,
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        roleId: req.body.roleId ? req.body.roleId : 2
      })
      .then(users => res.status(201).send(users))
      .catch(error => res.status(400).send(error));
  },
  listAll(req, res) {
    return Users
     .findAll({
     })
     .then(users => res.status(200).send(users))
     .catch(error => res.status(400).send(error));
  },
  // update(req, res) {
  //   return Users
  //   .findById(req.params.userId, {
  //     include: [{
  //       model: Docs,
  //       as: 'docs',
  //     }],
  //   })
  //   .then((users) => {
  //     if (!users) {
  //       return res.status(404).send({
  //         message: 'Not Found',
  //       });
  //     }
  //     return users
  //     .update({
  //       roleId: req.body.roleId || user.roleId,
  //       userName: req.body.userName || user.userName,
  //       name: req.body.name || user.name,
  //       password: req.body.password || user.password,
  //     })
  //     .then(() => res.status(200).send(roles))
  //     .catch((error) => res.status(400).send(error));
  //   })
  //   .catch((error) => res.status(400).send(error));
  // },
  destroy(req, res) {
    return Users
     .find({ where: { userName: req.params.userName }})
     .then((user) => {
       if (!user) {
         return res.status(400).send({
           message: 'User Not Found'
         });
       }
       return user
       .destroy()
       .then(() => res.status(200).send({
         message: 'User deleted successfully'
       }))
       .catch(error => res.status(400).send(error));
     })
     .catch(error => res.status(400).send({ message: 'Bad request' }));
  }
};
