const KakaoStrategy = require('passport-kakao').Strategy;
const { queryExecute, mysqlErr } = require('../modules/mysql-conn');

const cb = async (accessToken, refreshToken, profile, done) => {
	let sql, result;
	console.log(profile._json.kakao_account.email);
	let user = {
		api: profile.provider,
		id: profile.id,
		username: profile.username,
		email: profile._json.kakao_account.email
	};
	sql = 'SELECT * FROM member WHERE api=? AND userid=?';
	result = await queryExecute(sql, [user.api, user.id]);
	if(!result[0]) {
		sql = 'INSERT INTO member SET userid=?, username=?, email=?, api=?';
		result = await queryExecute(sql, [user.id, user.username, user.email, user.api]);
		sql = 'SELECT * FROM member WHERE api=? AND userid=?';
		result = await queryExecute(sql, [user.api, user.id]);
	}
	done(null, result[0]);
}

module.exports = (passport) => {
	passport.use(new KakaoStrategy({
		clientID: process.env.KAKAO_API,
		callbackURL: '/member/kakao/cb'
	}, cb));
};