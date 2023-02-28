const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
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
  let user = this;
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

const User = mongoose.model('User', userSchema); // 스키마를 모델로 감싼다?

module.exports = { User };
