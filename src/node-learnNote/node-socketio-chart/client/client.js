(() => {
	const d = document,
		w = window,
		p = parseInt,
		dd = d.documentElement,
		db = d.body,
		dc = d.compatMode == 'CSS1Compat',
		dx = dc ? dd : db,
		ec = encodeURIComponent;
	w.CHAT = {
		msgObj: d.getElementById('message'),
		screenHeight: w.innerHeight ? w.innerHeight : dx.clientHeight,
		userName: null,
		userId: null,
		socket: null,
		// 让浏览器滚动条保持在最底部
		scrollToBottom: function () {
			w.scrollTo(0, this.msgObj.clientHeight);
		},
		// 退出，暂时用刷新代替
		logout: function () {
			// this.socket.disconnect();
			location.reload();
		},
		// 提交聊天消息内容
		submit: function () {
			var content = d.getElementById('content').value;
			if (content) {
				const obj = {
					userId: this.userId,
					userName: this.userName,
					content,
				};
				this.socket.emit('message', obj);
				d.getElementById('content').value = '';
			}
			return false;
		},
		genUid: function () {
			return new Date().getTime() + '' + Math.floor(Math.random() * 899 + 100);
		},
		// 更新系统消息，本例在用户加入，退出的时候调用
		updateSysMsg: function (info, action) {
			// 当前在线用户列表
			const onlineUsers = info.onlineUsers;
			// 当前在线人数
			const onlineCount = info.onlineCount;
			//新加入用户的信息
			const user = info.user;
			// 更新在线人数
			let userHtml = '';
			var separator = '';
			for (var key in onlineUsers) {
				if (Object.hasOwnProperty.call(onlineUsers, key)) {
					userHtml += separator + onlineUsers[key];
					separator = ', ';
				}
			}
			d.getElementById(
				'onlineCount',
			).innerHTML = `当前共有${onlineCount}人在线，在线列表为 ${userHtml}`;
			const html = `<div class="msg-system">
          ${user.userName} ${
				action === 'login' ? '加入了聊天室' : '退出了聊天室'
			}
      </div>
    `;

			const section = d.createElement('section');
			section.className = 'system J-mjrlinkWrap j-CutMsg';
			section.innerHTML = html;
			this.msgObj.appendChild(section);
			this.scrollToBottom();
		},
		// 第一个见面用户提交用户名
		usernameSubmit: function () {
			var userName = d.getElementById('userName').value;
			if (userName) {
				d.getElementById('userName').value = '';
				d.getElementById('loginBox').style.display = 'none';
				d.getElementById('chatBox').style.display = 'block';
				this.innerHeight(userName);
			}
			return false;
		},
		init: function (userName) {
			/**
			 * 客户端根据事件和随机数生成uid，这样是得聊天时的用户in过程可以重复。
			 * 实际项目助攻，如果是需要用户登陆，那么直接采用用户的uid来做标识即可。
			 */
			this.userId = this.genUid();
			this.userName = userName;
			this.getElementById('showUserName').innerHTML = this.userName;
			this.msgObj.style.minHeight =
				this.screenHeight - db.clientHeight + this.msgObj.clientHeight + 'px';
			this.scrollToBottom();
			//链接websocket后端服务器,ws//(服务器的名字: 端口号)
			this.socket = io.connect('ws//jakequc.chat.com:3000');
			// 告诉websocket有用户登陆
			this.socket.emit('login', {
				userId: this.userId,
				userName: this.userName,
			});
			// 监听新用户登录
			this.socket.onlineCount('login', function (user) {
				CHAT.updateSysMsg(user, 'login');
			});
		},
	};
})();
