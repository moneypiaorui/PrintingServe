const express = require('express');
const multer = require('multer');
const bodyParser = require('body-parser');
const cors = require('cors');
const fileWatcher = require('./components/fileWatcher.js');
const upload_router = require('./router/uploadRouter');
const flieRouter = require('./router/fileRouter.js');
const print_router = require('./router/printRouter');
const users_router = require('./router/users.js');
const protected_router = require('./protectedRouter');
const vertify_router = require('./router/vertify.js')
const manageRouter = require('./router/manageRouter.js')
const logsRouter = require('./router/logsRouter.js')
const backgroud = require('./components/backgroud.js')

const authMiddleware = require('./components/authMiddleware');
const fs = require('fs');

const app = express();
app.use(cors());



// 设置静态文件目录
app.use(express.static('public'));

// 使用 body-parser 中间件解析请求体
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/backgroud',backgroud);
app.use('/users', users_router);

app.use(authMiddleware, (req, res, next) => {
    const log = `${new Date()} ${req.username} ${req.url}\n`;
    fs.appendFile('print_logs.txt', log, (err) => {
        if (err) console.error(err);
    });
    next();
});

app.use('/protected', protected_router);
// 上传
app.use('/upload', upload_router);
// 打印
app.use('/print', print_router);
// 获取文件列表
app.use('/files', flieRouter);
// token认证获取username
app.use('/vertify',vertify_router);
// 管理路由
app.use('/manage',manageRouter);
// 日志查询
app.use('/logs',logsRouter);


// 启动服务器
app.listen(3000, () => {
    console.log('服务器已启动，监听端口 3000');
});
