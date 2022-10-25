import styleMaker from '../../style/style.js';


const app = document.getElementById("app");
const main = document.createElement("main");
const header = document.createElement("header");
const footer = document.createElement("footer");

// header.style.width = "100vw";
// header.style.height = "10vh";
// header.style.backgroundColor = "rgba(45, 45, 45, 0.5)";

app.appendChild(header);
app.appendChild(main);
app.appendChild(footer);

const headerChildren = `<div><div></div><div></div><div></div><div></div><div></div></div>`;
header.innerHTML = headerChildren;
for (let i = 0; i < header.children[0].children.length; i++) {
  const target = header.children[0].children[i];
  target.style.cursor = "pointer";
  switch (i) {
    case 0:
      target.textContent = "검색";
      target.addEventListener('click', (event) => {
        location.href = '/searchMovie';
      });
      break;
    
    case 1:
      target.textContent = "로그인";
      target.addEventListener('click', (event) => {
        location.href = '/logIn';
      });
      break;
    
    case 2:
      target.textContent = "로그아웃";      
      break;
    
    case 3:
      target.textContent = "마이페이지";
      target.addEventListener('click', (event) => {
        location.href = '/myInfo';
      });
      break;
    case 4:
      target.textContent = "게시판";
      target.addEventListener('click', (event) => {
        location.href = '/board';
      });
      break;
  }
}

// function elemnet(tagName){
//   if(typeof(tagName)==="string"){
//     return `<${tagName}></${tagName}>`;
//   }
// }

// app.innerHTML = `
//   ${elemnet("div")}
//   ${elemnet("div")}
//   ${elemnet("div")}
//   `;
// ----------------#app > div *3-----------------------------

function tagMaker (parentElement, containerName, itemName, itemCount){
  const container = document.createElement(containerName);
  for(let i = 0; i < itemCount; i++){
    let item = document.createElement(itemName);
    container.appendChild(item);
  }

  parentElement.appendChild(container);
}

tagMaker(main, "div", "div", 5);
tagMaker(main, "div", "div", 5);
tagMaker(main, "div", "div", 5);
// -------------------#app > main > (div > div*5) *3--------------------------
for (let i = 0; i < main.children.length; i++) {
  const target = main.children[i];
  for (let e = 0; e < target.children.length; e++) {
    target.children[e].addEventListener('click', (event) => { 
      popup('/movieInfo', '검색한 영화!', 730, 820, 100, 200, 'no');
    });
  }
}

function popup(url, name, width, height, top, left, location){    
  const option = `width = ${width}, height = ${height}, top = ${top}, left = ${left}, location = ${location}`;
  window.open(url, name, option);
  // 500 500 100 200 no
}



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
// footer 내용 추가

footerDiv.style.width = "auto";
footerDiv.style.height = "300px";
footerDiv.style.display = "flex";
footerDiv.style.flexDirection = "column";
footerDiv.style.alignContent = "center";
footerDiv.style.justifyContent = "space-around";

// footerDivChildren1.style.width = "70%";
footerDivChildren1.style.height = "auto";
// footerDivChildren2.style.width = "70%";
footerDivChildren2.style.height = "auto";
// footerDivChildren3.style.width = "70%";
footerDivChildren3.style.height = "auto";