const expressSession = require('express-session');
const MySQLStore = require('express-mysql-session')(expressSession);
 
const options = {
		host: process.env.DB_HOST,
		port: process.env.DB_PORT,
		user: process.env.DB_USER,
		password: process.env.DB_PASS,
		database: process.env.DB_NAME
};
 
const sessionStore = new MySQLStore(options);

const session = expressSession({
	key: 'booldook-cookie',
	store: sessionStore,
	secret: process.env.SESSION_SALT,
	resave: false,
	saveUninitialized: true,
	cookie: { secure: false, path: '/', httpOnly: true }
});


module.exports = session;
