//             ๐ ๋ก์ปฌํ๊ฒฝ์์๋ development, ๋ฐฐํฌํ๊ฒฝ์์๋ production์ธ ํ๊ฒฝ๋ณ์
if (process.env.NODE_ENV === 'production') {
  module.exports = require('./prod');
} else {
  module.exports = require('./dev');
}
