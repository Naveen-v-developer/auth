// runQuery.js
const db = require("./config/db");

const createTableQuery = `
CREATE TABLE IF NOT EXISTS usersdb (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL
);
`;

db.query(createTableQuery, (err, result) => {
  if (err) {
    console.error("❌ Failed to create table:", err);
  } else {
    console.log("✅ usersdb table created or already exists");
  }
  db.end(); // close connection
});
