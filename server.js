var express = require('express');
var app = express();

app.get("/", (req, res) => {
  let ipaddress = '';
  let forwardedFor = req.headers['x-fo']
  
  let software = '';
  let softwareExpression = /.*?\((.*?)\).*/;
  let matches = softwareExpression.exec(req.headers['user-agent']);
  if (matches.length > 1)
    software = matches[1];
  
  const data = {
    ipaddress: req.headers['x-forwarded-for'].split(',')[0],
    language: req.headers['accept-language'].split(',')[0],
    software: software
  };
  
  res.send(JSON.stringify(data));
});

var listener = app.listen(process.env.PORT, () => console.log('listening on port: ' + process.env.PORT));
