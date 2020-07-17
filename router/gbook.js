const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
	res.render('gbook/gbook.pug');
});

module.exports = router;