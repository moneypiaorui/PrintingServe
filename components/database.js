const sqlite3 = require('sqlite3').verbose();

// 连接到 SQLite 数据库
const db = new sqlite3.Database('user.db', (err) => {
    if (err) {
        console.error("Error opening database:", err.message);
        return;
    }
    console.log("Connected to the SQLite database.");
});

db.serialize(() => {
    db.run("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, username TEXT, password TEXT)");
});

// 创建文件表
db.serialize(() => {
    db.run("CREATE TABLE IF NOT EXISTS files (id INTEGER PRIMARY KEY, filename TEXT, username TEXT, FOREIGN KEY(username) REFERENCES users(username))");
});

module.exports = db;