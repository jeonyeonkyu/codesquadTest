
//Node.js 실행 모듈
const useModule = () => {
  const readline = require('readline');

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  let input = [];
  rl.on("line", function (line) {
    input = line.split(' ');
    rl.close();
  })

  rl.on("close", function () {

    let A = input[0];
    let B = input[1];
    console.log(A + B);
  })
}

const receiveInput = (line) => {
  
}


//Node.js 실행하기
console.log('단어 하나, 정수 숫자하나, L또는 R을 공백으로 분리하여 순서대로 입력해주세요');
useModule();