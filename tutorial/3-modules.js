// GLOBALS - NO WINDOW!!!!

// __dirname - path to current directory
// __filename - file name
// require - function to user modules
// module - info about current module
// process - info about env where the program is being executed

// console.log(__dirname);
// let test = setInterval(() => {
//     console.log('hello world')
// }, 1000);

// Modules

// const secret = "SUPER SECRET";
// const john = "John";
const names = require('./4-names');
// const { john } = require('./4-names');
const sayHi = require('./5-utils');
const data = require('./6-alternative-flavor')
require('./7-mind-grenade');

console.log(names);
console.log(sayHi);
console.log(data);

sayHi(names.john);
sayHi(names.peter);
// 만약 4-names.js 라는 다른 파일로 sayHi 함수와 john 변수를 이동시키면? app.js에서 실행할 수 없다.
// 왜냐하면 다른 모듈로 분리했지만 불러오지 않았기 때문이다.
