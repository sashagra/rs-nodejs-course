const uuid = require('uuid');

class Column {
  constructor({ title = 'Default Column', order = 1 }) {
    this.id = uuid();
    this.title = title;
    this.order = order;
  }
}

class Board {
  constructor({ title = 'Default Board', columns = [] } = {}) {
    this.id = uuid();
    this.title = title;
    this.columns = columns;
  }
}

const createBoard = reqBody => {
  const board = new Board({
    title: reqBody.title,
    columns: reqBody.columns.map(c => new Column(c))
  });
  return board;
};

module.exports = { Board, Column, createBoard };
