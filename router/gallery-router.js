const express = require('express');
const router = express.Router();
const pug = {headTitle: "Node/Express 갤러리", css: "gallery", js: "gallery"};
const { pool } = require('../modules/mysql-conn');
const { upload } = require('../modules/multer-conn');
const pagerInit = require('../modules/pager-conn');

let sql, sqlVal = [], connect, result, pager;

router.get(['/', '/list', '/list/:page'], async (req, res, next) => {
	pug.title = '갤러리 리스트';	
	try {
		req.query.cnt = req.query.cnt || 15;
		pager = await pagerInit(req, '/gallery/list', 'gallery');
		sql = 'SELECT * FROM gallery ORDER BY id DESC LIMIT ?, ?';
		sqlVal = [pager.stRec, pager.cnt];
		connect = await pool.getConnection();
		result = await connect.execute(sql, sqlVal);
		connect.release();
		pug.pager = pager;
		pug.lists = result[0];
		for(let v of pug.lists) {
			v.src = '//via.placeholder.com/300';
			v.src2 = v.src;
			if(v.savefile) {
				v.src = '/upload/' + v.savefile.substr(0, 6) + '/' + v.savefile;
				v.src2 = v.src;
			}
			if(v.savefile2) {
				v.src2 = '/upload/' + v.savefile2.substr(0, 6) + '/' + v.savefile2;
			}
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

router.get('/view/:id', async (req, res, next) => {
	let id = req.params.id;
	try {
		sql = 'SELECT savefile, savefile2 FROM gallery WHERE id=' + id;
		connect = await pool.getConnection();
		result = await connect.execute(sql);
		connect.release();
		res.json(result[0][0]);
	}
	catch(e) {
		next(e);
	}
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