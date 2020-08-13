const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const { queryExecute, mysqlErr } = require('../modules/mysql-conn');


module.exports = (passport) => {
	
};