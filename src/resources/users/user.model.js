const uuid = require('uuid');

class User {
  constructor({
    id = uuid(),
    name = 'USER',
    login = 'user',
    password = 'P@55w0rd'
  } = {}) {
    this.id = id;
    this.name = name;
    this.login = login;
    this.password = password;
  }

  static toResponse(user) {
    if (!user) {
      return false;
    }
    const { id, name, login } = user;
    return { id, name, login };
  }
}

module.exports = User;
