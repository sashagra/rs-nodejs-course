const usersRepo = require('./user.memory.repository');

const getAll = () => usersRepo.getAll();

module.exports = {
  getAll,
  pushNew: usersRepo.pushNew,
  getById: usersRepo.getById,
  update: usersRepo.update,
  remove: usersRepo.remove
};
