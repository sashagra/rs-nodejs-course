const path = require('path');
const fs = require('fs');

const p = path.join(__dirname, 'users.json');

module.exports = {
  getAll: async () => {
    // TODO: mock implementation. should be replaced during task development
    return new Promise((resolve, reject) => {
      fs.readFile(p, 'utf-8', (err, content) => {
        if (err) {
          reject(err);
        } else resolve(JSON.parse(content));
      });
    });
  },

  pushNew: async (user, users) => {
    users.push(user);

    return new Promise((resolve, reject) => {
      fs.writeFile(p, JSON.stringify(users), err => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  },
  async getById(users, id) {
    return users.find(c => c.id === id || false);
  },
  async update(users, user, newData) {
    const idx = users.findIndex(c => c.id === user.id);
    users[idx].name = newData.name;
    users[idx].login = newData.login;
    users[idx].password = newData.password;
    return new Promise((resolve, reject) => {
      fs.writeFile(p, JSON.stringify(users), err => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  },
  async remove(users, id) {
    users = users.filter(c => c.id !== id);

    return new Promise((resolve, reject) => {
      fs.writeFile(p, JSON.stringify(users), err => {
        if (err) {
          reject(err);
        } else {
          resolve(users);
        }
      });
    });
  }
};
