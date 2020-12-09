# codesquadTest

## 1단계
 + Node.js로 readline을 사용하여 입력을 받음
+ receiveInput() 함수로 입력받은 단어들을 배열에 담기
+ calculationOutput() 함수 ↓
  단어를 알파벳하나씩 배열에 담아 shift(),push(),pop(),unshift()를 활용하여 하나씩 밀어내기 구현
 <br>

### 구현화면 

![test1](https://user-images.githubusercontent.com/61257242/101365522-43248600-38e7-11eb-9e79-9cba122d1380.png)

<br>
<br>

##  2단계

+ cubeModel클래스를 구현하여 큐브를 왼쪽 오른쪽 위 아래 돌리는 로직을 구현
+ readline으로 여러번 받는 입력값을 " ' " 를 구분하여 배열에 담고 그 배열로 forEach를 사용하여 출력하는 로직 구현
  <br>
### 구현화면
  
![test2](https://user-images.githubusercontent.com/61257242/101364646-2471bf80-38e6-11eb-8288-3e47675d90e9.png)

<br>
<br>

##  3단계

### 설계 
  + 정면 회전할 때 ("F" 입력시) 

![화면 캡처 2020-12-10 004419](https://user-images.githubusercontent.com/61257242/101651835-db09a780-3a80-11eb-8560-46087f50c726.png)
  <br>

  + 오른쪽면 회전할 때 ("R" 입력시)

![화면 캡처 2020-12-10 010050](https://user-images.githubusercontent.com/61257242/101653859-27ee7d80-3a83-11eb-9221-853ee7c9fa44.png)

이런식으로 정면인 초록면을 제외한 각 면 마다 회전할때 회전 후 계산한 다음 다시 원상태로 복구하는 식으로 구현
 
<br>

 +  각 면 계산
![화면 캡처 2020-12-10 010655](https://user-images.githubusercontent.com/61257242/101654591-0cd03d80-3a84-11eb-843f-405f97124f3e.png)

### 구현화면

![화면 캡처 2020-12-10 001227](https://user-images.githubusercontent.com/61257242/101647835-8b28e180-3a7c-11eb-8e89-5c241f726c96.png)

![화면 캡처 2020-12-10 001306](https://user-images.githubusercontent.com/61257242/101647877-98de6700-3a7c-11eb-9dc1-ed7810f9a853.png)

2단계에서 3단계로 이어지게 끔 설계하지 않아 설계를 잘못한 것 같은 느낌이..
