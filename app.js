/*************** 외부모듈 *****************/
const express = require('express');
const app = express();
const path = require('path');

/*************** 절대경로 *****************/
const publicPath = path.join(__dirname, './public');
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
app.use('/board', boardRouter);
app.use('/member', memberRouter);

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