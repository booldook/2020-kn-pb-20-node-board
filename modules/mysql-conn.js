const mysql = require('mysql2');
const connect = mysql.createConnection({
	host: 'localhost',
	user: 'board',
	password: '000000',
	database: 'board'
});
const mysqlErr = (err) => {
	const error = new Error();
	error.msg = `[${err.code} / ${err.errno} / ${err.sqlState}] ${err.sqlMessage}`;
	return error;
}

module.exports = { connect, mysqlErr };