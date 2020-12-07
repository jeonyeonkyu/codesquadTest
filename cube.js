
class CubeModel {
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
}

//Node.js 실행 모듈
const useModule = ({ cubeModel }) => {
  const readline = require('readline');
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  rl.setPrompt('CUBE> ');
  rl.prompt();
  rl.on("line", (line) => {
    cubeModel.inputWord[line.toUpperCase()]();
    if (line.toUpperCase() === 'Q') {
      rl.close();
    }
    console.table(cubeModel.flatCube);
    rl.prompt();
  })
  rl.on("close", () => {
    process.exit();
  })
}

const convertInput = (line) => {
  const result = [];
  for(let i = 0; i < line.length; i++){
    if(line[i+1] && line[i+1] === '\''){
      result.push(line.substring(i,i+2));
      i++;
    }else{
      result.push(line[i]);
    }
  }
  return result;
}

//Node.js 실행하기
const flatCube = [['R', 'R', 'W'], ['G', 'C', 'W'], ['G', 'B', 'B']];
const cubeModel = new CubeModel({ flatCube });
// useModule({ cubeModel });
console.log(convertInput('U\'U\'U\'LLL\''));

