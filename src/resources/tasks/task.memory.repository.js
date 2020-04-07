const path = require('path');
const fsPr = require('fs').promises;

const p = path.join(__dirname, '..', 'data', 'tasks.json');

module.exports = {
  getAllInBoard: async boardId => {
    const data = await fsPr.readFile(p, 'utf-8');
    return JSON.parse(data).filter(c => c.boardId === boardId) || [];
  },

  pushNew: async task => {
    const data = await fsPr.readFile(p, 'utf-8');
    const tasks = JSON.parse(data);
    tasks.push(task);
    await fsPr.writeFile(p, JSON.stringify(tasks));
    return tasks[tasks.length - 1];
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
  async update(tasks, task, newData) {
    const idx = tasks.findIndex(c => c.id === task.id);
    tasks[idx].title = newData.title;
    await fsPr.writeFile(p, JSON.stringify(tasks));
    return tasks[idx];
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
