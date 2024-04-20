const express = require('express');
const multer = require('multer');
const authMiddleware = require('../components/authMiddleware');
const db = require("../components/database");
const fs = require('fs');
const path = require('path');

const uploadRouter = express.Router();

// 设置文件上传
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function (req, file, cb) {
        const timestamp = Date.now(); // 获取当前时间戳
        const decodedFilename = decodeURIComponent(file.originalname); // 解码文件名
        
        // 将时间戳和原始文件名作为文件对象的一个属性
        file.timestamp = timestamp;
        file.originalname = decodedFilename;

        cb(null, timestamp + '-' + decodedFilename);
    }
});
const upload = multer({ storage: storage });

// 上传文件
uploadRouter.post('/', authMiddleware, upload.single('file'), (req, res) => {
    const{filename,timestamp,originalname} = req.file;
    console.log("存储文件：" + filename);
    db.run(`INSERT INTO files (filename, username, timestamp) VALUES (?, ?, ?)`, [originalname, req.username, timestamp], function (err) {
        if (err) {
            const filePath = path.join(__dirname, '../uploads', filename); // 文件存储在 uploads 文件夹下
            fs.unlink(filePath, (err) => {
                if (err) {
                } else {
                }
            });
            res.status(500).send(err.message);
        } else {
            // res.send();
            res.status(200).json({filename:originalname,timestamp,username:req.username});
        }
    });
});

module.exports = uploadRouter;
