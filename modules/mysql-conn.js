const mysql = require('mysql2');
const connect = mysql.createConnection({
	host: 'localhost',
	user: 'board',
	password: '000000',
	database: 'board'
});

module.exports = connect;