const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');
const pug = {headTitle: "Node/Express 갤러리", css: "gallery", js: "gallery"};
const { pool, mysqlErr, queryExecute, fileRev, uploadPath, storagePath } = require('../modules/mysql-conn');
const { upload } = require('../modules/multer-conn');
const pagerInit = require('../modules/pager-conn');

let sql, sqlVal = [], result, pager;

router.get(['/', '/list', '/list/:page'], async (req, res, next) => {
	pug.title = '갤러리 리스트';	
	try {
		req.query.cnt = req.query.cnt || 15;
		pager = await pagerInit(req, '/gallery/list', 'gallery');
		sql = 'SELECT * FROM gallery ORDER BY id DESC LIMIT ?, ?';
		sqlVal = [pager.stRec, pager.cnt];
		result = await queryExecute(sql, sqlVal);
		pug.pager = pager;
		pug.lists = result;
		for(let v of pug.lists) {
			v.src = '//via.placeholder.com/300';
			v.src2 = v.src;
			if(v.savefile || v.savefile == '') {
				v.src = uploadPath(v.savefile);
				v.src2 = v.src;
			}
			if(v.savefile2 || v.savefile2 == '') {
				v.src2 = uploadPath(v.savefile2);
			}
		}
		res.render('gallery/gallery-li.pug', pug);
	}
	catch(e) {
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
		result = await queryExecute(sql);
		pug.list = result[0];
		if(pug.list.savefile) pug.list.src = uploadPath(pug.list.savefile);
		if(pug.list.savefile2) pug.list.src2 = uploadPath(pug.list.savefile2);
	}
	res.render('gallery/gallery-wr.pug', pug);
});

router.get('/view/:id', async (req, res, next) => {
	let id = req.params.id;
	try {
		sql = 'SELECT * FROM gallery WHERE id=' + id;
		result = await queryExecute(sql);
		res.json(result[0]);
	}
	catch(e) {
		res.json(e);
	}
});

router.get('/rev/:id', async (req, res, next) => {
	try {
		let id = req.params.id;
		let savefile = req.query.savefile;
		let savefile2 = req.query.savefile2;
		if(savefile) await fileRev(savefile);
		if(savefile2) await fileRev(savefile2);
		sql = 'DELETE FROM gallery WHERE id='+id;
		result = await queryExecute(sql);
		res.redirect('/gallery');
	}
	catch(e) {
		next(e);
	}
});

router.get('/download/:id', async (req, res, next) => {
	let id = req.params.id;
	let seq = req.query.seq;
	let savefile, realfile;
	try {
		sql = `SELECT savefile${seq}, realfile${seq} FROM gallery WHERE id=${id}`;
		result = await queryExecute(sql);
		savefile = result[0][`savefile${seq}`]; // result[0][0]['savefile2'] == result[0][0].savefile2
		realfile = result[0][`realfile${seq}`];
		savefile = storagePath(savefile);
		// C:\Users\hi\Documents\임덕규\20.node-board\storage\200731\200731-sdfj-sdjf...jpg
		res.download(savefile, realfile);
	}
	catch(e) {
		next(e);
	}
});

router.post('/save', upload.fields([{name: 'upfile'}, {name: 'upfile2'}]), async (req, res, next) => {
	let { id, savefile, savefile2, title, writer, content } = req.body;
	if(req.banExt) {
		res.send(`<script>alert('${req.banExt} 타입은 업로드 할 수 없습니다.')</script>`);
	}
	else {
		try {
			sqlVal[0] = title;
			sqlVal[1] = writer;
			sqlVal[2] = content;
			if(id) sql = 'UPDATE gallery SET title=?, writer=?, content=?';
			else sql = 'INSERT INTO gallery SET title=?, writer=?, content=?';
			if(req.files['upfile']) {
				if(id && savefile) await fileRev(savefile);
				sql += ', realfile=?, savefile=?';
				sqlVal.push(req.files['upfile'][0].originalname);
				sqlVal.push(req.files['upfile'][0].filename);
			}
			if(req.files['upfile2']) {
				if(id && savefile2) await fileRev(savefile2);
				sql += ', realfile2=?, savefile2=?';
				sqlVal.push(req.files['upfile2'][0].originalname);
				sqlVal.push(req.files['upfile2'][0].filename);
			}
			if(id) sql += ' WHERE id='+id;
			await queryExecute(sql, sqlVal);
			res.redirect('/gallery');
		}
		catch(e) {
			next(e);
		}
	}
});

router.get('/api-img/:id', async (req, res, next) => {
	try {
		let id = req.params.id;
		let { n, file } = req.query;
		sql = `UPDATE gallery SET savefile${n}=NULL, realfile${n}=NULL WHERE id=${id}`;
		await queryExecute(sql);
		result = await fileRev(file);
		res.json(result);
	}
	catch(e) {
		res.json(e);
	}
});

module.exports = router;