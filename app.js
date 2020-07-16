/* 
app.get('/test', (req, res, next) => {
	let sql = 'INSERT INTO gbook SET writer=?, comment=?';
	let sqlValue = ['홍길동2'];
	connect.query(sql, sqlValue, (err, result) => {
		if(err) next(mysqlErr(err));
		else {
			res.json(result);
		}
	});
}); 

app.get('/test', (req, res, next) => {
	let sql = 'INSERT INTO gbook SET writer=?, comment=?';
	let sqlValue = ['홍길동2'];
	connect
	.execute(sql, sqlValue)
	.then((result) => {
		res.json(result);
	})
	.catch((err) => {
		next( mysqlErr(err) );
	});
}); 
*/

/*************** 외부모듈 *****************/
const express = require('express');
const app = express();
const path = require('path');

/*************** 마이모듈 *****************/
const { pool, mysqlErr } = require('./modules/mysql-conn');

/*************** 절대경로 *****************/
const publicPath = path.join(__dirname, './public');
const jsonPath = path.join(__dirname, './json');
const viewsPath = path.join(__dirname, './views');

/*************** 라우터 *****************/
const boardRouter = require('./router/board');
const memberRouter = require('./router/member');

/*************** 서버실행 *****************/
app.listen(3000, () => { console.log('http://127.0.0.1:3000') });

/*************** 뷰 엔진 *****************/
app.set('view engine', 'pug');
app.set('views', viewsPath);
app.locals.pretty = true;
app.locals.headTitle = '노드 게시판';

/*************** 라우터 세팅 *****************/
app.use('/', express.static(publicPath));
app.use('/api', express.static(jsonPath));
app.use('/board', boardRouter);
app.use('/member', memberRouter);
app.get('/test', async (req, res, next) => {
	try {
		let sql = 'INSERT INTO gbook SET writer=?, comment=?';
		let sql2 = 'SELECT * FROM gbook ORDER BY id DESC';
		let sqlValue = ['홍길동4', '방문했어요~'];
		let connect = await pool.getConnection();
		let result = await connect.execute(sql, sqlValue);
		let result2 = await connect.execute(sql2);
		connect.release();
		res.json(result2);
	}
	catch(err) {
		next( mysqlErr(err) );
	}
});

/*************** 오류 처리 *****************/
app.use((req, res, next) => {
	const err = new Error();
	err.code = 404;
	err.msg = '요청하신 페이지를 찾을 수 없습니다.';
	next(err);
});

app.use((error, req, res, next) => {
	const code = error.code || 500;
	const msg = error.msg || '서버 내부 오류 입니다. 관리자에게 문의하세요.';
	res.render('error.pug', { code, msg });
});