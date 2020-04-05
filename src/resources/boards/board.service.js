const boardsRepo = require('./board.memory.repository');

module.exports = {
  getAll: boardsRepo.getAll,
  pushNew: boardsRepo.pushNew,
  getById: boardsRepo.getById,
  update: boardsRepo.update,
  remove: boardsRepo.remove
};
