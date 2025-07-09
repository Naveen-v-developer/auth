const db = require("../config/db");

const createUser = (username, email, password, callback) => {
  const sql = "INSERT INTO usersdb (username, email, password) VALUES (?, ?, ?)";
  db.query(sql, [username, email, password], callback);
};

const findUserByEmail = (email, callback) => {
  const sql = "SELECT * FROM usersdb WHERE email = ?";
  db.query(sql, [email], callback);
};

module.exports = { createUser, findUserByEmail };
