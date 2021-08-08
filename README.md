npx create-react-app step-learn-for-myself

npm init prettier-eslint 可以使用 prettier 和 eslint 来约束你的项目

yarn start

<!-- 把prettier安装到开发依赖中 --exact是精确的版本标志 -->

yarn add prettier --dev --exact

npx mrm lint-staged
可以将 prettier 和 git 整合，优美的格式化代码

\*\*\*

#### nodeJS+Socket.IO 实现的简易聊天系统

<!-- src/node-learnNote/node-socketio-chart: 这是学习nodeJS时候使用socketio来实现的一个简易聊天系统 -->

nginx.conf
`
server {
listen: 80,

# server_name 配置的是线上访问的域名，访问的时候只需要使用 http://jakequc.chat.com

server_name jakequc.chat.com;

# location 设置访问的时候的代理 使用本机的 3000 端口来代理我们访问的路由

location / {
proxy_pass http://127.0.0.1:3000,
}
}
`
