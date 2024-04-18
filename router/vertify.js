const express = require('express');
const jwt = require('jsonwebtoken');
const authMiddleware = require('../components/authMiddleware')

const vertifyRouter  =express.Router();

vertifyRouter.get('/',authMiddleware, (req, res)=>{
    const token = req.header("Authorization")
    const {username} = jwt.verify(token, 'secret_key');
    res.status(200).json({username});
    console.log("用户"+username+"自动登录")
})

module.exports = vertifyRouter