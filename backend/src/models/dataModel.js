import { mockDB } from "../config/databaseMock.js";

class DataModel {
  static insert(userId, value) {
    const record = {
      id: mockDB.data.length + 1,
      userId,
      value,
      created_at: new Date().toISOString()
    };

    mockDB.data.push(record);
    return record;
  }

  static findByUser(userId) {
    return mockDB.data.filter(d => d.userId === userId);
  }
}

export default DataModel;
