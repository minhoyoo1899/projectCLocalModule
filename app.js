import express from 'express';
import path from 'path';
import mysql from 'mysql';
import request from 'request';
import * as fs from 'fs';
import cookieParser, { signedCookies } from 'cookie-parser';
//import credentials from './development.json';
//import * as json  from 'json';
//const credentials = require('./development.json');

const dbconfig = {
  host: 'localhost',
  user: 'root',
  password: 'TheoHernandez19!',
  port:'8282',
  database: 'in_the_m'
}

const connection = mysql.createConnection(dbconfig);

const app = express();
app.set('port', process.env.PORT || 3000);

const __dirname = path.resolve();

app.use('/public', express.static(__dirname + '/public'));
app.use('/source', express.static(__dirname + '/source'));

//bodyparser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser("mycookie"));



app.get('/', (req, res) => { 
  res.sendFile(path.join(__dirname, '/public/index.html'));
  if (req.signedCookies !== undefined) { 
    console.log(req.signedCookies);
  }
  //req.clearCookie('쿠키이름');
});
// app.get('/', (req, res) => { 
//   //res.send('Hello, Express');
//   // res.sendFile(path.join(__dirname, '/public/index_2.html'));
//   fs.readFile("./public/index_2.html", "utf-8", (err, data) => {
//     console.log(req.signedCookies);
//     if (err) throw err;
//     console.log(data);    
//     if (req.signedCookies !== undefined) {
//       const temp = data.replace('<Ahyeon-SignIn>', "none").replace('<Ahyeon-SignOut>', "flex");
//       res.send(temp);
//     } else {
//       const temp = data.replace('<Ahyeon-SignOut>', "none").replace('<Ahyeon-SignIn>', "flex");
//       res.send(temp);
//     }

//   });

  app.get('/clearLogIn', (req, res) => { 
    req.clearCookie('USER_SEQ');
    res.redirect('/');
  });


  // if (req.cookies !== null) {
  //   // console.log(req);
  //   // console.log("Cookies: ", req.cookies);
  //   // console.log(req.cookies);
  //   // console.log(req.signedCookies)
  //   // console.log(req.signedCookies.USER_SEQ);
  //   //console.log(req.cookies);
  //   //console.log(Array.isArray(req.cookies));    
  //   //console.log(typeof req.cookies);
  // }  
// });

app.get('/adminLogin', (req, res) => { 
  res.sendFile(path.join(__dirname, '/public/views/admin/adminLogin.html'));
});

app.get('/adminPage', (req, res) => { 
  res.sendFile(path.join(__dirname, '/public/views/admin/adminiPage.html'));
});

app.get('/myInfo', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/views/clientInfo/myInfo.html'));
});

app.get('/myFavoMov', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/views/clientInfo/myFavoMov.html'));
});

app.get('/myBoard', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/views/clientInfo/myBoard/myboard.html'));
});


app.get('/writeFrame', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/views/board/writeForum.html'));
});

app.get('/searchMovie', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/views/search/movieList.html'));
});

app.get('/boardHead', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/views/clientInfo/myBoard/myboardHead.html'));
});

app.get('/board', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/views/board/board.html'));
});

app.get('/textContent', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/views/board/textContent.html'));
});

app.get('/logIn', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/views/logIn/login.html'));
});

app.get('/movieInfo', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/views/movieInfo/movieInfor.html'));
});

app.get('/signInPage', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/views/signInPage/signInPage.html'));
});

app.get('/slider', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/views/slider/moveSlide.html'));
});

app.get('/randomMovie', (req, res) => {
  console.log(req.query);
  fs.readFile("./public/views/randomMovie/randomMovie.html", "utf-8", (err, data) => {
    if (err) throw err;
    console.log(data);
    
    const script = `
    <script defer>
      //console.log(drawer);
      const title = '${req.query.title}';
      console.log(title);
    </script>`;
    const tmeplate = data.replace('<ymi-script>', script);
    
    res.send(tmeplate);
  });
  //res.sendFile(path.join(__dirname, '/public/views/randomMovie/randomMovie.html'));  
});

