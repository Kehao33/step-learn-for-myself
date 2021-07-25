// ***************** 第一部分 核心模块 eventEmitter 几乎是所有模块的基类 ***************************
// const EventEmitter = require("events").EventEmitter;
// // node中的EventEmitter 是事件生成与管理器，提供的方法有on监听事件（可多次监听），
// // once（只能够注册一次事件），removeListener（event，listener）是移除指定的event的接听listener事件；
// // removeAllListener([event])移除所有的事件， 如果指定event，则移除指定事件的所有监听器；
// // emit是发射事件，当提交的时候注册的事件就会被执行

// const event = new EventEmitter();
// event.on("newEvent", (args) => {
//   console.log(args, "<<<<<");
// });

// setTimeout(() => {
//   event.emit("newEvent", [{ name: "jakequc" }]);
// }, 1000);

// event.emit("newEvent", [{ name: "firstDO" }]);

// ************** 第二部分 url 路由： 用来处理不同方法或者不同url的处理方式 ****************************
// const http = require("http");
// const url = require("url");

// function start() {
//   function onRequest(request, response) {
//     var pathname = url.parse(request.url).pathname;
//     console.log("request for ", pathname, "received.");

//     //  使用依赖注入的方式，用来向服务添加路由模块的处理,单一原则
//     route(pathname);

//     response.writeHead(200, { "content-Type": "text/plain" });
//     response.write("hello word");
//     response.end();
//   }
//   http
//     .createServer(onRequest)
//     .listen(8000, () => console.log("server is start at localhost:8000"));
// }

// function route(url) {
//   console.log("current url is: ", url);
// }

// start();

// ************** 第3部分： process 与操作系统的简单接口 ************
// 1. process.argv 将会一次打印每个参数， 如果是命令 或是文件则会打印其文件地址， argv是一个数组
// 2. process.stdout 是一个标准的输出溜，通常使用console.log（xxx）向标准输出打印字符，而process.stdout.write()函数则提供了更底层的接口
// 3. process.stdin: 是标准的输入流， 初识时他是被暂停的，想要从标准输入读取数据，必须恢复流，并手动编写流的事件响应函数
// 4. process.nextTick(callback) 的功能是为事件熏昏啊设置任务，node会在下次事件循环响应的时候调用callback函数

// console.log("process.argv<<<<", process.argv);
// 在控制台输入 node 当前文件名(baseModule.js) 各种参数 eg: node baseModule.js my name="jakequc" age is 23

process.stdin.resume();
process.stdin.on("data", (data) => {
  process.stdout.write("您当前输入的字符被捕获： ", data.toString());
});
