const boardsRepo = require('./board.memory.repository');
const taskService = require('../tasks/task.service');
// const { createBoard } = require('./board.model');

const update = async (id, newdata) => {
  const boards = await boardsRepo.getAll();
  const board = boardsRepo.getById(boards, id);
  return await boardsRepo.update(boards, board, newdata);
};

const remove = async id => {
  const boards = await boardsRepo.getAll();
  const board = boardsRepo.getById(boards, id);
  if (!board) {
    return false;
  }
  await taskService.removeTasks(id);
  await boardsRepo.remove(boards, id);
  return (await boardsRepo.getAll()) || [];
};

module.exports = {
  getAll: boardsRepo.getAll,
  pushNew: boardsRepo.pushNew,
  getById: boardsRepo.getById,
  update,
  remove
};
