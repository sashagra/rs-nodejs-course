const router = require('express').Router();
const taskRouter = require('../tasks/task.router');
const { createBoard } = require('./board.model');
const boardService = require('./board.service');

router.use(
  '/:id/tasks/',
  (req, res, next) => {
    req.boardId = req.params.id;
    next();
  },
  taskRouter
);

router.route('/').get(async (req, res) => {
  const boards = await boardService.getAll();
  if (boards.length < 1) {
    res.status(404).send('Boards not found');
  } else {
    res.json(boards);
  }
});

router.route('/').post(async (req, res) => {
  const boards = await boardService.getAll();
  const newBoard = await createBoard(req.body);
  boardService.pushNew(newBoard, boards);
  res.json(newBoard);
});

router.route('/:id').get(async (req, res) => {
  const boards = await boardService.getAll();
  const board = boardService.getById(boards, req.params.id);
  if (!board) {
    res.status(404).send('Board not found');
  } else {
    res.json(board);
  }
});

router.route('/:id').put(async (req, res) => {
  const board = boardService.update(req.params.id, req.body);

  if (!board) {
    res.status(404).send('Board not found');
  } else {
    res.json(board);
  }
});

router.route('/:id').delete(async (req, res) => {
  const isDeleted = await boardService.remove(req.params.id);

  if (!isDeleted) {
    res.status(404).send('Board not found');
  } else {
    res.status(204).end();
  }
});

module.exports = router;
