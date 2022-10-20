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
const menuDivChildren = ["div", "div", "div"];
styleMaker.tagMaker(menuDiv, menuDivChildren, "");

const searchDiv = menuDiv.children[0];
searchDiv.textContent = "검색";
const signDiv = menuDiv.children[1];
signDiv.textContent = "로그인";
const boardDiv = menuDiv.children[2];
boardDiv.textContent = "게시판";

const mainChildren = ["div", "section"];
styleMaker.tagMaker(main, mainChildren);

const randomDiv = main.children[0];
const section = main.children[1];

styleMaker.ranBtnMaker(randomDiv);
styleMaker.singleCssMulipleStyling(randomDiv.children, indexCss.randomDivCss);


const sectionChidren = ["div", "div"];
styleMaker.tagMaker(section, sectionChidren);


const explDiv = section.children[0];
explDiv.id = "explDiv";
styleMaker.tagMaker(explDiv, "div", "설명구간");

const vodDiv = section.children[1];
styleMaker.tagMaker(vodDiv, "video");
vodDiv.style.width = "88%";

const mainVod = vodDiv.children[0];
mainVod.src = "./source/vod/tekken8.mp4";
mainVod.autoplay = true;
mainVod.controls = true;
mainVod.loop = true;
mainVod.muted = true;
mainVod.style.width = "100%";

vodExpl(mainVod, explDiv, 'mouseover', 'flex', 'mouseout', 'none');

footer.textContent = "여기는 푸터";

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