const express = require('express');
const router = express.Router();
const pug = {headTitle: "Node/Express 갤러리", css: "gallery", js: "gallery"};
const { pool } = require('../modules/mysql-conn');
const { upload } = require('../modules/multer-conn');

router.get(['/', '/list', '/list/:page'], (req, res, next) => {
	res.send("리스트");
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
	let sql, sqlVal = [], connect, result;
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
			res.json(result[0]);
		}
		catch(e) {
			console.log(e);
			next(e);
		}
	}
});

module.exports = router;