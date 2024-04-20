const express = require('express');
const multer = require('multer');
const authMiddleware = require('../components/authMiddleware');
const db = require("../components/database");
const fs = require('fs');
const path = require('path');

const fileListRouter = express.Router();
// 获取用户文件列表
fileListRouter.get('/allFiles', authMiddleware, (req, res) => {
    db.all(`SELECT * FROM files WHERE username = ?`, [req.username], (err, rows) => {
        if (err) {
            res.status(500).send(err.message);
        } else {
            res.status(200).json(rows);
        }
    });
});

// 删除文件
fileListRouter.post('/delete', authMiddleware, (req, res) => {
    const {timestamp,filename} = req.body;
    const completeFilename = `${timestamp}-${filename}`;
    // 从数据库中删除文件信息
    db.run("DELETE FROM files WHERE timestamp = ?", [timestamp], function (err) {
        if (err) {
            return res.status(500).send(err.message);
        }
        // 删除数据表内容后，删除文件夹中对应的文件
        const filePath = path.join(__dirname, '../uploads', completeFilename); // 文件存储在 uploads 文件夹下
        fs.unlink(filePath, (err) => {
            if (err) {
                console.error('删除文件时出错:', err);
            } else {
                res.json({ message: '删除成功' });
                console.log('成功删除文件:', filename);
            }
        });
    });


});


module.exports = fileListRouter;