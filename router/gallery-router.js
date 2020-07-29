const express = require('express');
const router = express.Router();

router.get(['/', '/list', '/list/:page'], (req, res, next) => {
	res.send("리스트");
});

router.post(['/wr', '/wr/:id'], (req, res, next) => {
	res.send("글작성");
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

module.exports = router;