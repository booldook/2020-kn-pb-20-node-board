const mysql = require('mysql2/promise');
const pool = mysql.createPool({
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	password: process.env.DB_PASS,
	database: process.env.DB_NAME,
	waitForConnections: true,
	connectionLimit: 10
});

const mysqlErr = (err) => {
	const error = new Error();
	error.msg = `[${err.code} / ${err.errno} / ${err.sqlState}] ${err.sqlMessage}`;
	return error;
}

module.exports = { pool, mysqlErr };