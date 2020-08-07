const expressSession = require('express-session');

const session = expressSession({
	secret: process.env.SESSION_SALT,
	resave: false,
	saveUninitialized: true,
	cookie: { secure: false, path: '/', httpOnly: true }
});


module.exports = session;
