const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const { queryExecute, mysqlErr } = require('../modules/mysql-conn');

const cb = async (userid, userpw, done) => {
	let sql, result;
	try {
		sql = 'SELECT * FROM member WHERE userid=?';
		result = await queryExecute(sql, [userid]);
		if(result[0]) {
			let compare = await bcrypt.compare(userpw + process.env.SALT, result[0].userpw);
			if(compare) done(null, result[0]);
			else done(null, false, '아이디와 비밀번호를 확인하세요.');
		}
		else done(null, false, '아이디와 비밀번호를 확인하세요.');
	}
	catch(e) {
		done(e);
	}
}

module.exports = (passport) => {
	passport.use(new LocalStrategy({
		usernameField: 'userid',
		passwordField: 'userpw'
	}, cb));
};