// 요청은 포스트맨을 사용하였음.
const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const { User } = require('./models/User');
const { mongoURI } = require('./config/key');

// application/x-www-form-urlencoded 타입
app.use(bodyParser.urlencoded({ extended: true }));
// application/json 타입
app.use(bodyParser.json());
// 쿠키 파싱
app.use(cookieParser());

mongoose.set('strictQuery', true);
mongoose
  .connect(mongoURI, {})
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));

app.get('/', (req, res) => {
  res.send('Hello World! 안녕하세요');
});

// 회원 가입 할 때 필요한 정보를  client에서 가져오면 데이터베이스에 넣어줌
app.post('/register', (req, res) => {
  const user = new User(req.body);

  //   👇 mongodb 메서드, db에 저장
  user.save((err, userInfo) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({
      success: true,
    });
  });
});

app.post('/login', (req, res) => {
  // 요청받은 이메일이 데이터베이스에 있는지 찾는다
  User.findOne({ email: req.body.email }, (err, user) => {
    // 👆 몽고디비 내장함수
    if (!user) {
      // 👆 요청받은 이메일이 DB에 없으면 user가 null값일 것이다
      return res.json({
        loginSuccess: false,
        message: '제공된 이메일에 해당하는 유저가 없습니다.',
      });
    }

    // 요청된 이메일이 데이터베이스에 있다면 비밀번호가 유효한 비밀번호인지 확인
    user.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch) return res.json({ loginSuccess: false, message: '비밀번호가 틀렸습니다' });

      // 비밀번호까지 맞다면 토큰을 생성하기
      user.generateToken((err, user) => {
        if (err) return res.statusCode(400).send(err);

        // 토큰은 쿠키, 로컬스토리지, 세션스토리지 등등에 저장한다. 여기서는 쿠키에 저장
        res.cookie('token_name', user.token).status(200).json({ loginSuccess: true, userId: user._id });
      });
    });
  });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
