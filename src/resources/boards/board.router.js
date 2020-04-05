const router = require('express').Router();
const { createBoard } = require('./board.model');
const boardService = require('./board.service');

router.route('/').get(async (req, res) => {
  const boards = await boardService.getAll();
  if (boards.length < 1) {
    res.status(404).send('Bards not found');
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
  // if (!board) {
  //   res.status(404).send('Board not found');
  // } else {
  //   res.json(board);
  // }
  res.json(board);
});

router.route('/:id').put(async (req, res) => {
  const boards = await boardService.getAll();
  const board = await boardService.getById(boards, req.params.id);

  if (!board) {
    res.status(404).send('Board not found');
  } else {
    await boardService.update(boards, board, req.body);
    res.json(board);
  }
});

// router.route('/:id').delete(async (req, res) => {
//   const users = await usersService.getAll();
//   const user = await usersService.getById(users, req.params.id);

//   if (!User.toResponse(user)) {
//     res.status(404).send('User not found');
//   } else {
//     await usersService.remove(users, req.params.id);
//     res.status(204).send('The user has been deleted');
//   }
// });

module.exports = router;
