const express = require('express');
const router = express.Router();
const pug = {headTitle: "Node/Express 갤러리", css: "gallery", js: "gallery"};
const { pool } = require('../modules/mysql-conn');
const { upload } = require('../modules/multer-conn');

let sql, sqlVal = [], connect, result;

router.get(['/', '/list', '/list/:page'], async (req, res, next) => {
	pug.title = '갤러리 리스트';	
	try {
		sql = 'SELECT * FROM gallery ORDER BY id DESC';
		connect = await pool.getConnection();
		result = await connect.execute(sql);
		connect.release();
		pug.lists = result[0];
		for(let v of pug.lists) {
			v.src = '/upload/' + v.savefile.substr(0, 6) + '/' + v.savefile;
		}
		res.render('gallery/gallery-li.pug', pug);
	}
	catch(e) {
		console.log(e);
		next(e);
	}
});

router.get(['/wr', '/wr/:id'], (req, res, next) => {
	pug.title = '갤러리 등록';
	res.render('gallery/gallery-wr.pug', pug);
});

router.get('/view/:id', (req, res, next) => {
	res.json({ title: "상세보기" });
});

router.get('/rev/:id', (req, res, next) => {
	res.send("글삭제");
});

router.get('/downlaod/:file', (req, res, next) => {
	res.send("다운로드");
});

router.post('/save', upload.array('upfile'), async (req, res, next) => {
	if(req.banExt) {
		res.send(`<script>alert('${req.banExt} 타입은 업로드 할 수 없습니다.')</script>`);
	}
	else {
		try {
			sqlVal[0] = req.body.title;
			sqlVal[1] = req.body.writer;
			sqlVal[2] = req.body.content;
			sql = 'INSERT INTO gallery SET title=?, writer=?, content=?';
			for(let i in req.files) {
				if(i == 0) sql += ', realfile=?, savefile=?';
				else sql += ', realfile'+(Number(i)+1)+'=?, savefile'+(Number(i)+1)+'=?';
				sqlVal.push(req.files[i].originalname);
				sqlVal.push(req.files[i].filename);
			}
			const connect = await pool.getConnection();
			const result = await connect.execute(sql, sqlVal);
			connect.release();
			res.redirect('/gallery');
		}
		catch(e) {
			console.log(e);
			next(e);
		}
	}
});

module.exports = router;