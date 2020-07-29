const express = require('express');
const app = express();
const path = require('path');

app.listen(3001, () => { console.log('http://127.0.0.1:3001'); });

app.use("/", express.static(path.joins(__dirname, './public')));
app.use("/uploads", express.static(path.joins(__dirname, './storage')));