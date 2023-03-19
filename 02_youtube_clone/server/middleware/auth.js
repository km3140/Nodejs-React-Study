const { User } = require('../models/User');

// 인증 처리를 하는 미들웨어
const auth = (req, res, next) => {
  // 1. 클라이언트 쿠키에서 토큰을 가져온다
  const token = req.cookies.x_auth;

  // 2. 토큰을 복호화 한 후 그 결과로 나온 유저id를 유저DB에서 찾는다
  User.findByToken(token, (err, user) => {
    if (err) throw err; // 이렇게 하면 파일시스템을 클라이언트에 적나라하게 보여줌으로 실제 서비스 할 땐 조치가 필요함, 필요에 따라 에러코드도 200으로 감춤
    if (!user) return res.json({ isAuth: false, error: true });

    req.token = token;
    req.user = user;

    next();
  });

  // 3. 유저가 있으면 인증 ok, 없으면 인증 no
};

module.exports = { auth };
