const express = require('express');
const router = express.Router();
const { pool, mysqlErr } = require('../modules/mysql-conn');
const moment = require('moment');
const pagerInit = require('../modules/pager-conn');

// 127.0.0.1:3000/gbook
// 127.0.0.1:3000/gbook?cnt=10
// 127.0.0.1:3000/gbook/list
// 127.0.0.1:3000/gbook/list?cnt=10
// 127.0.0.1:3000/gbook/list/3
// 127.0.0.1:3000/gbook/list/3?cnt=10
// console.log(page, cnt, stRec);
router.get(['/', '/list', '/list/:page'], async (req, res, next) => {
	let connect, sql, sqlVal, result, pager;
	try {
		pager = await pagerInit(req, '/gbook/list', 'gbook');
		connect = await pool.getConnection();
		sql = 'SELECT * FROM gbook ORDER BY id DESC LIMIT ?, ?';
		sqlVal = [pager.stRec, pager.cnt];
		result = await connect.execute(sql, sqlVal);
		connect.release();
		for(let v of result[0]) v.createdAt = moment(v.createdAt).format('YYYY-MM-DD hh:mm:ss');
		const pug = { css: 'gbook', js: 'gbook', lists: result[0], pager };
		res.render('gbook/gbook.pug', pug);
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