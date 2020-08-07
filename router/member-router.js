const express = require('express');
const router = express.Router();

const pug = { headTitle: "Node/Express 회원관리", css: "member", js: "member" };

router.get('/join', (req, res, next) => {
	res.render('member/member-join.pug', pug);
});

module.exports = router;