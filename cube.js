class CubeModel {
  constructor() {
    this.flatCube = {
      up: Array.from({ length: 3 }, () => new Array(3).fill('B')),
      left: Array.from({ length: 3 }, () => new Array(3).fill('W')),
      front: Array.from({ length: 3 }, () => new Array(3).fill('O')),
      right: Array.from({ length: 3 }, () => new Array(3).fill('G')),
      back: Array.from({ length: 3 }, () => new Array(3).fill('Y')),
      down: Array.from({ length: 3 }, () => new Array(3).fill('R'))
    }
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

  aroundFlatBlockTurn(up, right, down, left) { //위, 오른쪽, 아래, 왼쪽을 90도 회전시키기
    const [temp1, temp2, temp3] = [up[2][0], up[2][1], up[2][2]];
    up[2][2] = left[0][2];
    up[2][1] = left[1][2];
    up[2][0] = left[2][2];
    
    left[0][2] = down[0][0];
    left[1][2] = down[0][1];
    left[2][2] = down[0][2];

    down[0][0] = right[0][0];
    down[0][1] = right[1][0];
    down[0][2] = right[2][0];

    right[0][0] = temp1;
    right[1][0] = temp2;
    right[2][0] = temp3;
  }


  rotate90(array) { //시계방향으로 90도 회전
    const rotate = Array.from({ length: 3 }, () => new Array(3));
    for (let i = 0; i < rotate.length; i++) {
      for (let j = 0; j < rotate[i].length; j++) {
        rotate[i][j] = array[2 - j][i];
      }
    }
    return rotate;
  }

  rotateMinus90(array) { //반시계방향으로 90도 회전
    const rotate = Array.from({ length: 3 }, () => new Array(3));
    for (let i = rotate.length - 1; i >= 0; i--) {
      for (let j = 0; j < rotate[i].length; j++) {
        rotate[2 - i][j] = array[j][i];
      }
    }
    return rotate;
  }

  printFlatCube() { //큐브 출력하기
    this.flatCube[Object.keys(this.flatCube)[0]].forEach(element => {
      process.stdout.write('        ');
      console.log(element.join(' '));
    })
    console.log();
    for (let i = 0; i < 3; i++) {
      for (let j = 1; j < 5; j++) {
        process.stdout.write(this.flatCube[Object.keys(this.flatCube)[j]][i].join(' '));
        process.stdout.write('   ');
      }
      console.log();
    }
    console.log();
    this.flatCube[Object.keys(this.flatCube)[5]].forEach(element => {
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
cubeModel.aroundFlatBlockTurn(cubeModel.flatCube.up,cubeModel.flatCube.back,cubeModel.flatCube.down,cubeModel.flatCube.front);
cubeModel.printFlatCube()