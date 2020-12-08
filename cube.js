class CubeModel {
  constructor() {
    this.flatCubeColorArray = ['B', 'W', 'O', 'G', 'Y', 'R'];
    this.flatCube = this.flatCubeColorArray.map(element =>
      Array.from({ length: 3 }, () => new Array(3).fill(element)));
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

  printFlatCube() { //큐브 출력하기
    this.flatCube[0].forEach(element => {
      process.stdout.write('        ');
      console.log(element.join(' '));
    })
    console.log();
    for (let i = 0; i < 3; i++) {
      for (let j = 1; j < 5; j++) {
        process.stdout.write(this.flatCube[j][i].join(' '));
        process.stdout.write('   ');
      }
      console.log();
    }
    console.log();
    this.flatCube[5].forEach(element => {
      process.stdout.write('        ');
      console.log(element.join(' '));
    })
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
    console.log(); //한줄 띄어서 쓰기용
    const lineArray = convertInputToArray(line);
    lineArray.forEach((element) => {
      cubeModel.inputWord[element.toUpperCase()]();
      if (element.toUpperCase() === 'Q') {
        rl.close();
      }
      console.log(element);
      cubeModel.printFlatCube();
      console.log(); //한줄 띄어서 쓰기용
    })
    rl.prompt();
  })
  rl.on("close", () => {
    process.exit();
  })
}

const convertInputToArray = (line) => {
  const result = [];
  for (let i = 0; i < line.length; i++) {
    if (line[i + 1] && line[i + 1] === '\'') {
      result.push(line.substring(i, i + 2));
      i++;
    } else {
      result.push(line[i]);
    }
  }
  return result;
}

//Node.js 실행하기

const cubeModel = new CubeModel();
// cubeModel.printFlatCube();
// console.log(); //한줄 띄어서 쓰기용
// useModule({ cubeModel });

cubeModel.printFlatCube()