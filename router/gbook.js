const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
	const pug = { css: 'gbook', js: 'gbook' };
	res.render('gbook/gbook.pug', pug);
});

module.exports = router;