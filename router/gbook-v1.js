const express = require('express');
const router = express.Router();
const { pool, mysqlErr } = require('../modules/mysql-conn');
const moment = require('moment');
const pagerInit = require('../modules/pager-conn-v1');

// 127.0.0.1:3000/gbook
// 127.0.0.1:3000/gbook?cnt=10
// 127.0.0.1:3000/gbook/list
// 127.0.0.1:3000/gbook/list?cnt=10
// 127.0.0.1:3000/gbook/list/3
// 127.0.0.1:3000/gbook/list/3?cnt=10
// console.log(page, cnt, stRec);
router.get(['/', '/list', '/list/:page'], async (req, res, next) => {
	let connect, sql, sqlVal, result, pager = {}; 
	try {
		connect = await pool.getConnection();
		sql = 'SELECT COUNT(id) FROM gbook';
		result = await connect.execute(sql);
		/******* pager.start ******/
		pager.path = '/gbook/v1/list';
		pager.page = Number(req.params.page || 1); 
		pager.cnt = Number(req.query.cnt || 5);
		pager.grp = Number(req.query.grp || 3);
		pager.totalRec = result[0][0]['COUNT(id)'];
		pager = pagerInit(pager);
		sql = 'SELECT * FROM gbook ORDER BY id DESC LIMIT ?, ?';
		sqlVal = [pager.stRec, pager.cnt];
		result = await connect.execute(sql, sqlVal);
		connect.release();
		for(let v of result[0]) v.createdAt = moment(v.createdAt).format('YYYY-MM-DD hh:mm:ss');
		const pug = { css: 'gbook', js: 'gbook', lists: result[0], pager };
		res.render('gbook/gbook-v1.pug', pug);
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
		res.redirect('/gbook/v1');
	}
	catch(e) {
		next(mysqlErr(e));
	}
});

module.exports = router;