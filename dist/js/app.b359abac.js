(function(){var e={9925:function(){},5840:function(e,t,s){"use strict";var a=s(6896),r=function(){var e=this,t=e._self._c;e._self._setupProxy;return t("div",{attrs:{id:"app"}},[t("nav",[t("router-link",{attrs:{to:"/"}},[e._v("Home")]),e._v(" | "),t("router-link",{attrs:{to:"/about"}},[e._v("About")]),e._v("| "),t("router-link",{attrs:{to:"/dashboard"}},[e._v("dashboard")])],1),t("router-view")],1)},i=[],o=s(9925),n=s.n(o),l=n(),u=s(845),c=(0,u.A)(l,r,i,!1,null,null,null),p=c.exports,d=s(8146),m=function(){var e=this,t=e._self._c;return t("div",{staticClass:"container"},[t("h1",[e._v("文件上传和打印")]),t("el-table",{staticStyle:{width:"400px"},attrs:{"highlight-current-row":"",data:e.fileList,"max-height":"250"},on:{"current-change":t=>{e.rFile=t}}},[t("el-table-column",{attrs:{prop:"filename",label:"文件名"}}),t("el-table-column",{attrs:{align:"center",width:"50px",label:"操作"},scopedSlots:e._u([{key:"default",fn:function(s){return[t("el-popover",{attrs:{placement:"top-end",width:"160"},model:{value:e.visible[s.$index],callback:function(t){e.$set(e.visible,s.$index,t)},expression:"visible[scope.$index]"}},[t("p",[e._v("确定删除吗？")]),t("div",{staticStyle:{"text-align":"right",margin:"0"}},[t("el-button",{attrs:{size:"mini",type:"text"},on:{click:function(t){return e.$set(e.visible,s.$index,!1)}}},[e._v("取消")]),t("el-button",{attrs:{type:"danger",size:"mini"},on:{click:function(t){e.$set(e.visible,s.$index,!1),e.handleDelete(s.$index,s.row)}}},[e._v("确定")])],1),t("el-button",{staticClass:"el-icon-delete",attrs:{slot:"reference",size:"mini",type:"danger",circle:""},slot:"reference"})],1)]}}])})],1),t("div",{staticClass:"file-input"},[t("el-upload",{staticClass:"upload-demo",attrs:{limit:e.fileLimit,drag:"",action:"/upload",multiple:"","on-exceed":e.handleExceed,"before-upload":e.beforeUpload,"http-request":e.uploadFile}},[t("i",{staticClass:"el-icon-upload"}),t("div",{staticClass:"el-upload__text"},[e._v("将文件拖到此处，或"),t("em",[e._v("点击上传")])]),t("div",{staticClass:"el-upload__tip",attrs:{slot:"tip"},slot:"tip"},[e._v("只能上传jpg/png/pdf文件，且不超过50mb")])])],1),t("div",{staticClass:"button-container"},[t("el-button",{attrs:{type:"primary",size:"large",icon:"el-icon-printer"},on:{click:e.printFile}}),t("el-button",{attrs:{type:"primary"},on:{click:e.getFileList}},[e._v("所有文件")]),e.isLogin?t("el-button",{attrs:{type:"danger"},on:{click:e.logout}},[e._v("登出")]):t("el-button",{attrs:{type:"primary"},on:{click:e.login}},[e._v("登录")])],1)],1)},h=[],f=(s(4114),{name:"HomeView",data(){return{isLogin:0,username:"",file:null,rFile:{timestamp:null},error:null,fileList:[],fileType:["pdf","txt","png","jpg","bmp","jpeg"],fileSize:50,fileLimit:0,pages:0,visible:[]}},methods:{beforeUpload(e){if(""!=e.type||null!=e.type||void 0!=e.type){const t=e.name.replace(/.+\./,"").toLowerCase(),s=e.size/1024/1024<50;return s?this.fileType.includes(t)?(console.log(`${e.name}文件格式合法`),!0):(this.$message.error("文件格式不正确!"),!1):(this.$message("上传文件大小不能超过 50MB!"),!1)}},handleExceed(){this.$message({type:"warning",message:"超出最大上传文件数量的限制！"})},async uploadFile(e){this.file=e.file;const t=new FormData;t.append("file",this.file,encodeURIComponent(this.file.name));try{const e=await this.$axios.post("/api/upload",t,{headers:{Authorization:localStorage.getItem("token")}});200===e.status?(this.$message({message:"上传成功",type:"success"}),this.fileList.push(e.data)):this.$message.error("上传失败")}catch(s){this.$message.error("上传失败",s)}},async handleDelete(e,t){try{const e=await this.$axios.post("/api/files/delete",t,{headers:{Authorization:localStorage.getItem("token")}});200===e.status?(this.$message({message:"删除成功",type:"success"}),this.fileList=this.fileList.filter((e=>e.timestamp!=t.timestamp)),t.timestamp==this.rFile.timestamp&&(this.rFile={timestamp:null})):this.$message.error("删除失败")}catch(s){}},async printFile(){if(!this.rFile)return this.$message({message:"请先选择文件",type:"warning"});try{const e=await this.$axios.post("/api/print",this.rFile,{headers:{Authorization:localStorage.getItem("token")}});200===e.status?(this.pages=e.data.pages,console.log("pages:"+this.pages),this.$message({message:"打印成功",type:"success"})):this.$message.error("打印失败")}catch(e){console.log(e),this.$message.error("打印失败")}},async login(){this.$router.push({path:"/login"})},async getFileList(){try{const e=await this.$axios.get("/api/files/allFiles",{headers:{Authorization:localStorage.getItem("token")}});200===e.status?(this.$message({message:"文件获取成功",type:"success"}),this.fileList=e.data):this.$message.error("文件获取失败")}catch(e){this.$message.error("文件获取失败")}},logout(){this.$message({message:"退出登录",type:"warning"}),localStorage.removeItem("token"),this.isLogin=0,setTimeout((()=>{location.reload()}),1e3)}},async mounted(){try{const e=await this.$axios.get("/api/vertify",{headers:{Authorization:localStorage.getItem("token")}});200===e.status&&(this.isLogin=1,this.username=e.data.username,this.$message({message:"欢迎登录, 用户"+this.username,type:"success"}),this.getFileList())}catch(e){}}}),g=f,v=s(7207),y=s.n(v),b=(0,u.A)(g,m,h,!1,null,null,null);"function"===typeof y()&&y()(b);var w=b.exports,x=function(){var e=this,t=e._self._c;return t("div",{attrs:{id:"body"}},[t("span",{attrs:{id:"load"}},[e._v("登录")]),t("span",{staticClass:"alert"},[e._v("123")]),t("form",{on:{submit:function(t){return t.preventDefault(),e.login.apply(null,arguments)}}},[t("span",{attrs:{id:"username"}},[t("p",[e._v("账号")]),t("input",{directives:[{name:"model",rawName:"v-model",value:e.username,expression:"username"}],attrs:{type:"text",placeholder:"用户名",required:""},domProps:{value:e.username},on:{input:function(t){t.target.composing||(e.username=t.target.value)}}})]),t("span",{attrs:{id:"password"}},[t("p",[e._v("密码")]),t("input",{directives:[{name:"model",rawName:"v-model",value:e.password,expression:"password"}],attrs:{type:"password",placeholder:"密码",required:""},domProps:{value:e.password},on:{input:function(t){t.target.composing||(e.password=t.target.value)}}})]),t("button",{attrs:{type:"submit",id:"login"}},[e._v("登录")]),t("div",{attrs:{id:"register"},on:{click:e.register}},[t("span",[e._v("账号注册")])])])])},$=[],k={data(){return{username:"",password:""}},mounted(){this.al=document.querySelector(".alert")},methods:{async login(){try{const e=await this.$axios.post("/api/users/login",{username:this.username,password:this.password});this.al.innerHTML="登陆成功",this.showAlert1(),setTimeout((()=>{window.location.href="index.html"}),800),console.log(e.data),localStorage.setItem("token",e.data.token)}catch(e){this.al.innerHTML="登录失败",this.showAlert2(),console.error(e)}},register(){this.$router.push({path:"/register"})},showAlert1(){this.al.style.transition="0s",this.al.style.backgroundColor="rgba(0, 128, 0,0.4)",this.al.style.color="green",this.al.style.transform="translateY(20px)",setTimeout((()=>{this.al.style.transition="0.2s",this.al.style.opacity=1,this.al.style.transform="translateY(0px)"}),1),setTimeout((()=>{this.al.style.opacity=0,this.al.style.transform="translateY(-20px)"}),600)},showAlert2(){this.al.classList.add("shake"),setTimeout((()=>{this.al.classList.remove("shake")}),1e3)}}},_=k,A=(0,u.A)(_,x,$,!1,null,"4bcbc68b",null),F=A.exports,L=function(){var e=this,t=e._self._c;return t("div",{attrs:{id:"body"}},[t("span",{attrs:{id:"load"}},[e._v("注册")]),t("span",{staticClass:"alert"},[e._v("123")]),t("form",{on:{submit:function(t){return t.preventDefault(),e.register.apply(null,arguments)}}},[t("span",{attrs:{id:"username"}},[t("p",[e._v("账号")]),t("input",{directives:[{name:"model",rawName:"v-model",value:e.username,expression:"username"}],attrs:{type:"text",placeholder:"用户名",required:""},domProps:{value:e.username},on:{input:function(t){t.target.composing||(e.username=t.target.value)}}})]),t("span",{attrs:{id:"password"}},[t("p",[e._v("密码")]),t("input",{directives:[{name:"model",rawName:"v-model",value:e.password,expression:"password"}],attrs:{type:"password",placeholder:"输入密码",required:""},domProps:{value:e.password},on:{input:function(t){t.target.composing||(e.password=t.target.value)}}})]),t("span",{attrs:{id:"check"}},[t("p",[e._v("再次输入密码")]),t("input",{directives:[{name:"model",rawName:"v-model",value:e.check,expression:"check"}],attrs:{type:"password",placeholder:"确认密码",required:""},domProps:{value:e.check},on:{input:function(t){t.target.composing||(e.check=t.target.value)}}})]),t("button",{attrs:{type:"submit",id:"login"}},[e._v("注册")])])])},S=[],T={data(){return{username:"",password:"",userRole:"user",check:""}},mounted(){this.al=document.querySelector(".alert")},methods:{async register(){try{if(this.password!=this.check)this.al.innerHTML="两次密码不同",this.showAlert2();else{const e=await this.$axios.post("/api/users/register",{username:this.username,password:this.password,userRole:this.userRole});this.al.innerHTML="注册成功",this.showAlert1(),setTimeout((()=>{this.$router.push({path:"/login"})}),800),console.log(e.data)}}catch(e){this.al.innerHTML="注册失败",this.showAlert2(),console.error(e)}},showAlert1(){this.al.style.transition="0s",this.al.style.backgroundColor="rgba(0, 128, 0,0.4)",this.al.style.color="green",this.al.style.transform="translateY(20px)",setTimeout((()=>{this.al.style.transition="0.2s",this.al.style.opacity=1,this.al.style.transform="translateY(0px)"}),1),setTimeout((()=>{this.al.style.opacity=0,this.al.style.transform="translateY(-20px)"}),600)},showAlert2(){this.al.classList.add("shake"),setTimeout((()=>{this.al.classList.remove("shake")}),1e3)}}},C=T,z=(0,u.A)(C,L,S,!1,null,null,null),j=z.exports,O=function(){var e=this,t=e._self._c;return t("div",{staticStyle:{width:"100%","max-width":"800px",margin:"auto auto"}},[t("h1",[e._v("用户管理")]),t("el-table",{attrs:{data:e.users}},[t("el-table-column",{attrs:{prop:"id",label:"ID",width:"50px"}}),t("el-table-column",{attrs:{prop:"username",label:"用户名"}}),t("el-table-column",{attrs:{prop:"userRole",label:"权限"}}),t("el-table-column",{attrs:{label:"操作",width:"155"},scopedSlots:e._u([{key:"default",fn:function(s){return[t("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.editUser(s.row)}}},[e._v("编辑")]),t("el-popover",{attrs:{placement:"top-end",width:"160"},model:{value:e.visible[s.$index],callback:function(t){e.$set(e.visible,s.$index,t)},expression:"visible[scope.$index]"}},[t("p",[e._v("确定删除吗？")]),t("div",{staticStyle:{"text-align":"right",margin:"0"}},[t("el-button",{attrs:{size:"mini",type:"text"},on:{click:function(t){return e.$set(e.visible,s.$index,!1)}}},[e._v("取消")]),t("el-button",{attrs:{type:"danger",size:"mini"},on:{click:function(t){e.$set(e.visible,s.$index,!1),e.deleteUser(s.row)}}},[e._v("确定")])],1),t("el-button",{staticClass:"el-icon-delete",attrs:{slot:"reference",type:"danger"},slot:"reference"})],1)]}}])})],1),t("el-dialog",{attrs:{visible:e.addDialogVisible,title:"添加用户",width:"70%"},on:{"update:visible":function(t){e.addDialogVisible=t}}},[t("el-form",{attrs:{model:e.userForm,"label-width":"80px"}},[t("el-form-item",{attrs:{label:"用户名"}},[t("el-input",{model:{value:e.userForm.username,callback:function(t){e.$set(e.userForm,"username",t)},expression:"userForm.username"}})],1),t("el-form-item",{attrs:{label:"权限"}},[t("el-select",{attrs:{placeholder:"选择用户身份"},model:{value:e.userForm.userRole,callback:function(t){e.$set(e.userForm,"userRole",t)},expression:"userForm.userRole"}},[t("el-option",{attrs:{label:"管理员",value:"admin"}}),t("el-option",{attrs:{label:"普通用户",value:"user"}}),t("el-option",{attrs:{label:"访客",value:"guest",disabled:!0}})],1)],1),t("el-form-item",{attrs:{label:"密码"}},[t("el-input",{model:{value:e.userForm.password,callback:function(t){e.$set(e.userForm,"password",t)},expression:"userForm.password"}})],1)],1),t("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[t("el-button",{on:{click:function(t){e.addDialogVisible=!1}}},[e._v("取消")]),t("el-button",{attrs:{type:"primary"},on:{click:e.addUser}},[e._v("确定")])],1)],1),t("el-button",{staticStyle:{margin:"10px 10px"},attrs:{type:"primary"},on:{click:function(t){e.addDialogVisible=!0}}},[e._v("添加用户")])],1)},I=[],D={data(){return{user:null,users:[],addDialogVisible:!1,userForm:{username:"",password:"",userRole:""},visible:[]}},methods:{addUser(){this.$axios.post("/api/manage/add",this.userForm,{headers:{Authorization:localStorage.getItem("token")}}).then((e=>{this.$message({message:"添加成功",type:"success"}),this.users.push({id:this.users.length+1,...this.userForm}),this.addDialogVisible=!1})).catch((e=>{this.$message.error("添加失败")}))},editUser(e){console.log("编辑用户",e)},deleteUser(e){if(e.username==this.user.username)return this.$message.error("无法删除当前登录账号"),console.log("无法删除当前登录账号");this.$axios.post("/api/manage/delete",{rUsername:e.username},{headers:{Authorization:localStorage.getItem("token")}}).then((t=>{this.users=this.users.filter((t=>t.username!==e.username)),this.$message({message:"删除成功",type:"success"})})).catch((e=>{this.$message.error("删除失败")}))}},async mounted(){try{const e=await this.$axios.get("/api/vertify",{headers:{Authorization:localStorage.getItem("token")}});200===e.status&&(this.$message({message:"自动登录成功",type:"success"}),this.user=e.data,this.$axios.get("/api/manage/allUsers",{headers:{Authorization:localStorage.getItem("token")}}).then((e=>{this.users=e.data})).catch((e=>{this.$message.error("获取失败")})))}catch(e){}}},P=D,U=s(6280),q=s.n(U),M=(0,u.A)(P,O,I,!1,null,null,null);"function"===typeof q()&&q()(M);var R=M.exports;a["default"].use(d.Ay);const E=[{path:"/",name:"home",component:w},{path:"/about",name:"about",component:()=>s.e(594).then(s.bind(s,531))},{path:"/login",name:"login",component:F},{path:"/register",name:"register",component:j},{path:"/dashboard",name:"dashboard",component:R}],N=new d.Ay({routes:E});var H=N,V=s(4455),Y=s.n(V),B=s(5984);a["default"].use(Y()),a["default"].prototype.$axios=B.A,a["default"].config.productionTip=!1,new a["default"]({router:H,render:e=>e(p)}).$mount("#app")},6280:function(){},7207:function(){}},t={};function s(a){var r=t[a];if(void 0!==r)return r.exports;var i=t[a]={id:a,loaded:!1,exports:{}};return e[a].call(i.exports,i,i.exports,s),i.loaded=!0,i.exports}s.m=e,function(){s.amdO={}}(),function(){var e=[];s.O=function(t,a,r,i){if(!a){var o=1/0;for(c=0;c<e.length;c++){a=e[c][0],r=e[c][1],i=e[c][2];for(var n=!0,l=0;l<a.length;l++)(!1&i||o>=i)&&Object.keys(s.O).every((function(e){return s.O[e](a[l])}))?a.splice(l--,1):(n=!1,i<o&&(o=i));if(n){e.splice(c--,1);var u=r();void 0!==u&&(t=u)}}return t}i=i||0;for(var c=e.length;c>0&&e[c-1][2]>i;c--)e[c]=e[c-1];e[c]=[a,r,i]}}(),function(){s.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return s.d(t,{a:t}),t}}(),function(){s.d=function(e,t){for(var a in t)s.o(t,a)&&!s.o(e,a)&&Object.defineProperty(e,a,{enumerable:!0,get:t[a]})}}(),function(){s.f={},s.e=function(e){return Promise.all(Object.keys(s.f).reduce((function(t,a){return s.f[a](e,t),t}),[]))}}(),function(){s.u=function(e){return"js/about.80324288.js"}}(),function(){s.miniCssF=function(e){}}(),function(){s.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){s.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)}}(),function(){var e={},t="printer_serve:";s.l=function(a,r,i,o){if(e[a])e[a].push(r);else{var n,l;if(void 0!==i)for(var u=document.getElementsByTagName("script"),c=0;c<u.length;c++){var p=u[c];if(p.getAttribute("src")==a||p.getAttribute("data-webpack")==t+i){n=p;break}}n||(l=!0,n=document.createElement("script"),n.charset="utf-8",n.timeout=120,s.nc&&n.setAttribute("nonce",s.nc),n.setAttribute("data-webpack",t+i),n.src=a),e[a]=[r];var d=function(t,s){n.onerror=n.onload=null,clearTimeout(m);var r=e[a];if(delete e[a],n.parentNode&&n.parentNode.removeChild(n),r&&r.forEach((function(e){return e(s)})),t)return t(s)},m=setTimeout(d.bind(null,void 0,{type:"timeout",target:n}),12e4);n.onerror=d.bind(null,n.onerror),n.onload=d.bind(null,n.onload),l&&document.head.appendChild(n)}}}(),function(){s.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}}(),function(){s.nmd=function(e){return e.paths=[],e.children||(e.children=[]),e}}(),function(){s.p="/"}(),function(){var e={524:0};s.f.j=function(t,a){var r=s.o(e,t)?e[t]:void 0;if(0!==r)if(r)a.push(r[2]);else{var i=new Promise((function(s,a){r=e[t]=[s,a]}));a.push(r[2]=i);var o=s.p+s.u(t),n=new Error,l=function(a){if(s.o(e,t)&&(r=e[t],0!==r&&(e[t]=void 0),r)){var i=a&&("load"===a.type?"missing":a.type),o=a&&a.target&&a.target.src;n.message="Loading chunk "+t+" failed.\n("+i+": "+o+")",n.name="ChunkLoadError",n.type=i,n.request=o,r[1](n)}};s.l(o,l,"chunk-"+t,t)}},s.O.j=function(t){return 0===e[t]};var t=function(t,a){var r,i,o=a[0],n=a[1],l=a[2],u=0;if(o.some((function(t){return 0!==e[t]}))){for(r in n)s.o(n,r)&&(s.m[r]=n[r]);if(l)var c=l(s)}for(t&&t(a);u<o.length;u++)i=o[u],s.o(e,i)&&e[i]&&e[i][0](),e[i]=0;return s.O(c)},a=self["webpackChunkprinter_serve"]=self["webpackChunkprinter_serve"]||[];a.forEach(t.bind(null,0)),a.push=t.bind(null,a.push.bind(a))}();var a=s.O(void 0,[504],(function(){return s(5840)}));a=s.O(a)})();
//# sourceMappingURL=app.b359abac.js.map