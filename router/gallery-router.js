const express = require('express');
const router = express.Router();
const pug = {headTitle: "Node/Express 갤러리", css: "gallery", js: "gallery"};
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

router.post('/save', upload.array('upfile'), (req, res, next) => {
	if(req.banExt) {
		res.send(`<script>alert('${req.banExt} 타입은 업로드 할 수 없습니다.')</script>`);
	}
	else {
		res.send(req.files);
	}
});

module.exports = router;