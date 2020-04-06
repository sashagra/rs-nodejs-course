const router = require('express').Router();
const { createtask } = require('./task.model');
const taskService = require('./task.service');

router.route('/').get(async (req, res) => {
  const tasks = await taskService.getAll();
  if (tasks.length < 1) {
    res.status(404).send('Boards not found');
  } else {
    res.json(tasks);
  }
});

router.route('/').post(async (req, res) => {
  const tasks = await taskService.getAll();
  const newtask = await createtask(req.body);
  taskService.pushNew(newtask, tasks);
  res.json(newtask);
});

router.route('/:id').get(async (req, res) => {
  const tasks = await taskService.getAll();
  const task = taskService.getById(tasks, req.params.id);
  if (!task) {
    res.status(404).send('task not found');
  } else {
    res.json(task);
  }
  // res.json(task);
});

router.route('/:id').put(async (req, res) => {
  const task = taskService.update(req.params.id, req.body);

  if (!task) {
    res.status(404).send('task not found');
  } else {
    res.json(task);
  }
});

router.route('/:id').delete(async (req, res) => {
  const isDeleted = await taskService.remove(req.params.id);
  console.log('Del', isDeleted);

  if (!isDeleted) {
    res.status(404).send('task not found');
  } else {
    // res.status(204).send('The task has been deleted');
    res.json(isDeleted);
  }
});

module.exports = router;
