const path = require('path');
const fsPr = require('fs').promises;
const Task = require('./task.model');

const p = path.join(__dirname, '..', 'data', 'tasks.json');

module.exports = {
  getAllInBoard: async boardId => {
    const data = await fsPr.readFile(p, 'utf-8');
    return JSON.parse(data).filter(c => c.boardId === boardId) || [];
  },

  pushNew: async data => {
    const newTask = new Task(data);
    const tasks = JSON.parse(await fsPr.readFile(p, 'utf-8'));
    tasks.push(newTask);
    await fsPr.writeFile(p, JSON.stringify(tasks));
    return newTask;
  },

  async getById(boardId, taskId) {
    let tasks;
    if (!boardId) {
      const data = await fsPr.readFile(p, 'utf-8');
      tasks = JSON.parse(data);
    } else {
      tasks = await this.getAllInBoard(boardId);
    }
    const task = tasks.find(c => c.id === taskId);
    return task;
  },

  // const updateTask = async (boardId, taskId, task) => {
  //   const currentTask = await getTask(boardId, taskId);
  //   const taskIndex = tasks.findIndex(el => el.id === taskId);
  //   const updatedTask = { ...currentTask, ...task };
  //   tasks.splice(taskIndex, 1, updatedTask);
  //   return updatedTask;
  // };

  async update(boardId, taskId, newData) {
    const data = await fsPr.readFile(p, 'utf-8');
    const tasks = JSON.parse(data);
    const task = await this.getById(boardId, taskId);

    const idx = tasks.findIndex(c => c.id === task.id);
    const updatedTask = { ...task, ...newData };
    tasks.splice(idx, 1, updatedTask);
    await fsPr.writeFile(p, JSON.stringify(tasks));
    return updatedTask;
  },
  async removeOne(tasks, id) {
    tasks = tasks.filter(c => c.id !== id);
    await fsPr.writeFile(p, JSON.stringify(tasks));
  },
  async removeAllForBoard(boardId) {
    const data = await fsPr.readFile(p, 'utf-8');
    let tasks = JSON.parse(data);
    tasks = tasks.filter(c => c.boardId !== boardId);
    await fsPr.writeFile(p, JSON.stringify(tasks));
  },
  async unassignTasks(userId) {
    const data = await fsPr.readFile(p, 'utf-8');
    const tasks = JSON.parse(data);
    tasks.forEach(task => {
      if (task.userId === userId) task.userId = null;
    });
  }
};
