const path = require('path');
const fsPr = require('fs').promises;

const p = path.join(__dirname, '..', 'data', 'tasks.json');

module.exports = {
  getAll: async boardId => {
    const data = await fsPr.readFile(p, 'utf-8');
    return JSON.parse(data).filter(c => c.boardId === boardId) || [];
  }

  // pushNew: async (task, tasks = []) => {
  //   tasks.push(task);
  //   await fsPr.writeFile(p, JSON.stringify(tasks));
  // },

  // getById(tasks, id) {
  //   const task = tasks.find(c => c.id === id);
  //   return task;
  // },
  // async update(tasks, task, newData) {
  //   const idx = tasks.findIndex(c => c.id === task.id);
  //   tasks[idx].title = newData.title;
  //   await fsPr.writeFile(p, JSON.stringify(tasks));
  //   return tasks[idx];
  // },
  // async remove(tasks, id) {
  //   tasks = tasks.filter(c => c.id !== id);
  //   await fsPr.writeFile(p, JSON.stringify(tasks));
  // }
};
