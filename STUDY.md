# Nest.js 노마드코더 강의 기반 공부

## Nest js란

- express위에 만들어진 새로운 프레임워크
- 새로운 프레임워크 구조를 가지고 있기 떄문에 좋다.
- 순서와 구조/규칙를 가지고 있다.
- 즉 spring, djang등의 구조를 node.js에서 사용할 수 있도록한다.
- 큰 규모의 프로젝트를 진행할떄 유리하다.
- TypeScript와도 궁합이 좋다가 아니라 거의 100%를 기반으로 하고 있다.

### API를 만들고 테스트를 해볼 것이다.
간단한 API와 nest의 모든 기능을 살표보고 테스트를 해볼것이다.

### Install
```

```

### 구조
- Main: main.ts
- Module: 하나의 기능을 담당하는 root같은 곳으로, 인증,login = users, 사진 저장 => photo 같은 느낌
- controller: URL을 가져오고 함수를 실행하는 역할 === router`
- service: 함수가 있는 곳 즉, 비즈니스로직이 존재하는 곳이다.
