const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const moment = require('moment');
const multer  = require('multer');
const { v4: uuidv4 } = require('uuid');
const { mkdir } = require('fs');
const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, path.join(__dirname, '/storage'));
	},
	filename: function (req, file, cb) {
		cb(null, file.originalname);
	}
});
const upload = multer({ storage });

app.listen(3001, () => { console.log('http://127.0.0.1:3001'); });

app.use("/", express.static(path.join(__dirname, './public')));
app.use("/uploads", express.static(path.join(__dirname, './storage')));

app.post('/save', upload.single('upfile'), (req, res, next) => {
	res.send("저장");
});