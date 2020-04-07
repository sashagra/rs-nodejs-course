const tasksRepo = require('./task.memory.repository');
const Task = require('./task.model');

const getAllInBoard = async boardId => {
  const tasks = await tasksRepo.getAllInBoard(boardId);
  return tasks.map(Task.toResponse);
};

const getById = async (boardId, id) => {
  const task = await tasksRepo.getById(boardId, id);
  return task;
};

const pushNew = async (data, idBoard) => {
  const newTask = new Task({ ...data, boardId: idBoard });
  return await tasksRepo.pushNew(newTask);
};

// const update = async (id, newdata) => {
//   const tasks = await tasksRepo.getAll();
//   const task = tasksRepo.getById(tasks, id);
//   return await tasksRepo.update(tasks, task, newdata);
// };

const removeOne = async (boardId, taskId) => {
  const tasks = await tasksRepo.getAllInBoard(boardId);
  const task = await tasksRepo.getById(tasks, taskId);
  if (!task) {
    return false;
  }
  await tasksRepo.removeOne(tasks, taskId);
  return true;
};

const removeTasks = async boardId => {
  await tasksRepo.removeAllForBoard(boardId);
};

module.exports = {
  getAllInBoard,
  pushNew,
  getById,
  removeTasks,
  // update,
  removeOne
};