const randomMovie = (sqlParam, tobus, code, res) => {
  const sql = `SELECT id,title,repRlsDate,nation,rating,runtime,genre,directors,plots,actors,posters FROM movie_api WHERE genre LIKE '%${sqlParam}%' ORDER BY RAND() LIMIT 1`;
  connection.query(sql, (error, rows) => {
    if (error) throw error;
    //console.log(rows);
    fs.readFile("./public/views/randomMovie/randomMovie_2.html", "utf-8", (err, data) => {
      if (err) throw err;
      //console.log(rows);
      //console.log(data);
      //console.log(rows[0].posters);
      const tobusURL = tobus;
      const tmeplating = (page,url,title, date, nation, runtime, rating, genre, directors, actors, plots, code) => {
        const temp = page.replace('<RDN-Poster>', url)
          .replace('<RDN-Title>', title)
          .replace('<RDN-repRlsDate>', date)
          .replace('<RDN-Nation>', nation)
          .replace('<RDN-Runtime>', runtime)
          .replace('<RDN-Rating>', rating)
          .replace('<RDN-Genre>', genre)
          .replace('<RDN-Director>', directors)
          .replace('<RDN-Actor>', actors)
          .replace('<RDN-Polots>', plots)
          .replace('<RDN-GenCode>', code);
          res.send(temp);
      }

      if (rows[0].posters === "" || rows[0].posters === null) {
        tmeplating(data, tobusURL, rows[0].title, rows[0].repRlsDate, rows[0].nation, rows[0].runtime, rows[0].rating, rows[0].genre, rows[0].directors, rows[0].actors, rows[0].plots, code);  
      } else {        
        tmeplating(data, rows[0].posters, rows[0].title, rows[0].repRlsDate, rows[0].nation, rows[0].runtime, rows[0].rating, rows[0].genre, rows[0].directors, rows[0].actors, rows[0].plots, code);
      }      
    });
  });
}


app.get('/randMovie', (req, res) => { 
  //console.log(req.query);
  //console.log(req.query.param);
  //console.log(req.query.index);
  randomMovie(req.query.param, "./source/img/TBUS_2.png", req.query.index, res);
});



app.get('/anotherRand', (req, res) => {
  const genCode = req.query.index;
  //console.log(genCode);
  //console.log(typeof genCode);

  const genreArr = ['코메디', '공포', '액션', '어드벤처', '로맨스', '드라마', 'SF', '범죄'];  
  
    switch (genCode) {
      case '0':        
        randomMovie(genreArr[0], "./source/img/TBUS_2.png", genCode, res);
        break;
      case '1':        
        randomMovie(genreArr[1], "./source/img/TBUS_2.png", genCode, res);
        break;
      case '2':        
        randomMovie(genreArr[2], "./source/img/TBUS_2.png", genCode, res);
        break;
      case '3':        
        randomMovie(genreArr[3], "./source/img/TBUS_2.png", genCode, res);
        break;
      case '4':        
        randomMovie(genreArr[4], "./source/img/TBUS_2.png", genCode, res);
        break;
      case '5':        
        randomMovie(genreArr[5], "./source/img/TBUS_2.png", genCode, res);
        break;
      case '6':        
        randomMovie(genreArr[6], "./source/img/TBUS_2.png", genCode, res);
        break;
      case '7':        
        randomMovie(genreArr[7], "./source/img/TBUS_2.png", genCode, res);
        break;
    }
});






app.get('/noticeBoard', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/views/board/noticeBoard/noticeBoard.html'));
});

