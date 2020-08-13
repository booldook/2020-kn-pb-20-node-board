const { queryExecute, mysqlErr } = require('../modules/mysql-conn');
const local = require('./local');
const kakao = require('./kakao');

module.exports = (passport) => {
	passport.serializeUser((user, done) => {
		// session 에서 아이디 가져오기
		done(null, user.id);
	}); 
	passport.deserializeUser(async (id, done) => {
		// 가져온 아이디로 실제 데이터 쿼리
		let sql, result;
		try {
			sql = 'SELECT * FROM member WHERE id='+id;
			result = await queryExecute(sql);
			done(null, result[0]);
		}
		catch(e) {
			done(e);
		}
	});	
	local(passport);
	kakao(passport);
}
