const express = require('express');
const router = express.Router();
const { pool, mysqlErr, queryExecute } = require('../modules/mysql-conn');
const moment = require('moment');
const pagerInit = require('../modules/pager-conn');
const { alert } = require('../modules/util');
const { isAdmin, isUser, isGuest } = require('../modules/auth');
let sql, sqlVal, result, pager;

// 127.0.0.1:3000/gbook
// 127.0.0.1:3000/gbook?cnt=10
// 127.0.0.1:3000/gbook/list
// 127.0.0.1:3000/gbook/list?cnt=10
// 127.0.0.1:3000/gbook/list/3
// 127.0.0.1:3000/gbook/list/3?cnt=10
// console.log(page, cnt, stRec);
router.get(['/', '/list', '/list/:page'], async (req, res, next) => {
	try {
		pager = await pagerInit(req, '/gbook/list', 'gbook');
		sql = 'SELECT * FROM gbook ORDER BY id DESC LIMIT ?, ?';
		result = await queryExecute(sql, [pager.stRec, pager.cnt]);
		for(let v of result) v.createdAt = moment(v.createdAt).format('YYYY-MM-DD hh:mm:ss');
		const pug = { css: 'gbook', js: 'gbook', lists: result, pager };
		res.render('gbook/gbook.pug', pug);
	}
	catch(e) {
		next(mysqlErr(e));
	}
});

router.post('/save', async (req, res, next) => {
	let { writer, comment } = req.body;
	sql = 'INSERT INTO gbook SET writer=?, comment=?';
	result = await queryExecute(sql, [writer, comment]);
	res.redirect('/gbook');
});

router.get('/rev/:id', isAdmin, async (req, res, next) => {
	let id = req.params.id;
	let page = req.query.page;
	sql = 'DELETE FROM gbook WHERE id='+id;
	result = await queryExecute(sql);
	res.redirect('/gbook/list/'+page);
});

module.exports = router;