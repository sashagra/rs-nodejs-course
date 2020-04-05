const path = require('path');
const fsPr = require('fs').promises;
const { Column } = require('./board.model');

const p = path.join(__dirname, 'boards.json');

module.exports = {
  getAll: async () => {
    const data = await fsPr.readFile(p, 'utf-8');
    return JSON.parse(data);
  },

  pushNew: async (board, boards = []) => {
    boards.push(board);
    await fsPr.writeFile(p, JSON.stringify(boards));
  },

  getById(boards, id) {
    return boards.find(c => c.id === id || false);
  },
  async update(boards, board, newData) {
    const idx = boards.findIndex(c => c.id === board.id);
    boards[idx].title = newData.title;
    if (newData.columns.length > 0) {
      newData.columns.forEach(element => {
        boards[idx].columns.push(new Column(element));
      });
    }
    await fsPr.writeFile(p, JSON.stringify(boards));
  }
  //   async remove(users, id) {
  //     users = users.filter(c => c.id !== id);

  //     await fsPr.writeFile(p, JSON.stringify(users));
  //   }
};
