const mysql = require('mysql2/promise');
const path = require('path');
const fs = require('fs');
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

const fileRev = (filename) => {
	return new Promise((resolve, reject) => {
		let file = storagePath(filename);
		fs.unlink(file, (e) => {
			e ? reject(e) : resolve({code: 200});
		});
	});
};

const storagePath = file => path.join(__dirname, '../storage', file.substr(0, 6), file);
const uploadPath = file => '/upload/' + file.substr(0, 6) + '/' + file;

const queryExecute = (sql, sqlVal = []) => {
	return new Promise( async (resolve, reject) => {
		let result, connect;
		try {
			connect = await pool.getConnection();
			result = await connect.execute(sql, sqlVal);
			connect.release();
			resolve(result[0]);
		}
		catch(e) {
			connect.release();
			reject(e);
		}
	});
};

module.exports = { pool, mysqlErr, fileRev, queryExecute, storagePath, uploadPath };