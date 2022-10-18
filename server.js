const express = require('express');
const path = require('path');
const app = express();
app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname + '/build')));
app.use(function(req, res, next) {
  res.setHeader("Content-Security-Policy", "frame-ancestors 'none'");
  res.setHeader("X-Frame-Options", "SAMEORIGIN");
  return next();
});
app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname +'/build/index.html'));
});
const port = process.env.PORT || 8080;
app.listen(port);
console.log("Server DOCCUMI Frontend Up and Running on Port:", port);