app.get('/movieParam', (req, res) => {
  console.log(req);
  console.log(req.query);
  console.log(req.query.title);
  let nation;
  switch (req.query.nation) {
    case "ko":
      nation = "대한민국";
      break;
    case "en":
      nation = "미국";
      break;
  }
  res.send(`
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="/public/css/movieInfo/movieInfor.css" defer/>
  </head>
  <body>
    <div id="root">
      <div class="maindiv">
        <div class="section">
          <div class="poster">
            <img src="https://image.tmdb.org/t/p/original${req.query.poster}" style="width: 100%;"/>
          </div>
          <div class="informa"><span> </span>
            <div>${req.query.title}</div>
            <span> 평점 </span><div>⭐⭐⭐⭐⭐${req.query.rate}</div>
            <span> 개요 </span><div> 액션/범죄 | ${nation} | 129분 |${req.query.date} 개봉</div>
            <span> 감독 </span><div> 이석훈 </div> 
            <span> 등급 </span><div> [국내]15세 관람가 </div> 
            <span> 출연 </span><div> 현빈 </div> 
            <span></span>
            <div>${req.query.text}</div>
          </div>
        </div>
        <div class="like">
          <button>찜하기💗</button>
        </div>
      </div>
    </div>
  </body>
</html>
`);
});

app.get('/randomMovieParam', (req, res) => {
  console.log(req.query);
  let nation;
  switch (req.query.nation) {
    case "ko":
      nation = "대한민국";
      break;
    case "en":
      nation = "미국";
      break;
  }
  res.send(`
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">    
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Document</title>      
      <link rel="stylesheet" href="/public/css/randomMovie/randomMovie.css" defer/>
    </head>
    <body>
      <div id="app">
        <div id="drawer">
        <div id="card" style="transform-style: preserve-3d; transform: rotateY(0deg); transition: all 1s ease 0s; background-image: url('${req.query.poster}'); background-size: contain;">
          <div id="front" style="backface-visibility: visible;"></div>
          <div>
            <div>
              <div>
                <span> 개봉: ${req.query.date} </span>
              </div>
            <div>
              <span> 국가 : ${nation} </span>
            </div>
            <div>
              <span> 평점: ${req.query.rate}점 </span>
            </div>
            <div>
              <span> 시놉시스 : ${req.query.text} </span>
            </div>
          </div>
         </div>
        </div>
       </div>
        <span>${req.query.title}</span>
        <button>다른영화 추천 받기</button>
      </div>
      <script>
        const drawer = document.getElementById('drawer');
        const card = document.getElementById('card');
        const front =document.getElementById('front');

        let isClick = true;

        drawer.addEventListener('click', ()=>{
          if(isClick===true){
            isClick = false;
            //console.log(isClick);
        
            card.style.transformStyle = "preserve-3d";
            card.style.transform = "rotateY(180deg)";
            card.style.transition = "1s";
          } else {
            isClick = true;
            //console.log(isClick);
        
            card.style.transformStyle = "preserve-3d";
            card.style.transform = "rotateY(0deg)";
            card.style.transition = "1s";
            front.style.backfaceVisibility = "visible";
          }
        });
      </script>
    </body>
  </html>
  `);
});









app.get('/apiDB', (req, res) => {
  res.sendFile(path.join(__dirname, '/build/apiDB.html'));
});

app.get('/dbtest', (req, res) => {
  connection.query('SELECT * FROM director', (error, rows) => {
    if (error) throw error;
    console.log(`data : ${rows}`);
    res.send(rows);
  });
});

app.get("/dbtest3", (req, res) => {
  connection.query("SELECT * FROM director", (error, rows) => {
    if (error) throw error;
    console.log(`data : ${rows}`);
    //res.send(rows);
    fs.readFile("./build/dbhtml.html", "utf-8", (err, data) => {
      for (let i = 0; i < data.length; i++) {
        console.log(`data[${i}] : ${data[i]}`);        
        // i = 417, 418사이가 root태그 안
      }

      const front = data.slice(0, 417);
      const back = data.slice(418, data.length - 1);
      const total = [rows[0].DIRECTOR_NAME];
      total.unshift(front);
      total.push(back);
      //console.log(total);
      res.send(`${total}`);
    });
  });
});


app.get("/dbtest4", (req, res) => {
  connection.query("SELECT * FROM director", (error, rows) => {
    if (error) throw error;
    console.log(`data : ${rows}`);
    //res.send(rows);
    fs.readFile("./build/dbhtml.html", "utf-8", (err, data) => {
      if (err) throw err;
      console.log(data);
      const temp = data.replace('<ymh>', rows[0].DIRECTOR_NAME);
      res.send(temp);
    });
  });
});

