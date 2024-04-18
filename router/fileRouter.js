const express = require('express');
const multer = require('multer');
const authMiddleware = require('../components/authMiddleware');
const jwt = require('jsonwebtoken');
const db = require("../components/database");
const fs = require('fs');
const path = require('path');

const fileListRouter = express.Router();
// 获取用户文件列表
fileListRouter.get('/all', authMiddleware, (req, res) => {
    db.all(`SELECT * FROM files WHERE username = ?`, [req.username], (err, rows) => {
        if (err) {
            res.status(500).send(err.message);
        } else {
            const fileList = rows.map(row => { return { filename: row.filename } });
            res.status(200).json(fileList);
        }
    });
});

// 删除文件
fileListRouter.post('/delete', authMiddleware, (req, res) => {
    const filename = req.body.filename;
    // 从数据库中删除文件信息
    db.run("DELETE FROM files WHERE filename = ?", [filename], function (err) {
        if (err) {
            return res.status(500).send(err.message);
        }
        // 删除数据表后，删除文件夹中对应的文件
        const filePath = path.join(__dirname, '../uploads', filename); // 文件存储在 uploads 文件夹下
        fs.unlink(filePath, (err) => {
            if (err) {
                console.error('删除文件时出错:', err);
            } else {
                res.json({ message: '删除成功' });
                console.log('成功删除文件:', filePath);
            }
        });
    });


});


module.exports = fileListRouter;