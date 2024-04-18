const express = require('express');
const multer = require('multer');
const authMiddleware = require('../components/authMiddleware');
const db = require("../components/database");

const uploadRouter = express.Router();

// 设置文件上传
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function (req, file, cb) {
        // cb(null, Date.now() + '-' + file.originalname);
        cb(null,  decodeURIComponent(file.originalname));
    }
});
const upload = multer({ storage: storage });

// 上传文件
uploadRouter.post('/',authMiddleware, upload.single('file'), (req, res) => {
    const filename = req.file.filename;
    console.log("存储文件："+filename);
    db.run(`INSERT INTO files (filename, username) VALUES (?, ?)`, [filename, req.username], function(err) {
        if (err) {
            res.status(500).send(err.message);
        } else {
            // res.send();
            res.status(200).json({message:"文件上传成功",filename:req.file.filename});
        }
    });
});

module.exports = uploadRouter;
