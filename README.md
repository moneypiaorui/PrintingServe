# self-service printing
自助打印系统，用户在网页上登录账号，上传文件，然后支付打印费，打印机自动打印

## 技术栈
~后端是nodejs写的，数据库使用轻量化的SQLite，密码Hash之后保存在数据库，使用了token来持久化登录状态
~app.js注册router内所有的路由，users.js负责处理注册和登录，vertify处理token的认证，uploadRouter将上传的文件写入uploads文件夹并在数据库写入文件信息
~component内authMiddleware是token认证中间件，database注册数据库接口，fileWatcher监视uploads文件夹的变化并做出相应处理（还没写处理）
