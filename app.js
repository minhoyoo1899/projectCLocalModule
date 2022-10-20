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

// //index
// indexRouter('/source/img/bg_dpimg.png');
// indexRouter('/source/vod/tekken8.mp4');
// indexRouter('/public/js/index.js');
// indexRouter('/public/js/action/vodEvent.js');
// indexRouter('/public/js/style/indexCss.js');
// indexRouter('/public/js/style/style.js');
// indexRouter('/public/css/index.css');

// //administrator
// indexRouter('/public/css/admin.css');
// indexRouter('/public/js/style/admin.js');
// indexRouter('/source/adimg/admin-icon02.png');
// indexRouter('/source/adimg/upMedia.png');
// indexRouter('/source/adimg/visiors_graph.png');
// indexRouter('/source/adimg/board.png');
// indexRouter('/source/adimg/good.png');
// indexRouter('/source/adimg/click.png');
// indexRouter('/source/adimg/views.png');


// //clientInfo aside
// indexRouter('/public/css/clientInfo/clientInfo.css');
// indexRouter('/public/js/style/clientInfo/myFavoMov.js');
// indexRouter('/public/js/style/clientInfo/styleMaker.js');
// indexRouter('/source/img/client_info_icon.png');

//clientInfo main img
// indexRouter('/source/img/client_info__movie1.png');
// indexRouter('/source/img/client_info__movie2.png');
// indexRouter('/source/img/client_info__movie3.png');
// indexRouter('/source/img/client_info__movie4.png');
// indexRouter('/source/img/client_info__movie5.png');
// indexRouter('/source/img/client_info__movie6.png');
// indexRouter('/source/img/client_info__pentagon.png');

app.use('/public', express.static(__dirname + '/public'));
app.use('/source', express.static(__dirname + '/source'));





app.get('/', (req, res) => { 
  //res.send('Hello, Express');
  res.sendFile(path.join(__dirname, '/public/index.html'));
});

app.get('/adminLogin', (req, res) => { 
  res.sendFile(path.join(__dirname, '/public/views/admin/adminLogin.html'));
});

app.get('/adminPage', (req, res) => { 
  res.sendFile(path.join(__dirname, '/public/views/admin/adminiPage.html'));
});

app.get('/myFavoMov', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/views/clientInfo/myFavoMov.html'));
});

app.get('/myInfo', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/views/clientInfo/myInfo.html'));
});

app.get('/writeFrame', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/views/board/writeForum.html'));
});

app.get('/searchMovie', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/views/search/movieList.html'));
});



app.listen(app.get('port'), () => { 
  console.log(app.get('port'), '번 포트에서 대기 중');
});
