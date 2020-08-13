const KakaoStrategy = require('passport-kakao').Strategy;
const { queryExecute, mysqlErr } = require('../modules/mysql-conn');


module.exports = (passport) => {
	passport.use(new KakaoStrategy({
		clientID: process.env.KAKAO_API,
		callbackURL: '/member/kakao/cb'
	}, cb));
};