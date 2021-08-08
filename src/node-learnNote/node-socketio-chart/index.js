const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.get('/', (req, res) => {
	res.send('<h1>Welcome Realtime Server.</h1>');
});

// 在线用户
let onlineUsers = {};
// 当前在线人数
let onlineCount = 0;
io.on('connection', (socket) => {
	// warning: 监听用户的login和logout都需要在socket connection的时候才能接听
	// 监听新的用户的加入
	socket.on('login', (obj) => {
		// 将新加入的用户的唯一标识符作为socket的名称，后面退出的时候便于实行退出操作
		socket.name = obj.userId;
		// 检查在线列表，如果不再里边就加入
		if (!Object.hasOwnProperty.call(onlineUsers, obj.userId)) {
			onlineUsers[obj.userId] = obj.userName;
			// 在线人数加一
			onlineCount++;
		}
		// 向所有客户端广播用户加入
		io.emit('login', { onlineUsers, onlineCount, user: obj });
		console.log(`${obj.userName} 加入了聊天室`);
	});

	// 监听用户的退出操作
	socket.on('disconnect', () => {
		// 将退出的用户从在线列表中删除
		if (Object.hasOwnProperty.call(onlineUsers, socket.name)) {
			// 退出用户的信息
			var obj = { userId: socket.name, userName: onlineUsers[socket.name] };
			// 删除退出的用户
			delete onlineUsers[socket.name];
			// 在线人数-1；
			onlineCount--;
			// 向客户端广播用户退出通知
			io.emit('logout', { onlineUsers, onlineCount, user: obj });
			console.log(`${obj.userName} 退出了聊天室`);
		}
	});

	// 监听用户发布聊天内容
	socket.on('message', (obj) => {
		// 向所有的客户端广播发布的消息
		io.emit('message', obj);
		console.log(`${obj.userName} say: ${obj.content}`);
	});
});

http.listen(3000, () => {
	console.log(
		'localhost:3000 start!, you can visit http://jakequc.chat.com url because nginx config',
	);
});
