const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');

const { User } = require('./models/User');

const { mongoURI } = require('./config/key');

const mongoose = require('mongoose');

// application/x-www-form-urlencoded 타입
app.use(bodyParser.urlencoded({ extended: true }));

// application/json 타입
app.use(bodyParser.json());

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

  console.log(user);

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
  });

  // 요청된 이메일이 데이터베이스에 있다면 비밀번호가 유효한 비밀번호인지 확인
  user.comparePassword(req.body.password, (err, isMatch) => {
    if (!isMatch) return;

    // 비밀번호까지 맞다면 토큰을 생성하기
  });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
