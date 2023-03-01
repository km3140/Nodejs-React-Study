//             👇 로컬환경에서는 development, 배포환경에서는 production인 환경변수
if (process.env.NODE_ENV === 'production') {
  module.exports = require('./prod');
} else {
  module.exports = require('./dev');
}
