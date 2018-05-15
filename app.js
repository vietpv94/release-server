'use strict';
const fs = require('fs');
const express = require('express');
const path = require('path');
const app = express();
const url = require('url');

app.use(require('morgan')('dev'));

app.use('/updates/win32/latest', express.static(path.join(__dirname, 'releases/win32')))
app.get('/updates/darwin/latest', (req, res) => {
  
  const dir = `${__dirname}/releases/darwin`;
  const latest = getLatestRelease(dir);
  const clientVersion = req.query.v;

  if (clientVersion === latest) {
    res.status(204).end();
  } else {
    res.json({
      url: `${getBaseUrl()}/releases/darwin/${latest}/MyApp.zip`
    });
  }
});

app.get('/updates/win32/latest', (req, res) => {
  
  const dir = `${__dirname}/releases/win32`;
  const latest = getLatestRelease(dir);
  const clientVersion = req.query.v;
  
  if (clientVersion === latest) {
    res.status(204).end();
  } else {
    res.json({
      url: `${getBaseUrl()}/releases/win32/${latest}/demo-form-demo.dmg.zip`
    });
  }
});

let getLatestRelease = (dir) => {

  const versionsDesc = fs.readdirSync(dir).filter((file) => {
    const filePath = path.join(dir, file);
    return fs.statSync(filePath).isDirectory();
  }).reverse();

  return versionsDesc[0];
}

let getBaseUrl = () => {
    return 'http://localhost:8080';
}

app.listen(8080, () => {
  console.log(`Express server listening on port 8080`);
});