// app.get('/dbtest2', (req, res) => { 
//   connection.query('SELECT * FROM director', (error, rows) => {
//     if (error) throw error;
//     console.log(`data : ${rows}`);
//     const html = readFileSync(__dirname + '/build/apiDB.html');
//     res.json({html: html.toString(), data: rows});
//   });
// });


app.get('/dbPage', (req, res) => { 
  connection.query('SELECT * FROM director', (error, rows) => {
    if (error) throw error;
    res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>In-The-M-ovie- Express!</title>
    </head>
    <body>
        <div id="app">
         rows : ${rows} <br/>
         rows[0] :${rows[0]} <br/>
         rows[0].DIRECTOR_SEQ :  ${rows[0].DIRECTOR_SEQ} <br/>
         rows[0].DIRECTOR_NAME : ${rows[0].DIRECTOR_NAME} <br/>
         rows[0].DIRECTOR_CODE : ${rows[0].DIRECTOR_CODE} <br/>
        </div>
    </body>
    </html>`);
    //console.log(`data : ${rows}`);
    console.log(rows);
    console.dir(rows);
    console.dir(rows[0]);
    console.dir(rows[0].DIRECTOR_SEQ);
    //console.dir(typeof rows);
    //console.dir(Array.isArray(rows));
  });
});

app.get('/api', (req, res) => {
  const apiURL = 'https://api.koreafilm.or.kr/openapi-data2/wisenut/search_api/search_json2.jsp?';  
  const apiKey = '7204O8KH4D5547Q3JBB7';
  const genre = "로맨스";
  const startDate = 20220222;
  const kmdb_url = `https://api.koreafilm.or.kr/openapi-data2/wisenut/search_api/search_json2.jsp?collection=kmdb_new2&ServiceKey=7204O8KH4D5547Q3JBB7&detail =Y&genre=${encodeURI(genre)}&releaseDts=20221009&listCount=50`;
  const options = {
    method: 'GET',
    url: kmdb_url,
    headers: {
      Cookie: 'JSESSIONID=E5F2C3985D522765327DD7D107C07129'
    }
  }

  request(options, (error, response) => {
    if (error) throw new Error(error);
    console.log(response.body);
    res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>In-The-M-ovie - Express!</title>
    </head>
    <body>
        <div id="app">
          api : ${response.body}
        </div>
    </body>
    </html>`);
  });
});

app.post('/writeText', (req, res) => { 
  const title = req.body.forum_title;
  const writer = req.body.ueser_name;
  const context = req.body.user_message;  
  
  const sql = "INSERT INTO `board_` (`BOARD_TITLE`,`BOARD_CONTEXT`,`USER_NAME`, `BOARD_DATE`) VALUES ('"+title+"','"+writer+"','"+context+"', NOW())";
  
  connection.query(sql, (err, result, field) => {
    if (err) {
      console.log(err);
      res.status(500).send('Internal Server Error');
    }
  });
  res.redirect('/writeFrame');
});


app.get('/boardList', (req, res) => {
  const sql = "SELECT BOARD_SEQ, BOARD_TITLE, USER_NAME, DATE_FORMAT(BOARD_DATE, '%Y-%m-%d %H:%i:%s') FROM board_ ORDER BY BOARD_SEQ DESC";
  
  connection.query(sql, (err, result, field) => {
    if (err) {
      console.log(err);
      res.status(500).send('Internal Server Error');
    }
    console.log(result);
    console.log(result[0]["DATE_FORMAT(BOARD_DATE, '%Y-%m-%d %H:%i:%s')"]);    
    fs.readFile("./public/views/board/board_2.html", "utf-8", (err, data) => {
      if (err) throw err;
      // console.log(data);      
      
      const listArr = [];
      for (let i = 0; i < result.length; i++) {
        const listTemplate = `
              <tr>
                <td>${result[i].BOARD_SEQ}</td>
              <th>
                <a href="/viewContext?BOARD_SEQ=${result[i].BOARD_SEQ}">
                ${result[i].BOARD_TITLE}
                </a>
              </th>
                <td>${result[i].USER_NAME}</td>
                <td>${result[i]["DATE_FORMAT(BOARD_DATE, '%Y-%m-%d %H:%i:%s')"]}</td>
              </tr>`;
        listArr.push(listTemplate);
      }

      const temp = data.replace('<Ahyeon>', listArr.join(""));
      res.send(temp);
    });
  });
});

app.get('/viewContext', (req, res) => { 
  const sql = `SELECT BOARD_TITLE,DATE_FORMAT(BOARD_DATE, '%Y-%m-%d %H:%i:%s'),BOARD_CONTEXT,BOARD_SEQ FROM board_  WHERE BOARD_SEQ = ${req.query.BOARD_SEQ}`;

  connection.query(sql, (err, result, field) => { 
    if (err) {
      console.log(err);
      res.status(500).send('Interbal Server Error');
    }
    fs.readFile("./public/views/board/noticeBoard/noticeBoard_2.html", "utf-8", (err, data) => {
      if (err) throw err;
      // console.log(result);
      // console.log(data);
      const temp = data.replace('<Ahyeon-Title>', result[0].BOARD_TITLE)
        .replace('<Ahyeon-Name>', result[0].BOARD_TITLE)
        .replace('<Ahyeon-Date>', result[0]["DATE_FORMAT(BOARD_DATE, '%Y-%m-%d %H:%i:%s')"])
        .replace('<Ahyeon-Context>', result[0].BOARD_CONTEXT)
        .replace('<Ahyeon-SEQ>', result[0].BOARD_SEQ);
      console.log(temp);
      res.send(temp);
    });
  });
  //console.log(req);
  //console.log(req.query);
  //console.log(req.query.BOARD_SEQ);
});



app.post("/signUp", (req, res) => {
  console.log(req);
  console.log(req.body);
  const nicName = req.body.nicName;
  const email = req.body.email;
  const password = req.body.password;
  const sql =
    "INSERT INTO `user_` (`USER_NAME`, `USER_ENAME`, `USER_PASS`) VALUES ('" +
    nicName +
    "', '" +
    email +
    "', '" +
    password +
    "')";
  connection.query(sql, (err, result, field) => {
    if (err) {
      console.log(err);
      res.status(500).send("Internal Sever Error");
    }
  });
  res.redirect("/signInPage");
});


app.post("/signIn", (req, res) => {
  console.log(req.body);
  const nickname = req.body.nickName;
  const password = req.body.pwd;
  console.log(nickname);
  console.log(password);  
  const sql = `SELECT USER_SEQ,USER_PASS FROM in_the_m.user_ where USER_NAME = "${nickname}";`;
  connection.query(sql, (err, result, field) => {
    if (err) {
      console.log(err);
      res.status(500).send("Internal Server Error");
    }
    if (result[0].USER_PASS === password) {
      console.log(result);
      // const expiresd = new Date();
      // const expiryDate = new Date(Date.now() + 60 * 60 * 1000 * 24 * 7); // 24 hour 7일
      const exDat = new Date(Date.now() + 1000 * 60 * 60);
      const seq = result[0].USER_SEQ;
      
      // res.writeHead(302, {
      //   Location: '/',
      //   'Set-Cookie': `USER_SEQ='${encodeURIComponent(seq)}'; Expires=${exDat}; HttpOnly; Path=/`,
      // });
      
      // 쿠키 유효시간을 현재시간 +5분으로 설정
      //expiresd.setMinutes(expires.getMinutes() + 5);
      //expiresd.toGMTString()
      res.cookie('USER_SEQ', seq, { expires: exDat, httpOnly: false, signed: true }).send(`<script>alert('로그인되었습니다.'); location.href='/';</script>`);
      //res.send(`<script>alert('로그인되었습니다.'); location.href='/';</script>`);
      // console.log(req.cookies);      
      //console.log("Cookies: ", req.cookies);     
    } else {
      res.send(
        "<script>alert('비밀번호가 틀립니다.'); location.href='/logIn';</script>"
      );
    }
    //console.log(result);
    //console.log(result[0].USER_PASS);    
  });
  //res.redirect("/logIn");
});

app.listen(app.get('port'), () => {
  console.log(app.get('port'), '번 포트에서 대기 중');
});