const mysql = require('mysql2/promise');
const connect = mysql.createPool({
	host: 'localhost',
	user: 'board',
	password: '000000',
	database: 'board',
	waitForConnections: true,
	connectionLimit: 10
});
const mysqlErr = (err) => {
	const error = new Error();
	error.msg = `[${err.code} / ${err.errno} / ${err.sqlState}] ${err.sqlMessage}`;
	return error;
}

module.exports = { connect, mysqlErr };