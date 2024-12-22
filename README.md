# self-service printing
自助打印系统，用户在网页上登录账号，上传文件，然后支付打印费，打印机自动打印

## 技术栈
### 后端是nodejs写的，数据库使用轻量化的SQLite，密码Hash之后保存在数据库，使用了token来持久化登录状态
- app.js注册router内所有的路由，users.js负责处理注册和登录，vertify处理token的认证，uploadRouter将上传的文件写入uploads文件夹并在数据库写入文件信息
- component内authMiddleware是token认证中间件，database注册数据库接口，fileWatcher监视uploads文件夹的变化并做出相应处理（还没写处理）
### 前端用了VUE和elementUI
- 暂时没有优化到vue-cli项目上，因为不清楚vue-cli如何前后端用一个端口
### 打印使用pdf-to-printer包，只能打印图片和pdf，docx使用libreoffice+office-to-pdf包实现
- https://blog.csdn.net/weixin_40726805/article/details/109165744 可以看这篇文章
- libreoffice 从官网下好后记得配置环境变量保证soffice可以在终端运行
### 可以考虑使用win32com
- python 使用win32com包可以使用Microsoft Office将word另存为pdf
- nodejs可以安装node-gyp+winax使用windows的com

## 遇到的小问题
- Vue无法监视通过数组索引产生的变化,例如visible[0] = 1;不会触发vue响应,但是visible = [1]会触发Vue的响应。
> 这是因为 Vue 使用了 Object.defineProperty 或 Proxy 来劫持对象的属性访问，但是对于数组来说，直接赋值索引并不会触发属性的 setter，因此 Vue 无法得知数组的变化。
- SQLite的外键约束要求约束的父键受唯一约束，UNIQUE或者PRIMARY KEY
- [x] 本来docx转化是想用libreoffice-convert的，但不知道为什么一直报错找不到soffice，明明配置过了环境变量
- attrs 是用于指定元素的属性的一个对象。例如h('a', { attrs: { href: '' } }, '')
- 非脚手架环境中使用h构造VNode需要 const h = this.$createElement;