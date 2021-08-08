// 得到事件发射器
const EventEmitter = require('events');

// 实例化事件发射器
const eventInstance = new EventEmitter();

// ******************** eventInstance.on方法的例子 START*********************
// eventInstance.on(eventName,callback)的形式来注册事件和事件的handler方法
// 通过eventsInstance.emit(eventName,arg1,arg2);来传递参数并执行已经被注册的事件
// eventsInstance.on()可以注册相同名称的事件
eventInstance.on('say', (name, age) => {
	console.log('say event fire, name=', name, ' age=', age);
});

eventInstance.on('say', (name) => {
	console.log('say2 event fire, name=', name);
});
// 以下的方法都会将上边的事件执行分别执行一遍
eventInstance.emit('say', 'jakquc', 23);
eventInstance.emit('say', 'HuaJie');
// ******************** eventInstance.on方法的例子 END*********************

// ************ eventInstance.once(eventName,callback)一次性注册方法的例子 START*********************
eventInstance.once('onceEmitter', (arg1) => {
	console.log('onceEmitter was just fire once', arg1);
});

eventInstance.emit('onceEmitter', 'test<<');
// 这一次emit失效，因为之前已经emit一次了
eventInstance.emit('onceEmitter', 'test2<<');

// ************ eventInstance.once(eventName,callback)一次性注册方法的例子 END*********************
