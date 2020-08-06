const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');
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
			if(v.savefile || v.savefile == '') {
				v.src = '/upload/' + v.savefile.substr(0, 6) + '/' + v.savefile;
				v.src2 = v.src;
			}
			if(v.savefile2 || v.savefile2 == '') {
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

router.get(['/wr', '/wr/:id'], async (req, res, next) => {
	let id = req.params.id;
	if(!id) {
		pug.title = '갤러리 등록';
		pug.list = null;
	}
	else {
		pug.title = '갤러리 수정';
		sql = 'SELECT * FROM gallery WHERE id='+id;
		connect = await pool.getConnection();
		result = await connect.execute(sql);
		connect.release();
		pug.list = result[0][0];
		if(pug.list.savefile) {
			pug.list.src = '/upload/' + pug.list.savefile.substr(0, 6) + '/' + pug.list.savefile;
		}
		if(pug.list.savefile2) {
			pug.list.src2 = '/upload/' + pug.list.savefile2.substr(0, 6) + '/' + pug.list.savefile2;
		}
	}
	res.render('gallery/gallery-wr.pug', pug);
});

router.get('/view/:id', async (req, res, next) => {
	let id = req.params.id;
	try {
		sql = 'SELECT * FROM gallery WHERE id=' + id;
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

router.get('/download/:id', async (req, res, next) => {
	let id = req.params.id;
	let seq = req.query.seq;
	let sql, connect, result, savefile, realfile;
	try {
		sql = `SELECT savefile${seq}, realfile${seq} FROM gallery WHERE id=${id}`;
		connect = await pool.getConnection();
		result = await connect.execute(sql);
		connect.release();
		savefile = result[0][0][`savefile${seq}`]; // result[0][0]['savefile2'] == result[0][0].savefile2
		realfile = result[0][0][`realfile${seq}`];
		savefile = path.join(__dirname, '../storage', savefile.substr(0, 6), savefile);
		// C:\Users\hi\Documents\임덕규\20.node-board\storage\200731\200731-sdfj-sdjf...jpg
		res.download(savefile, realfile);
	}
	catch(e) {
		next(e);
	}
});

router.post('/save', upload.fields([{name: 'upfile'}, {name: 'upfile2'}]), async (req, res, next) => {
	let id = req.body.id;
	if(req.banExt) {
		res.send(`<script>alert('${req.banExt} 타입은 업로드 할 수 없습니다.')</script>`);
	}
	else {
		try {
			sqlVal[0] = req.body.title;
			sqlVal[1] = req.body.writer;
			sqlVal[2] = req.body.content;
			if(id) sql = 'UPDATE gallery SET title=?, writer=?, content=?';
			else sql = 'INSERT INTO gallery SET title=?, writer=?, content=?';
			if(req.files['upfile']) {
				sql += ', realfile=?, savefile=?';
				sqlVal.push(req.files['upfile'][0].originalname);
				sqlVal.push(req.files['upfile'][0].filename);
			}
			if(req.files['upfile2']) {
				sql += ', realfile2=?, savefile2=?';
				sqlVal.push(req.files['upfile2'][0].originalname);
				sqlVal.push(req.files['upfile2'][0].filename);
			}
			const connect = await pool.getConnection();
			const result = await connect.execute(sql, sqlVal);
			connect.release();
			res.redirect('/gallery');
		}
		catch(e) {
			next(e);
		}
	}
});

router.get('/api-img/:id', async (req, res, next) => {
	let id = req.params.id;
	let n = req.query.n;
	let file = req.query.file;
	file = path.join(__dirname, '../storage', file.substr(0, 6), file);
	sql = `UPDATE gallery SET savefile${n}=NULL, realfile${n}=NULL WHERE id=${id}`;
	connect = await pool.getConnection();
	result = await connect.execute(sql);
	connect.release();
	fs.unlink(file, (e) => {
		if(e) res.json({code: 500, error: e});
		else res.json({code: 200});
	});
});

module.exports = router;