
class Model {
  constructor({ flatCube }) {
    this.flatCube = flatCube;
    this.inputWord = {
      'U': () => this.pushLeft(0),
      'U\'': () => this.pushRight(0),
      'R': () => this.pushUp(2),
      'R\'': () => this.pushDown(2),
      'L': () => this.pushDown(0),
      'L\'': () => this.pushUp(0),
      'B': () => this.pushRight(2),
      'B\'': () => this.pushLeft(2),
      'Q': () => console.log('Bye~')
    }
  }

  pushLeft(arrayIndex) {
    const temp = this.flatCube[arrayIndex].shift();
    this.flatCube[arrayIndex].push(temp);
  }

  pushRight(arrayIndex) {
    const temp = this.flatCube[arrayIndex].pop();
    this.flatCube[arrayIndex].unshift(temp);
  }

  pushDown(arrayIndex) {
    const one = this.flatCube[0].splice(arrayIndex, 1);
    const second = this.flatCube[1].splice(arrayIndex, 1);
    const three = this.flatCube[2].splice(arrayIndex, 1);

    this.flatCube[0].splice(arrayIndex, 0, ...three);
    this.flatCube[1].splice(arrayIndex, 0, ...one);
    this.flatCube[2].splice(arrayIndex, 0, ...second);
  }

  pushUp(arrayIndex) {
    const one = this.flatCube[0].splice(arrayIndex, 1);
    const second = this.flatCube[1].splice(arrayIndex, 1);
    const three = this.flatCube[2].splice(arrayIndex, 1);

    this.flatCube[0].splice(arrayIndex, 0, ...second);
    this.flatCube[1].splice(arrayIndex, 0, ...three);
    this.flatCube[2].splice(arrayIndex, 0, ...one);
  }

  getInputAndReplace(input) {
    switch (input) {
      case 'U':
        pushLeft(0);
        break;
    }
  }
}

//Node.js 실행 모듈
const useModule = () => {
  const readline = require('readline');
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  let input = [];
  rl.on("line", function (line) {
    input = receiveInput(line);
    rl.close();
  })
  rl.on("close", function () {
    const word = input[0];
    const num = input[1];
    const direction = input[2];
    console.log(calculationOutput(word, num, direction));
  })
}

receiveInput = (line) => {
  const input = line.split('');
  return input;
}

calculationOutput = (word, num, direction) => {
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
const flatCube = [['R', 'R', 'W'], ['G', 'C', 'W'], ['G', 'B', 'B']];
const model = new Model({ flatCube });
console.table(model.flatCube);
model.inputWord['U']();
model.inputWord['U']();
model.inputWord['R']();
console.table(model.flatCube);
// process.stdout.write('CUBE> ');
// useModule();
