const express = require('express');
const app = express();
const port = 5000;
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const { User } = require('./models/User');
const { mongoURI } = require('./config/key');
const { auth } = require('./middleware/auth');
const cors = require('cors');

const whitelist = ['http://localhost:3000'];
const corsOptions = {
  credentials: true, // 👈 credentials: 'true', credential: true 처럼 하면 오류남..
  origin: (origin, callback) => {
    // whitelist 배열에 해당 origin이 있다면
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true); // cors 허용
    } else {
      callback(new Error('Not Allowed Origin!'));
    }
  },
};

app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// 라우팅
app.use('/api/users',require('./routes/users'))

mongoose.set('strictQuery', true);
mongoose
  .connect(mongoURI, {})
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
