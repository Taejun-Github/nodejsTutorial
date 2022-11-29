const express = require('express');
const path = require('path');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const multer = require('multer');
const fs = require('fs');
const indexRouter = require('./routes/index');
const userRouter = require('./routes/user');

app.use('/', indexRouter);
app.use('/user', userRouter);

app.use((req, res) => {
  res.status(404).send('Not Found');
})

try {
  fs.readdirSync('uploads');
} catch (error) {
  console.log('uploads 폴더가 없어서 uploads 폴더를 생성합니다');
  fs.mkdirSync('uploads');
}

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, done) {
      done(null, 'uploads/');
    },
    filename(req, file, done) {
      const ext = path.extname(file.originalname);
      done(null, path.basename(file.originalname, ext) + Date.now() + ext);
    },
  }),
  limits: { fileSize: 5 * 1024 * 1024 },
})

dotenv.config();

const app = express();
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(morgan('dev'));
app.use('/', express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(bodyParser.raw());
app.use(bodyParser.text());

app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: process.env.COOKIE_SECRET,
  cookie: {
    httpOnly: true,
    secure: false,
  },
  name: 'session-cookie',
}))

app.use((req, res, next) => {
  console.log('모든 요청에 다 실행된다');
  next(); // next를 써주지 않으면 넘어가지 않게 된다.
})

app.get('/', (req, res, next) => {
  // res.send('Hello Express');
  res.sendFile(path.join(__dirname, '/index.html'));
  console.log('GET / 요청에서만 실행됩니다.');
  next();
}, (req, res) => {
  throw new Error('에러는 에러 처리 미들웨어로');
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send(err.message);
})

app.post('/upload', upload.array('many'), (req, res) => {
  console.log(req.file, req.body);
  res.send('ok');
});

app.post('/upload', upload.fields([{ name: 'image1' }, { name: 'image2' }]),
  (req, res) => {
    console.log(req.files, req.body);
    res.send('ok');
  })

app.listen(app.get('port'), () => {
  console.log(app.get('port'), '번 포트에서 대기 중');
});


// express 모듈을 실행해서 app 변수에 할당한다. 익스프레스 내부에 http 모듈이 내장되어 있으므로 서버가 된다.
// app.set('port', 포트)로 서버가 실행될 포트를 설정한다.
// process.env 객체에 PORT 속성이 있다면 그 값을 사용하고 없다면 기본적으로 3000번 포트를 사용한다.
// __filename은 file명을 포함한 절대경로, __dirname은 file명을 제외한 절대경로

// 미들웨어는 익스프레스의 핵심이다. 요청과 응답의 중간에 위치하기 때문에 미들웨어이다.
// 라우터와 에러 핸들러 또한 미들웨어의 일종이다.
// 미들웨어는 app.use와 함께 사용한다. app.use(미들웨어의 이름) 형태로 사용된다.

// app.use에 매개변수가 req, res, next인 함수를 넣으면 된다. 미들웨어는 위에서부터 아래로 순서대로 실행되면서 요청과 응답 사이에 기능 수행
// next를 실행하지 않으면 다음 미들웨어가 실행되지 않는다.
// app.use(미들웨어) : 모든 요청에서 미들웨어 실행
// app.use('/abc', 미들웨어) : abc로 시작하는 요청에서 미들웨어 실행
// app.post('/abc', 미들웨어) : abc로 시작하는 POST 요청에서 미들웨어 실행