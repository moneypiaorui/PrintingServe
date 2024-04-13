const express = require('express');
const multer = require('multer');
const authMiddleware = require('../components/authMiddleware');
const jwt = require('jsonwebtoken');
const db = require("../components/database");

const uploadRouter = express.Router();

// 设置文件上传
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function (req, file, cb) {
        // cb(null, Date.now() + '-' + file.originalname);
        cb(null,  file.originalname);
    }
});
const upload = multer({ storage: storage });

// 上传文件
uploadRouter.post('/',authMiddleware, upload.single('file'), (req, res) => {
    // 从请求头中获取令牌 
    const token = req.header("Authorization")
    const {username} = jwt.verify(token, 'secret_key');
    const filename = req.file.filename;
    db.run(`INSERT INTO files (filename, username) VALUES (?, ?)`, [filename, username], function(err) {
        if (err) {
            res.status(500).send(err.message);
        } else {
            // res.send();
            res.status(200).send(req.file.filename);
        }
    });
});

module.exports = uploadRouter;
