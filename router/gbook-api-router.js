const express = require('express');
const router = express.Router();
const { pool } = require('../modules/mysql-conn');
const pagerInit = require('../modules/pager-conn');
const moment = require('moment');

router.get(['/', '/list', '/list/:page'], async (req, res, next) => {
	let connect, sql, sqlVal, result, pager, jsonResult;
	try {
		pager = await pagerInit(req, null, 'gbook');
		connect = await pool.getConnection();
		sql = 'SELECT * FROM gbook ORDER BY id DESC LIMIT ?, ?';
		sqlVal = [pager.stRec, pager.cnt];
		result = await connect.execute(sql, sqlVal);
		connect.release();
		result[0].forEach((v) => {
			v.createdAt = moment(v.createdAt).format('YYYY-MM-DD hh:mm:ss');
		});
		jsonResult = { code: 200, pager, lists: result[0], user: req.user };
		res.json(jsonResult);
	}
	catch(e) {
		next(e);
	}
});

router.post('/save', async (req, res, next) => {
	let connect, sql, sqlVal, result;
	let { writer, comment } = req.body;
	try {
		sql = 'INSERT INTO gbook SET writer=?, comment=?';
		sqlVal = [writer, comment];
		connect = await pool.getConnection();
		result = await connect.execute(sql, sqlVal);
		res.json({ code: 200, result: result[0] });
	}
	catch(e) {
		next(e);
	}
});

/*************** 오류 처리 *****************/
router.use((req, res, next) => {
	const err = new Error();
	err.code = 404;
	err.msg = '요청하신 페이지를 찾을 수 없습니다.';
	next(err);
});

router.use((error, req, res, next) => {
	const code = error.code || 500;
	const msg = error.msg || '서버 내부 오류 입니다. 관리자에게 문의하세요.';
	res.json({ code, msg, error });
});

module.exports = router;