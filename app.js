/*************** 외부모듈 *****************/
const express = require('express');
const app = express();
const path = require('path');
require('dotenv').config();
const session = require('./modules/session-conn');
const logger = require('./modules/morgan-conn');


/*************** 내부모듈 *****************/
const navi = require('./modules/navi-conn');

/*************** 절대경로 *****************/
const publicPath = path.join(__dirname, './public'); // 'c:\...\public'
const uploadPath = path.join(__dirname, './storage');
const viewsPath = path.join(__dirname, './views');

/*************** 세션/쿠키 *****************/
app.set('trust proxy', 1) // trust first proxy
app.use(session);

/*************** 라우터 *****************/
const gbookRouter = require('./router/gbook-router');
const gbookRouterApi = require('./router/gbook-api-router');
const boardRouter = require('./router/board-router');
const galleryRouter = require('./router/gallery-router');
const memberRouter = require('./router/member-router');

/*************** 서버실행 *****************/
app.listen(process.env.PORT, () => { 
	console.log('http://127.0.0.1:' + process.env.PORT);
});

/*************** 뷰 엔진 *****************/
app.set('view engine', 'pug');
app.set('views', viewsPath);
app.locals.pretty = true;
app.locals.headTitle = '노드 게시판';
app.locals.navis = navi;
app.use((req, res, next) => {
	app.locals.user = req.session.user ? req.session.user : {};
	next();
});

/***** AJAX/POST 데이터를 json으로 변경 ******/
app.use(express.json());
app.use(express.urlencoded({extended: false}));


/***** logger(morgan) Init ******/
app.use(logger);


/*************** 라우터 세팅 *****************/
app.use('/', express.static(publicPath));
app.use('/upload', express.static(uploadPath));
app.use('/gbook', gbookRouter);
app.use('/gbook/api', gbookRouterApi);
app.use('/board', boardRouter);
app.use('/gallery', galleryRouter);
app.use('/member', memberRouter);

/*************** 오류 처리 *****************/
app.use((req, res, next) => {
	const err = new Error();
	err.code = 404;
	err.msg = '요청하신 페이지를 찾을 수 없습니다.';
	next(err);
});

app.use((error, req, res, next) => {
	if(error.code != 404) console.log(error);
	const code = error.code || 500;
	const msg = error.msg || '서버 내부 오류 입니다. 관리자에게 문의하세요.';
	res.render('error.pug', { code, msg });
});