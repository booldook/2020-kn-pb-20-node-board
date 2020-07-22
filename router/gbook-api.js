const express = require('express');
const router = express.Router();
const { pool, mysqlErr } = require('../modules/mysql-conn');
const moment = require('moment');
const pagerInit = require('../modules/pager-conn');

router.get(['/', '/list', '/list/:page'], async (req, res, next) => {
	let connect, sql, sqlVal, result, pager;
	try {
		pager = await pagerInit(req, null, 'gbook');
		connect = await pool.getConnection();
		sql = 'SELECT * FROM gbook ORDER BY id DESC LIMIT ?, ?';
		sqlVal = [pager.stRec, pager.cnt];
		result = await connect.execute(sql, sqlVal);
		connect.release();
		res.json(result[0]);
	}
	catch(e) {
		next(mysqlErr(e));
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
		res.redirect('/gbook');
	}
	catch(e) {
		next(mysqlErr(e));
	}
});

module.exports = router;