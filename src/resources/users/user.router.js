const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');

router.route('/').get(async (req, res) => {
  const users = await usersService.getAll();
  res.json(users.map(User.toResponse));
});

router.route('/').post(async (req, res) => {
  const user = new User(req.body);
  const users = await usersService.getAll();
  usersService.pushNew(user, users);
  res.json(User.toResponse(user));
});

router.route('/:id').get(async (req, res) => {
  const users = await usersService.getAll();
  const user = await usersService.getById(users, req.params.id);
  if (!User.toResponse(user)) {
    res.status(404).send('User not found');
  } else {
    res.json(User.toResponse(user));
  }
});

router.route('/:id').put(async (req, res) => {
  const users = await usersService.getAll();
  const user = await usersService.getById(users, req.params.id);

  if (!User.toResponse(user)) {
    res.status(404).send('User not found');
  } else {
    await usersService.update(users, user, req.body);
    res.status(200).send('The user has been updated.');
  }
});

router.route('/:id').delete(async (req, res) => {
  const users = await usersService.getAll();
  const user = await usersService.getById(users, req.params.id);

  if (!User.toResponse(user)) {
    res.status(404).send('User not found');
  } else {
    await usersService.remove(users, req.params.id);
    res.status(204).send('The user has been deleted');
  }
});

module.exports = router;
