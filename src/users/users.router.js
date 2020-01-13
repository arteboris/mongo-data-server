const { Router } = require('express');
const usersVallidator = require('./users.vallidator');
const usersController = require('./users.controller');

const router = Router();

router
.get('/', usersVallidator.sendUsers,
usersController.sendUsers)
.get('/:id', usersController.sendUserId)
.post('/', usersVallidator.createUser,
usersController.createUser)
.delete('/:id', usersController.deleteUserId)
.put('/:id', usersVallidator.updateUserId,
usersController.updateUserId);

module.exports = router;