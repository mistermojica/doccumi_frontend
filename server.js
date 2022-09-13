require('dotenv').config();
const express = require('express');
const path = require('path');
const app = express();

app.use(express.static('build'));
app.use(express.static(path.join(__dirname, '/build')));

app.use(function (req, res, next) {
  return next();
})

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
})

app.listen(process.env.PORT || 8080);