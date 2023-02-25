const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');

const { User } = require('./models/User');

const mongoose = require('mongoose');

// application/x-www-form-urlencoded 타입
app.use(bodyParser.urlencoded({ extended: true }));

// application/json 타입
app.use(bodyParser.json());

mongoose.set('strictQuery', true);
mongoose
  .connect('mongodb+srv://pangyoelon:abcd1234@cluster0.pfltikv.mongodb.net/?retryWrites=true&w=majority', {})
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

// 회원 가입 할 때 필요한 정보를  client에서 가져오면
// 그것들을 데이터베이스에 넣어준다
app.post('/register', (req, res) => {
  const user = new User();
  console.log(user);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
