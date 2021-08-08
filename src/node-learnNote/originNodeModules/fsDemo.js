/**
 * fs: file system 用来操作系统文件的
 * @description: All file system operations have synchronous, callback, and promise-based forms.
 * 所有的文件系统都有同步的，并且是基于promise回调函数,
 * 建议1个demo一个demo的放开注释来进行
 * 1. 读取文件： fs.readFile(path[,options],callback);
 * 2. 写入文件： fs.writeFile(path,content[,options],callback); // content为要写入的文件内容，path为要写入的文件路径及名字
 * 3. 追加内容进入文件中 fs.appendFile(path,content[,options],callback)
 * 4. delete file: fs.unlink(path,callback);
 * 5. 创建文件夹： fs.mkdir(path[, options],callback)
 * 6. 读取文件内容 fs.readdir(path[, options],callback)
 * 7. 删除文件夹 fs.rmdir(path,callback)
 */

const fs = require('fs');

// // 读取当前文件夹下的file.txt文件并log出来,fs.readFile是异步的，他会在同步任务console.log("first")之后执行
// // demo1
// fs.readFile('./file.txt', (error, bufferData) => {
// 	if (error) {
// 		console.error(error);
// 	} else {
// 		// bufferData 直接打印是一个buffer，只有将bufferData.toString()转化为可识别的string类容
// 		// 当然，当指定options 为utf8的时候不需要使用toString
// 		console.log('readFile content: ', bufferData.toString());
// 	}
// });

// //demo2
// fs.readFile('./file.txt', 'utf8', (error, bufferData) => {
// 	if (error) {
// 		console.error(error);
// 	} else {
// 		// bufferData 直接打印是一个buffer，只有将bufferData.toString()转化为可识别的string类容
// 		// 当然，当指定options 为utf8的时候不需要使用toString
// 		console.log('readFile content base utf8: ', bufferData);
// 	}
// });

console.log('=========================first==============================');

// 将console.log('hello word');写入到hello.js文件中
fs.writeFile(
	'./hello.js',
	"console.log('hello word');",
	{ encoding: 'utf8' },
	(err) => {
		if (err) console.error('error: ', err);
		else console.log('write hello word into hello.js');
	},
);

// 将const name="jakeQuc";追加到hello.js文件中
fs.appendFile(
	'./hello.js',
	"const name='JakeQuc'",
	{ encoding: 'utf8' },
	(err) => {
		if (err) console.log('error: ', err);
		else console.log('success append into hello.js file');
	},
);

// delete hello.js file by fs.unlink()
fs.unlink('./hello.js', (err) => {
	if (err) console.log('error: ', err);
	else console.log('success to delete hello.js file');
});

// 创建文件夹
fs.mkdir('./dir/otherFile.js', { recursive: true }, (err) => {
	// recursive option在创建多级目录的时候使用
	if (err) console.log('error: ', err);
	else console.log('创建文件夹 /dir/otherFile.js success');
});

// 读取文件夹的内容,files的是一个string[]
fs.readdir('./dir', (err, files) => {
	if (err) console.log('error: ', err);
	else console.log('读取文件夹的内容 /dir', files);
});

// 当删除的文件夹下有文件的时候，需要加上recursive:true才能够生效
fs.rmdir('./dir', { recursive: true }, (err, data) => {
	if (err) console.log('error: ', err);
	else console.log('remove /dir', data);
});
