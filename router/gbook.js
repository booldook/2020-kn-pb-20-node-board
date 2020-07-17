const express = require('express');
const router = express.Router();
const { pool, mysqlErr } = require('../modules/mysql-conn');

router.get('/', (req, res, next) => {
	const pug = { css: 'gbook', js: 'gbook' };
	res.render('gbook/gbook.pug', pug);
});

router.post('/save', async (req, res, next) => {
	let connect, sql, sqlValue, result;
	let { writer, comment } = req.body;
	try {
		sql = 'INSERT INTO gbook SET writer=?, comment=?';
		sqlValue = [writer, comment];
		connect = await pool.getConnection();
		result = await connect.execute(sql, sqlValue);
		connect.release();
		res.json(result);
	}
	catch(e) {
		connect.release();
		next(mysqlErr(e));
	}
});

module.exports = router;