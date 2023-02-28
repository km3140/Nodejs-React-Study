const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// salt가 몇글자인지
const saltRounds = 10;

const userSchema = mongoose.Schema({
  name: {
    type: String,
    maxlength: 50,
  },
  email: {
    type: String,
    trim: true,
    unique: 1,
  },
  password: {
    type: String,
    minlength: 5,
  },
  lastname: {
    type: String,
    maxlength: 50,
  },
  role: {
    type: Number,
    default: 0, // 일반 유저는 0
  },
  image: String,
  token: {
    type: String,
  },
  tokenExp: {
    type: Number,
  },
});

// 데이터 저장 전에 비밀번호 암호화 시키기
userSchema.pre('save', function (next) {
  //         👇 function 키워드로 선언했으므로 userSchema에 바인딩
  const user = this;
  // 👇 비밀번호가 추가/변경 되었을 때만 실행
  if (user.isModified('password')) {
    bcrypt.genSalt(saltRounds, function (err, salt) {
      //                                👆 에러가 나면 에러를 가져오고 아니면 salt에 salt값을 넣어줌
      if (err) return next(err);
      //                  👆 user.save()로 err를 들고 이동
      //                                             👇 해싱된 비밀번호!
      bcrypt.hash(user.password, salt, function (err, hash) {
        if (err) return next(err);
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

// 로그인 시 비밀번호 확인하는 메서드 정의
userSchema.methods.comparePassword = function (plainPassword, cb) {
  // plainPassword : abc123 === hashedPassword : $2b$10$DYJKKETYmjf0Q9HSa8R86eCU/Ana6H5PRmXKgW/vlsqNXDYQDhhte
  bcrypt.compare(plainPassword, this.password, function (err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
    //        👆 일치한다면 true
  });
};

// jsonwebtoken을 이용해서 token을 생성하는 메소드
userSchema.methods.generateToken = function (cb) {
  const user = this;

  //                👇 토큰을 만드는 메소드 (user._id와, 임의의 문자열을 인수로 토큰을 만듬),
  //                   추후 "secretToken"으로 jwt를 디코딩하여 user._id를 도출 가능
  const token = jwt.sign(user._id.toHexString(), 'secretToken');
  //                              👆 plainObject가 와야한다는 오류가 떠서 붙여주었음

  user.token = token;
  user.save((err, user) => {
    if (err) return cb(err);
    cb(null, user);
  });
};

userSchema.statics.findByToken = function (token, cb) {
  const user = this;

  jwt.verify(token, 'secretToken', (err, decoded) => {
    user.findOne({ _id: decoded, token: token }, (err, user) => {
      if (err) return cb(err);
      cb(null, user);
    });
  });
};

const User = mongoose.model('User', userSchema); // 스키마를 모델로 감싼다?

module.exports = { User };
