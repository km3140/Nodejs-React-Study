const express = require('express');
const app = express();
const port = 3000;

const mongoose = require('mongoose');
mongoose.set('strictQuery', true);
mongoose
  .connect('mongodb+srv://pangyoelon:abcd1234@cluster0.pfltikv.mongodb.net/?retryWrites=true&w=majority', {})
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
