import styleMaker from "./style/style.js";
import indexCss from "./style/indexCss.js";
import vodExpl from "./action/vodEvent.js"

const arrTag = [];
const root = document.getElementById("root");

styleMaker.tagMaker(root, "div", "");

const indexDiv = root.children[0];
const indexDivChilren = ["img", "header", "main", "footer"];

styleMaker.tagMaker(indexDiv, indexDivChilren, "");

const bg_img = indexDiv.children[0];
const header = indexDiv.children[1];
const main = indexDiv.children[2];
const footer = indexDiv.children[3];

bg_img.src = "./source/img/bg_dpimg.png";

styleMaker.tagMaker(header, "div", "");
const menuDiv = header.children[0];
const menuDivChildren = ["div", "div", "div", "div", "div"];
styleMaker.tagMaker(menuDiv, menuDivChildren, "");

const searchDiv = menuDiv.children[0];
searchDiv.textContent = "검색";
searchDiv.style.cursor = "pointer";
searchDiv.addEventListener('click', (event) => {
  location.href = '/searchMovie';
});
const signDiv = menuDiv.children[1];
signDiv.style.cursor = "pointer";
signDiv.textContent = "로그인";

signDiv.addEventListener('click', (event) => {
  location.href = '/logIn';
});

const signOutDiv = menuDiv.children[2];
signOutDiv.style.cursor = "pointer";
signOutDiv.style.display = "none";
signOutDiv.textContent = "로그아웃";

const myInfoDiv = menuDiv.children[3];
myInfoDiv.style.cursor = "pointer";
myInfoDiv.textContent = "마이페이지";

myInfoDiv.addEventListener('click', (event) => {
  location.href = '/myInfo';
});


const boardDiv = menuDiv.children[4];
boardDiv.textContent = "게시판";
boardDiv.style.cursor = "pointer";
boardDiv.addEventListener('click', (event) => {
  location.href = '/boardList';
});

const mainChildren = ["div", "section"];
styleMaker.tagMaker(main, mainChildren);

const randomDiv = main.children[0];
const section = main.children[1];

const genreArr = ['코메디', '공포', '액션', '어드벤처', '로맨스', '드라마', 'SF', '범죄'];
// 코믹 : 공조 , 공포 :라이트아웃, 액션 : 존윅, 어드벤쳐 : 언챠티드, 로맨스 : 헤어질결심 드라마 : 보헤미안 랩소디 SF : 테넷 범죄/느와르 : 신세계

// const movieTitleArr = ['공조', '라이트 아웃', '존 윅 3', '언차티드', '헤어질 결심', '보헤미안 랩소디', '테넷', '신세계'];
// https://api.themoviedb.org/3/search/movie?api_key=c4fc9ca86ccc89b226126b6beccd9731&language=ko&page=1&include_adult=true&query=라이트 아웃

styleMaker.ranBtnMaker(randomDiv, genreArr);
styleMaker.singleCssMulipleStyling(randomDiv.children, indexCss.randomDivCss);

const randMovie = (param, index, targetDiv) => {
  const urlParam = `/randMovie?param=${param}&index=${index}`;
  targetDiv.addEventListener('click', (event) => {
    popup(urlParam, '랜덤 영화!', 730, 820, 100, 200, 'no');
  });
}

for (let i = 0; i < randomDiv.children.length; i++) {
  const targetDiv = randomDiv.children[i];
  randMovie(genreArr[i], i, targetDiv);
 }


// const tmdbInfo = (query, targetDiv) => {
//   const url = `https://api.themoviedb.org/3/search/movie?api_key=c4fc9ca86ccc89b226126b6beccd9731&language=ko&page=1&include_adult=true&query=${query}`;
//   const request = new XMLHttpRequest();
//   request.open("GET", url);
//   request.responseType = "json";
//   request.send();
//   request.addEventListener('load', (event) => { 
//     const apiDat = request.response;
//     console.log(apiDat);
//     const urlParam = `/randomMovieParam?title=${apiDat.results[0].title}&rate=${apiDat.results[0].vote_average}&nation=${apiDat.results[0].original_language}&text=${apiDat.results[0].overview}&date=${apiDat.results[0].release_date}&poster=https://image.tmdb.org/t/p/w500${apiDat.results[0].poster_path}`;

//     targetDiv.addEventListener('click', (event) => {
//       popup(urlParam, '검색한 영화!', 730, 820, 100, 200, 'no');
//     });
//   });  
// }

function popup(url, name, width, height, top, left, location){    
  const option = `width = ${width}, height = ${height}, top = ${top}, left = ${left}, location = ${location}`;
  window.open(url, name, option);
  // 500 500 100 200 no
}

// for (let i = 0; i < randomDiv.children.length; i++) {
//   const target = randomDiv.children[i];
//   tmdbInfo(movieTitleArr[i], target);
// }


 

const sectionChidren = ["div", "div"];
styleMaker.tagMaker(section, sectionChidren);

const explDiv = section.children[0];
explDiv.id = "explDiv";
styleMaker.tagMaker(explDiv, "div", "설명구간");

const vodDiv = section.children[1];
styleMaker.tagMaker(vodDiv, "video");
vodDiv.style.width = "88%";

const mainVod = vodDiv.children[0];
mainVod.src = "./source/vod/Gongjo2.mp4";
mainVod.autoplay = true;
mainVod.controls = true;
mainVod.loop = true;
mainVod.muted = true;
mainVod.style.width = "100%";

vodExpl(mainVod, explDiv, 'mouseover', 'flex', 'mouseout', 'none');

arrTag.push(indexDiv);
arrTag.push(bg_img);
arrTag.push(header);
arrTag.push(menuDiv);
arrTag.push(main);
arrTag.push(randomDiv);
arrTag.push(section);
arrTag.push(explDiv);
arrTag.push(vodDiv);
arrTag.push(footer);

styleMaker.styling(arrTag, indexCss.indexCss);


styleMaker.tagMaker(footer, "div", "");
const footerDiv = footer.children[0];
const footerDivChildren = ["div", "div", "div"];
styleMaker.tagMaker(footerDiv, footerDivChildren, "");
const footerDivChildren1 = footerDiv.children[0];
footerDivChildren1.innerHTML = "사업자번호 : 123-45-678910  대표: 이아연";
const footerDivChildren2 = footerDiv.children[1];
footerDivChildren2.innerHTML = "(12345) 대전광역시 서구 대덕로 182, 오라클빌딩 3층";
const footerDivChildren3 = footerDiv.children[2];
footerDivChildren3.innerHTML = "전화 : 010-159-7598  팩스 : 042-4562-1456  이메일 : support@google.com"

footerDiv.style.width = "auto";
footerDiv.style.height = "300px";
footerDiv.style.display = "flex";
footerDiv.style.flexDirection = "column";
footerDiv.style.alignContent = "center";
footerDiv.style.justifyContent = "space-around";


footerDivChildren1.style.height = "auto";
footerDivChildren2.style.height = "auto";
footerDivChildren3.style.height = "auto";