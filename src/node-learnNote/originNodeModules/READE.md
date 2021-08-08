# 这个模块主要是为了更加的深入 node 的学习，了解 node 的核心模块

##### events 模块： node 的事件管理器模块

##### fs 模块： node 的文件系统操作模块（file system)

##### stream 接口： node 的流接口

###### stream 是 nodejs 的 fs 文件系统模块下的一个抽象接口，一般使用 fs.createXXXSteam 来创建 http 的 request 对象就是一个 stream

###### stream 是 EventEmitter（events 模块）的实例化对象，常用的事件有

- data: 当有数据可读的时候触发
- end: 当没有数据可读的时候触发
- error: 在读取活着写入的出错的时候触发
- finish： 在所有数据写入系统底层的时候触发

###### NodeJS 中的 stream 有四种类型

- Readable: 可读
- Writeable： 可写
- Duplex： 可读可写
- Transform: 数据转化

其他的说明详见 StreamBaseFs.js

##### http 模块： node 和服务模块

##### ⚠️ 注意： Node 的 callback 基本上都是遵循 错误参数优先的形式

eg: fs.readFile(path,(error, data) => {})
