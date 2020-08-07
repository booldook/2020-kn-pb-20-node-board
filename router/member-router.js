const express = require('express');
const router = express.Router();
const { mysqlErr, queryExecute } = require('../modules/mysql-conn');
const bcrypt = require('bcrypt');
require('dotenv').config();

const pug = { headTitle: "Node/Express 회원관리", css: "member", js: "member" };
let sql, sqlVal = [], result;

router.get('/join', (req, res, next) => {
	pug.title = "회원가입";
	res.render('member/member-join.pug', pug);
});

router.post('/save', async (req, res, next) => {
	let { userid, userpw, username, email } = req.body;
	sql = 'INSERT INTO member SET userid=?, userpw=?, username=?, email=? ';
	userpw = await bcrypt.hash(userpw+process.env.SALT, 7);
	sqlVal = [userid, userpw, username, email];
	result = await queryExecute(sql, sqlVal);
	res.json(result);
});

module.exports = router;