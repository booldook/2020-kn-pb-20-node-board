const express = require('express');
const router = express.Router();
const { mysqlErr, queryExecute } = require('../modules/mysql-conn');
const bcrypt = require('bcrypt');
const passport = require('passport');
const { alert, getIP } = require('../modules/util');
const { isAdmin, isGuest, isUser } = require('../modules/auth');
require('dotenv').config();

const pug = { headTitle: "Node/Express 회원관리", css: "member", js: "member" };
let sql, sqlVal = [], result;

const useridChk = async (req, res, next) => {
	req.userid = req.query.userid;
	req.sendData = { code: 500 };
	if(req.userid.length < 4 || req.userid.length > 16) {
		req.sendData.msg = '아이디는 4 ~ 16자리 입니다.';
		res.json(req.sendData);
	}
	else {
		sql = `SELECT userid FROM member WHERE userid='${req.userid}'`;
		result = await queryExecute(sql);
		if(result[0] && result[0].userid) {
			req.sendData.msg = `${req.userid}은(는) 사용하실 수 없습니다.`;
			res.json(req.sendData);
		}
		else next();
	}
}

const formChk = (req, res, next) => {
	req.userid = req.body.userid;
	req.userpw = req.body.userpw;
	req.username = req.body.username;
	req.email = req.body.email;
	if(req.userid && req.userpw && req.username && req.userpw.length >= 8 && req.userpw.length <= 24 && req.userid.length >= 4 && req.userpw.length <= 16) next();
	else res.send(alert('정상적인 접근이 아닙니다.', '/member/join'));
}

router.get('/api/idchk', isGuest, useridChk, async (req, res, next) => {
	res.json({code: 200, msg: `${req.userid}은(는) 사용 가능합니다.`});
});

router.get('/join', isGuest, (req, res, next) => {
	pug.title = "회원가입";
	res.render('member/member-join.pug', pug);
});

router.get('/login', isGuest, (req, res, next) => {
	pug.title = "회원로그인";
	res.render('member/member-login.pug', pug);
});

router.post('/save', isGuest, formChk, async (req, res, next) => {
	sql = 'INSERT INTO member SET userid=?, userpw=?, username=?, email=? ';
	req.userpw = await bcrypt.hash(req.userpw + process.env.SALT, 7);
	sqlVal = [req.userid, req.userpw, req.username, req.email];
	result = await queryExecute(sql, sqlVal);
	res.send(alert('회원가입이 완료되었습니다. 로그인 해 주세요.', '/member/login'));
});

router.post('/sign', isGuest, async (req, res, next) => {
	const done = (err, user, msg) => {
		if(err) return next(err);
		if(!user) return res.send(alert(msg, '/'));
		else {
			req.login(user, (err) => {
				if(err) return next(err);
				else return res.send(alert('로그인 되었습니다.', '/'));
			});
		}
	}
	passport.authenticate('local', done)(req, res, next);
});

router.get('/logout', isUser, (req, res, next) => {
	req.logout();
	res.send(alert('로그아웃 되었습니다.', '/'));
});

router.get('/kakao', passport.authenticate('kakao'));

router.get('/kakao/cb', passport.authenticate('kakao', {failureRedirect: '/'}), (req, res, next) => {
	console.log(req.user);
	req.login(req.user, (err) => {
		if(err) next(err);
		else res.redirect('/');
	});
});

module.exports = router;