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

### DTO~
DTO는 Data Transfer Object(데이터 전송 객체)이다.  
- DTO는 프로그래머가 코드를 더 간결하게 짤 수 있도록 돕기 위해 따로 구분하여 사용한다.  
- DTO를 사용해서 Controller로 들어오는 Parmas, Query들의 값의 유효성을 검사할 수 있도록 해준다.
- 결국, 서버가 type check 및 property의 유효성 검증 등으로 보호될 수 있다. 

### Pipe 와 DTO 유효성 검사
pipe는 코드가 항상 지나다니는 곳으로서 express의 middleware와 비슷하다.  
nest.js에는 middleware 와 유사한 여석들이 많다~
- 그래서 우리는 유효성 검사를 하는 Pipe를 만들어 보겠다.
- main.ts에 app.useGlobalPipes(사용할 pipe를 params를 통해 nest에게 전달한다.) 통해 생성한다.
    - new ValidationPipe()를 쓸껀데 class를 확인할 것 임으로 모듈필요....
    - npm i class-validator class-transformer  두가지 받아주자... 
- 그럼 DTO로 돌아가서
    - import {...} from 'class-vaildator';
    - @IsString, @IsString({each:true})=>배열인 경우 ... 등을 사용해서 넣어주자!
- app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true, transform: true, }));
    - whitelist: true =>  decorater가 없는 프로퍼티가 있으면  유입 자체를 막는다.
    - forbidNonWhitelisted: true =>  이상한걸 보내는 Request 유입 자체를 막는다. => {hack: "bye me"} request => "property hack should not exist" 반환
    - transform: true => 우리는 id를 URL로 부터 string으로 받고 있지만 실제 사용은 number로 한다 그래서! 바꾸고 싶어!! 사용 
        - 기존에 id: stirng => id: number로만 바꾸면 알아서 변환해 준다.

### DTO 심화~
만약 Update처럼 옵셔널로 부분만 날라올 수 있는 경우는 어떻게 할까?
1. optional로 ? 붙이거나 @IsOptional() 붙이면 된다.
2. 하지만 우리의 nest 모듈을 제공한다.
    - npm i @nestjs/mapped-types => DTO를 변환시켜 준다.
    - 그래서 기존의 create-movie의 일부분으 받기 때문에
    - extends PartialType()


### Modules 정리와 Depnedency Injection(의존성 주입)

그 전에, 지금 app.module.ts에 movie의 controller, provider(service)가 있다.  
app에는 app의 것이 있어야 되는데 이것을 옮겨보자  
- nest g modules 
    - moives
- 이후, app.module.ts에 movie의 controller, provider(service)를 movies.module.ts로 옮긴다.
    - 이후의 형태는 아래와 같다.
```
    //app.module.ts
    import { Module } from '@nestjs/common';
    import { MoviesModule } from './movies/movies.module';

    @Module({
        imports: [MoviesModule],
        controllers: [],
        providers: [],
    })
    export class AppModule {}
```

#### Depnedency Injection(의존성 주입)
- movies.controller.ts에서 provider(service)가 동작하는 이유는 
    - property로 constructor에 MovieService type으로 선언해주었기 떄문이다.
    - type으로!!! 즉, type으로 import 시켜 주입해주기 때문이다. 
-  movies.controller.ts에서의 MovieService는
    - movies.modules.ts에서 Provider 부분에서 import하고 Controller에 주입한 것이다. 붐
    - 이게  Depnedency Injection(의존성 주입)이다. 간단히~~~정말 간단히 말해서 


### Nest는 Express 위에서~

nest는 express위에서 돌아가기에 Controller에서 Response, Request를 받아볼 수 있다.  
즉, Express객체를 직접적으로 접근할 수 있다.   
```
    //movies.controller.ts
	@Get()
	getAll(@Req() req, @Res() res): Array<Movie> {
		return this.movieService.getAll();
	}
 ```