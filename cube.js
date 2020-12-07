//Node.js 실행 모듈
const useModule = () => {
  const readline = require('readline');

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  let input = [];
  rl.on("line", (line) => {
    input = receiveInput(line);
    rl.close();
  })
  rl.on("close", () => {
    const word = input[0];
    const num = input[1];
    const direction = input[2];
    console.log(calculationOutput(word, num, direction));
    process.exit();
  })
}

const receiveInput = (line) => {
  const input = line.split(' ');
  return input;
}

const calculationOutput = (word, num, direction) => {
  const wordArray = word.split('');
  const number = Number(num);
  let directionUppercase = direction.toUpperCase();
  if (number < 0) {
    if (directionUppercase === 'L') {
      directionUppercase = 'R';
    } else if (directionUppercase === 'R') {
      directionUppercase = 'L';
    }
  }
  for (let i = 0; i < Math.abs(number); i++) {
    if (directionUppercase === 'L') {
      const temp = wordArray.shift();
      wordArray.push(temp);
    } else if (directionUppercase === 'R') {
      const temp = wordArray.pop();
      wordArray.unshift(temp);
    }
  }
  return wordArray.join('');
}

//Node.js 실행하기
console.log('단어 하나, 정수 숫자하나, L또는 R을 공백으로 분리하여 순서대로 입력해주세요');
console.log('ex) carrot -1 r');
useModule();