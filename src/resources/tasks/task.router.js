const router = require('express').Router();
const taskService = require('./task.service');

router.route('/').get(async (req, res) => {
  const tasks = await taskService.getAllInBoard(req.boardId);
  if (tasks.length < 1) {
    res.status(404).send('Tasks not found');
  } else {
    res.json(tasks);
  }
});

router.route('/').post(async (req, res) => {
  const newTask = await taskService.pushNew(req.body, req.boardId);
  if (!newTask) {
    res.status(400).send('Bad request');
  } else {
    res.json(newTask);
  }
});

router.route('/:id').get(async (req, res) => {
  const task = await taskService.getById(req.boardId, req.params.id);
  console.log('getById task:', task);
  console.log('boardId:', req.boardId);
  console.log('taskId:', req.params.id);
  if (!task) {
    res.status(404).send('Task not found');
  } else {
    res.json(task);
  }
});

router.route('/:id').delete(async (req, res) => {
  const isDeleted = await taskService.removeOne(req.boardId, req.params.id);
  if (!isDeleted) {
    res.status(404).send('Task not found');
  } else {
    res.status(204).end();
  }
});

// router.route('/:id').put(async (req, res) => {
//   const task = taskService.update(req.params.id, req.body);

//   if (!task) {
//     res.status(404).send('task not found');
//   } else {
//     res.json(task);
//   }
// });

// router.route('/:id').delete(async (req, res) => {
//   const isDeleted = await taskService.remove(req.params.id);
//   console.log('Del', isDeleted);

//   if (!isDeleted) {
//     res.status(404).send('task not found');
//   } else {
//     // res.status(204).send('The task has been deleted');
//     res.json(isDeleted);
//   }
// });

module.exports = router;
