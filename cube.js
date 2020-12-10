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
      'F': () => this.changeF(this.flatCube, '90'),
      'F\'': () => this.changeF(this.flatCube, '-90'),
      'R': () => this.changeR(this.flatCube, '90'),
      'R\'': () => this.changeR(this.flatCube, '-90'),
      'L': () => this.changeL(this.flatCube, '90'),
      'L\'': () => this.changeL(this.flatCube, '-90'),
      'B': () => this.changeB(this.flatCube, '90'),
      'B\'': () => this.changeB(this.flatCube, '-90'),
      'U': () => this.changeU(this.flatCube, '90'),
      'U\'': () => this.changeU(this.flatCube, '-90'),
      'D': () => this.changeD(this.flatCube, '90'),
      'D\'': () => this.changeD(this.flatCube, '-90'),
      'Q': () => console.log('Bye~'),
      'M': () => this.mixRandomCube()
    }
  }

  changeF({ front, up, right, down, left }, angle) {
    this.rotationOnceFull(front, up, right, down, left, angle);
  }

  changeR({ right, up, back, down, front }, angle) {
    this.rotationFrontSide(up, '90');
    this.rotationFrontSide(down, '-90');
    this.rotationOnceFull(right, up, back, down, front, angle);
    this.rotationFrontSide(up, '-90');
    this.rotationFrontSide(down, '90');
  }

  changeL({ left, up, front, down, back }, angle) {
    this.rotationFrontSide(up, '-90');
    this.rotationFrontSide(down, '90');
    this.rotationOnceFull(left, up, front, down, back, angle);
    this.rotationFrontSide(up, '90');
    this.rotationFrontSide(down, '-90');
  }

  changeB({ back, up, left, down, right }, angle) {
    this.rotationFrontSide(up, '90');
    this.rotationFrontSide(up, '90');
    this.rotationFrontSide(down, '-90');
    this.rotationFrontSide(down, '-90');
    this.rotationOnceFull(back, up, left, down, right, angle);
    this.rotationFrontSide(up, '-90');
    this.rotationFrontSide(up, '-90');
    this.rotationFrontSide(down, '90');
    this.rotationFrontSide(down, '90');
  }

  changeU({ up, back, right, front, left }, angle) {
    this.rotationFrontSide(back, '90');
    this.rotationFrontSide(back, '90');
    this.rotationFrontSide(right, '-90');
    this.rotationFrontSide(left, '90');
    this.rotationOnceFull(up, back, right, front, left, angle);
    this.rotationFrontSide(back, '-90');
    this.rotationFrontSide(back, '-90');
    this.rotationFrontSide(right, '90');
    this.rotationFrontSide(left, '-90');
  }

  changeD({ down, front, right, back, left }, angle) {
    this.rotationFrontSide(right, '90');
    this.rotationFrontSide(back, '90');
    this.rotationFrontSide(back, '90');
    this.rotationFrontSide(left, '-90');
    this.rotationOnceFull(down, front, right, back, left, angle);
    this.rotationFrontSide(right, '-90');
    this.rotationFrontSide(back, '-90');
    this.rotationFrontSide(back, '-90');
    this.rotationFrontSide(left, '90');
  }

  rotationOnceFull(front, up, right, down, left, angle) {
    this.rotationFrontSide(front, angle);
    if (angle === '90') { //1번 돌려서 90도 각도로 회전시키기
      this.aroundFlatBlockTurn(up, right, down, left);
    } else if (angle === '-90') { //3번 돌려서 -90도(270도) 각도로 회전시키기
      for (let i = 0; i < 3; i++) {
        this.aroundFlatBlockTurn(up, right, down, left);
      }
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

    down[0][2] = right[0][0];
    down[0][1] = right[1][0];
    down[0][0] = right[2][0];

    right[0][0] = temp1;
    right[1][0] = temp2;
    right[2][0] = temp3;
  }

  rotationFrontSide(frontSide, angle) {  //angle = 90 or -90
    const rotate = angle === '90' ?
      this.rotate90(frontSide) : this.rotateMinus90(frontSide);
    this.copyArrayValuesOnly(frontSide, rotate);
  }

  rotate90(frontSide) { //정면에 있는 배열을 시계방향으로 90도 회전
    const rotate = Array.from({ length: 3 }, () => new Array(3));
    for (let i = 0; i < rotate.length; i++) {
      for (let j = 0; j < rotate[i].length; j++) {
        rotate[i][j] = frontSide[2 - j][i];
      }
    }
    return rotate;
  }

  rotateMinus90(frontSide) { //정면에 있는 배열을 반시계방향으로 90도 회전
    const rotate = Array.from({ length: 3 }, () => new Array(3));
    for (let i = rotate.length - 1; i >= 0; i--) {
      for (let j = 0; j < rotate[i].length; j++) {
        rotate[2 - i][j] = frontSide[j][i];
      }
    }
    return rotate;
  }

  copyArrayValuesOnly(original, target) { //참조를 복사하는 것이 아닌 값 복사
    original.forEach((_, i) => {
      original[i] = target[i];
    })
  }

  mixRandomCube() { //큐브 섞기
    const inputKeyArray = Object.keys(this.inputWord);
    inputKeyArray.pop(); //마지막 요소인 'M'을 제거
    inputKeyArray.pop(); //Q를 제거
    const randomNumber = Math.ceil(Math.random() * 20);
    for (let i = 0; i < randomNumber; i++) {
      const randomKey = Math.floor(Math.random() * 12);
      this.inputWord[inputKeyArray[randomKey]]();
    }
  }

  printFlatCube() { //큐브 출력하기
    this.flatCube[Object.keys(this.flatCube)[0]].forEach(element => {
      process.stdout.write('        ');
      console.log(element.join(' '));
    })
    console.log();
    for (let i = 0; i < 3; i++) {
      for (let j = 1; j < 5; j++) {
        process.stdout.write(this.flatCube[Object.keys(this.flatCube)[j]][i]
          .join(' '));
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

  checkComplete() { //큐브가 다 맞춰졌는지 체크
    let result = true;
    const flatCubeKeysArray = Object.keys(this.flatCube);
    flatCubeKeysArray.forEach(key => {
      if (!this.checkForSameValueInArray(this.flatCube[key])) {
        result = false;
      }
    })
    return result;
  }

  checkForSameValueInArray(array) { //이중배열의 값이 같은지 체크
    return array.flat().every((value, _, arr) => value === arr[0]);
  }
}

class UseModule {
  constructor({ cubeModel }, { count, time }) {
    this.readline = require('readline');
    this.rl = this.readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    this.cubeModel = cubeModel;
    this.count = count;
    this.time = time;
  }

  init() {
    console.log('M 입력시 무작위로 섞음');
    this.rl.setPrompt('CUBE> ');
    this.rl.prompt();
    this.receiveInput();
    this.closeModule();
  }

  receiveInput() { //입력받은 문자열 읽기
    this.rl.on("line", (line) => {
      console.log(); //한줄 띄어서 쓰기용
      const lineArray = this.convertInputToArray(line);
      lineArray.forEach((element) => {
        this.cubeModel.inputWord[element.toUpperCase()]();
        this.count++;
        console.log(element);
        this.cubeModel.printFlatCube();
        console.log(); //한줄 띄어서 쓰기용
        if (this.checkWhetherToEnd(element)) this.rl.close();
      })
      this.rl.prompt();
    })
  }

  checkWhetherToEnd(element) { //종료 여부 체크
    if (element.toUpperCase() === 'Q') {
      this.count--;
      return true;
    } else if (this.cubeModel.checkComplete()) {
      console.log('축하합니다 모든 면을 맞추셨습니다');
      return true;
    }
    return false;
  }

  closeModule() { //모듈 종료
    this.rl.on("close", () => {
      console.log(`경과시간: ${(new Date(Date.now() - this.time))
        .toISOString().slice(14, 19)}`);
      console.log(`조작갯수: ${this.count}`);
      console.log('이용해주셔서 감사합니다. 뚜뚜뚜.');
      process.exit();
    })
  }

  convertInputToArray = (line) => { //입력받은 문자열을 배열에 담기
    const result = [];
    for (let i = 0; i < line.length; i++) {
      if (line[i + 1] && line[i + 1] === '\'') {
        result.push(line.substring(i, i + 2));
        i++;
      } else if (line[i + 1] && line[i + 1] === '2') {
        result.push(line[i]);
        result.push(line[i]);
        i++;
      } else {
        result.push(line[i]);
      }
    }
    return result;
  }
}

//Node.js 실행하기
const run = { count: 0, time: Date.now() };
const cubeModel = new CubeModel();
cubeModel.printFlatCube();
const useModule = new UseModule({ cubeModel }, run);
useModule.init();