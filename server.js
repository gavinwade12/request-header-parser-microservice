var express = require('express');
var app = express();

app.get("/", (req, res) => {
  let ipAddress = '';
  let forwardedFor = req.headers['x-forwarded-for'];
  if (forwardedFor)
    ipAddress = forwardedFor.split(',')[0];
  
  let language = '';
  let acceptLanguage = req.headers['accept-language'];
  if (acceptLanguage)
    language = acceptLanguage.split(',')[0];
  
  let software = '';
  let softwareExpression = /.*?\((.*?)\).*/;
  let matches = softwareExpression.exec(req.headers['user-agent']);
  if (matches.length > 1)
    software = matches[1];
  
  const data = {
    ipaddress: ipAddress,
    language: language,
    software: software
  };
  
  res.send(JSON.stringify(data));
});

var listener = app.listen(process.env.PORT, () => console.log('listening on port: ' + process.env.PORT));
