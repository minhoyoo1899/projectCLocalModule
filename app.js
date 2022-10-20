import express from 'express';
import path from 'path';

//const express = require('express');

//console.log(path);
const app = express();
app.set('port', process.env.PORT || 3000);

const __dirname = path.resolve();

const indexRouter = (addr) => {
  app.get(addr, (req, res) => {
    res.sendFile(path.join(__dirname, addr));
  });
}

indexRouter('/source/img/bg_dpimg.png');
indexRouter('/source/vod/tekken8.mp4');
indexRouter('/build/index.js');
indexRouter('/build/action/vodEvent.js');
indexRouter('/build/style/indexCss.js');
indexRouter('/build/style/indexCss.js');
indexRouter('/build/style/style.js');
indexRouter('/css/index.css');

app.get('/', (req, res) => { 
  //res.send('Hello, Express');  
  res.sendFile(path.join(__dirname, '/index.html'));
});

app.listen(app.get('port'), () => { 
  console.log(app.get('port'), '번 포트에서 대기 중');
});