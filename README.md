# TalkToNorthStar
每个人都在寻求自己的北极星，为前行指引方向，通过AI与自己心中的北极星对话吧

**详细部署流程**
A. 代码准备
创建一个本地文件夹（比如 fc-proxy），把上面的代码保存为 index.js。
如果你用 Node.js 18 环境，无需额外依赖（fc 默认内置 fetch）。
B. 登录阿里云函数计算控制台
地址：https://fc.console.aliyun.com/
C. 新建服务和函数
创建服务

进入“服务列表”，点击“创建服务”。
填个名字（如 proxy-service），保持其它默认。
创建函数

在服务内点击“创建函数”。
选择“自定义创建”。
运行环境选 Node.js 18。
函数名称如 proxy-func。
触发器类型选“HTTP触发器”，勾选“允许公网访问”。
入口文件填 index.handler（即 index.js 的 handler 函数）。
上传代码：可以直接在控制台粘贴，也可以 zip 上传。
D. 发布/保存
点击“保存并测试”或“发布”。
函数创建好后，在“触发器”页面会看到一个公网访问 URL，类似：
Code
https://proxy-service-xxxxxxxx.cn-hangzhou.fc.aliyuncs.com/2016-08-15/proxy/proxy-func/
E. 前端调用方法
将你的前端 fetch 地址替换为上面这个公网 URL，即可绕过 CORS。

3. 测试和常见问题
测试 POST：
可用 Postman/curl 测试你的函数公网 URL，确保能正常代理并返回目标 API 的内容。
CORS 预检自动通过：
已自动处理 OPTIONS 请求和跨域响应头。
API Key 问题：
前端发起请求时带 Authorization header，会自动被代理转发。
4. 可选：多 API 动态代理
如果你想要代理不止一个 API，可以通过前端传参、path 或配置方式动态设置 targetApi，请告知需求，我可帮你扩展代码。

5. 计费/免费额度
阿里云函数计算有免费额度，个人轻量使用免费。
超出免费额度会按用量计费，注意监控账单。
