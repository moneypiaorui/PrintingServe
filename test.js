
const express = require('express');
const multer = require('multer');
const sqlite3 = require('sqlite3').verbose();
const authMiddleware = require('./components/authMiddleware');
const jwt = require('jsonwebtoken');
const db = require("./components/database");


const app = express.Router();





// 注册新用户
app.post('/register', (req, res) => {
    const { username, password } = req.body;
    db.get(`SELECT * FROM users WHERE username = ?`, [username], function (err, row) {
        if (err) {
            console.error(err.message);
            return;
        }
        if (row) {
            console.log(`用户名已存在`);
        } else {
            db.run(`INSERT INTO users (username, password) VALUES (?, ?)`, [username, bcrypt.hashSync(password, 10)], function (err) {
                if (err) {
                    res.status(500).send(err.message);
                } else {
                    res.status(200).send("注册成功");
                }
            });
        }
    })
});

// 用户登录
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    db.get(`SELECT * FROM users WHERE username = ?`, [username], function (err, row) {
        if (err) {
            res.status(500).send(err.message);
            return;
        }
        if (!row) {
            res.status(409).send(`用户不存在`);
        } else {
            // 验证密码
            if (!bcrypt.compareSync(password, row.password)) {
                return res.status(401).json({ message: '用户名或密码错误' });
            }
            // 生成令牌
            const token = jwt.sign({ username: row.username }, 'secret_key', { expiresIn: '24h' });
            res.json({ token });
        }
    })

});


module.exports = app;