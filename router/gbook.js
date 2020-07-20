const express = require('express');
const router = express.Router();
const { pool, mysqlErr } = require('../modules/mysql-conn');
const moment = require('moment');

router.get('/', async (req, res, next) => {
	let connect, sql, result;
	try {
		sql = 'SELECT * FROM gbook ORDER BY id DESC';
		connect = await pool.getConnection();
		result = await connect.execute(sql);
		connect.release();
		for(let v of result[0]) v.createdAt = moment(v.createdAt).format('YYYY-MM-DD hh:mm:ss');
		const pug = { css: 'gbook', js: 'gbook', lists: result[0] };
		res.render('gbook/gbook.pug', pug);
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
		res.redirect('/gbook');
	}
	catch(e) {
		next(mysqlErr(e));
	}
});

module.exports = router;