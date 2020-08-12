const { alert } = require('../modules/util');
const { queryExecute } = require('../modules/mysql-conn');

const isAdmin = (req, res, next) => {
	if(req.session.user && req.session.user.grade == 9) next();
	else res.send(alert('정상적인 접근이 아닙니다.', '/'));
}

const isUser = (req, res, next) => {
	if(req.session.user && req.session.user.userid) next();
	else res.send(alert('회원만 사용하실 수 있습니다. 로그인 후 사용하세요.', '/member/login'));
}

const isUserApi = (req, res, next) => {
	if(req.session.user && req.session.user.userid) next();
	else res.json({error: {code: 500, msg: '정상적인 접근이 아닙니다.'}});
}

const isGuest = (req, res, next) => {
	if(!req.session.user || !req.session.user.userid) next();
	else res.send(alert('정상적인 접근이 아닙니다. 로그아웃 후에 이용하세요.', '/'));
}

const isMine = async (req, res, next) => {
	console.log(req.query.id);
	console.log(req.params.id);
	console.log(req.body.id);
	console.log(req.session.user);
	let id = req.query.id || req.params.id || req.body.id;
	let uid = req.session.user.id;
	let sql = `SELECT * FROM gallery WHERE id=${id} AND uid=${uid}`;
	let result = await queryExecute(sql);
	if(result.affectedRows > 0) next();
	else res.send(alert('본인의 글만 접근할 수 있습니다.', '/'));
}

module.exports = { isAdmin, isUser, isUserApi, isGuest, isMine };