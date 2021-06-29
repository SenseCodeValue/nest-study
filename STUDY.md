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
npm i -g @nestjs/cli
```

### Start 
```
nest new project-name
```

### 데코레이터
데코레이터는 클래스에 함수 기능을 추가할 수 있기에 nest에서 매우 중요하다.  
그냥 클래스 위의 함수이며, 클래스를 위해 움직인다는 것 정도로 일단 이해하자 

### 구조
1. Main: main.ts
2. Module: 하나의 기능을 담당하는 root같은 곳으로, 인증,login = users, 사진 저장 => photo 같은 느낌
    - nest에서의 module은 한가지의 기능을 담당한다. 
    - ex)인증하는 부분, 회원가입을 하는 부분은 UserModule이 될 것이다.
3. controller: URL을 가져오고 함수를 실행하는 역할 === router`
    - Service는 왜 필요할까? - 아키텍처??
        - nest는 컨트롤러와 비즈니스로직을 분리하기를 원한다.
        - 그래서 단지 컨트롤러는 url을 가져오는 역할 만을 수행하며 그에 맞는 service의 function을 호출시킬 뿐이다.
4. service: 함수가 있는 곳 즉, 비즈니스로직이 존재하는 곳이다.
    - 데이터베이스에 요청, 요구사항 기능 등등...등등...등등.... 

### nest/cli
- nest g
    - generator = g = 생성
        - nest g controller
        - 해서 생성하면 파일이 생성되고 app.module에 자동으로 임포트 되는 모습을 볼 수 있다.  

### Controller 맛보기
1. Path Param / Query String
```
    @Get(':id')
    getOne(@Param('id') id: string): string {
```
```
    @Get('search')
    search(@Query('year') searchingYear: string): string {
```
2. Body
```
    @Post()
    create(@Body() movieData): string {
```

#### !tip
1. path param으로 인한 오류
    - @Get(':id') 이렇게 받는 녀석이 있다면 꼭
    - @Get('search')같이 무언가를 받을 경우, @Get(':id') 보다 위에 작성되어야한다. 

### Single-Responsiblility-Principle(단일 책인 원칙)
하나의 Module, Controller, Service, Function, Class는 하나의 기능을 수행해야한다.


### Service 맛보기
1. nest g service하면
    - app.modules에 providers: [MoviesService] 요렇게 추가되고
    - 만약 controller만들때 만들었던 폴더와 이름이 같돌혹 설정하면, 하당 폴더의 하위로 들어가게 된다.

2. Entity들 관리하기
    - 하위폴더로 entities 폴더 생성
    - movies.entity.ts 처럼 형식에 맞추어 Entity생성해주면 더욱 좋다.
    - export class entity이름 {} 해주면 깰끔~ 

3. Controller에 사용할 Service 등록하기
```
	export class MoviesController {
	constructor(private readonly movieService: MoviesService) {}
    
    ...
```
#### !tip
- parseInt(id) => +id