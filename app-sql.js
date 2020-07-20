/*************** 외부모듈 *****************/
const express = require('express');
const app = express();
const path = require('path');
require('dotenv').config();

/*************** 절대경로 *****************/
const publicPath = path.join(__dirname, './public');
const viewsPath = path.join(__dirname, './views');

/*************** 라우터 *****************/
const gbookRouter = require('./router/gbook');
const boardRouter = require('./router/board');
const memberRouter = require('./router/member');
const { pool } = require('./modules/mysql-conn');
const { isRegExp } = require('util');
const { connect } = require('http2');

/*************** 서버실행 *****************/
app.listen(process.env.PORT, () => { 
	console.log('http://127.0.0.1:' + process.env.PORT);
});

/*************** 뷰 엔진 *****************/
app.set('view engine', 'pug');
app.set('views', viewsPath);

app.get('/test', (req, res, next) => {
	pool.getConnection((err, connect) => {
		if(err) next(err);
		else {
			connect.execute(sql, sqlValues, (err, result) => {
				if(err) next(err);
				else {
					sql = "SELECT * FROM board WHERE id="+result[0][0];
					connect.execute(sql, (err, result2) => {
						if(err) next(err);
						else {
							connect.release();
							res.json(result2);
						}
					})
				}
			});
		}
	});
})
app.get('/test', async (req, res, next) => {
	try {
		connect = await pool.getConnection();
		result = await connect.execute(sql, sqlValues);
		sql = "SELECT * FROM board WHERE id="+result[0];
		result2 = await connect.execute(sql);
		connect.release();
		res.json(result2);
	}
	catch(e) {
		next(e);
	}
})