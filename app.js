const express = require('express');
const app = express();
const path = require('path');

const publicPath = path.join(__dirname, './public');
const viewsPath = path.join(__dirname, './views');

const boardRouter = require('./router/board');
const memberRouter = require('./router/member');

app.listen(3000, () => { console.log('http://127.0.0.1:3000') });

app.set('view engine', 'pug');
app.set('views', viewsPath);
app.locals.title = '노드 게시판';
app.locals.pretty = true;

