const path = require('path');
const fsPr = require('fs').promises;
const { unassignTasks } = require('../tasks/task.memory.repository');

const p = path.join(__dirname, '..', 'data', 'users.json');

module.exports = {
  getAll: async () => {
    const data = await fsPr.readFile(p, 'utf-8');
    return JSON.parse(data);
  },

  pushNew: async (user, users = []) => {
    users.push(user);
    await fsPr.writeFile(p, JSON.stringify(users));
  },

  getById(users, id) {
    return users.find(c => c.id === id || false);
  },
  async update(users, user, newData) {
    const idx = users.findIndex(c => c.id === user.id);
    if (newData.name) {
      users[idx].name = newData.name;
    }
    if (newData.login) {
      users[idx].login = newData.login;
    }
    if (newData.password) {
      users[idx].password = newData.password;
    }

    await fsPr.writeFile(p, JSON.stringify(users));
  },
  async remove(id) {
    let users = await this.getAll();
    users = users.filter(c => c.id !== id);
    const idx = users.findIndex(el => el.id === id);
    if (idx < 0) {
      return false;
    }
    users.splice(idx, 1);
    await fsPr.writeFile(p, JSON.stringify(users));
    await unassignTasks(id);

    return true;
  }
};
