const tasksRepo = require('./task.memory.repository');
// const { createtask } = require('./task.model');

const update = async (id, newdata) => {
  const tasks = await tasksRepo.getAll();
  const task = tasksRepo.getById(tasks, id);
  return await tasksRepo.update(tasks, task, newdata);
};

const remove = async id => {
  const tasks = await tasksRepo.getAll();
  const task = tasksRepo.getById(tasks, id);
  if (!task) {
    return false;
  }
  await tasksRepo.remove(tasks, id);
  return await tasksRepo.getAll();
};

module.exports = {
  getAll: tasksRepo.getAll,
  pushNew: tasksRepo.pushNew,
  getById: tasksRepo.getById,
  update,
  remove
};
