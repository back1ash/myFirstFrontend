import hello from './hello.js'; 
hello();    // hello.js에 있는 function 실행

const path = require('path');

module.exports = {
  entry: "./src/js/app.js",    // webpack이 모듈의 의존관게를 해석하는 시작점.
  output: {
    path: path.resolve(__dirname, 'dist/js'),
    filename: 'bundle.js'
  }    // 번들된 내용을 출력할 파일.
};
