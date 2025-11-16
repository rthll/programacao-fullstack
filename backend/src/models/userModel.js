import { mockDB } from "../config/databaseMock.js";

class UserModel {
  static findByUsername(username) {
    return mockDB.users.find(u => u.username === username);
  }

  static createUser(username, password) {
    const newUser = {
      id: mockDB.users.length + 1,
      username,
      password
    };
    mockDB.users.push(newUser);
    return newUser;
  }
}

export default UserModel;
