const express = require('express');
const multer = require('multer');
const sqlite3 = require('sqlite3').verbose();
const authMiddleware = require('../components/authMiddleware');
const jwt = require('jsonwebtoken');
const db = require("../components/database");

const fileListRouter = express.Router();
// 获取用户文件列表
fileListRouter.get('/',authMiddleware, (req, res) => {
    const token = req.header("Authorization")
    const {username} = jwt.verify(token, 'secret_key');
    db.all(`SELECT * FROM files WHERE username = ?`, [username], (err, rows) => {
        if (err) {
            res.status(500).send(err.message);
        } else {
            const fileList = rows.map(row => {return {fileName:row.filename}});
            res.status(200).json(fileList);
        }
    });
});

module.exports = fileListRouter;