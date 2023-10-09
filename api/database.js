const mysql = require("mysql2/promise");

async function createConnection() {
  const connection = await mysql.createConnection({
    host: "localhost", // Replace with your database host
    user: "root", // Replace with your database username
    password: "pwfq7uz01p", // Replace with your database password
    database: "blogDB", // Replace with your database name
  });

  return connection;
}


module.exports = createConnection;
