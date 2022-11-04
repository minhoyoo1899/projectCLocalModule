const list = [
  "강예훈", "김근수", "김승현", "마근원", "박종인", "송형주","양상희", "원두진", "유민호","_이상호","_이아연", "_전형민", "정연주", "_정윤환", "정정원", "지영빈", "_최화연", "한용준", "황초영"
];
const fs = require('fs');
const path = require('path');


class _StudentInfo {
  constructor(number, name, teamjang = false) {
    this.number = number;
    this.name = name;
    this.teamjang = teamjang;
  }
}

function setStudentInstance(array) {
  let tempArray = [];

  function checkToTeamjangReturnBoolean(string) {
    if(string[0] === "_") {
      return true;
    } else {
      return false;
    }
  }

  array.forEach((student, index) => {
    tempArray.push(new _StudentInfo(index+1, student, checkToTeamjangReturnBoolean(student)));
  });
  return tempArray;
}


const studentInfo = setStudentInstance(list);


// 19

console.log("학생 수 :", list.length);
console.log(studentInfo);