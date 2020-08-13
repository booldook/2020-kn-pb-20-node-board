const KakaoStrategy = require('passport-kakao').Strategy;
const { queryExecute, mysqlErr } = require('../modules/mysql-conn');

const cb = async (accessToken, refreshToken, profile, done) => {
	let sql, result;
	console.log(profile);
}

module.exports = (passport) => {
	passport.use(new KakaoStrategy({
		clientID: process.env.KAKAO_API,
		callbackURL: '/member/kakao/cb'
	}, cb));
};