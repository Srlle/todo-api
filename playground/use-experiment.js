const express = require('express');

var app = express();

app.use((req, res, next) => {
  // res.send('Second use');
  console.log('Use No.2 firing now.');
  next();
});

app.use((req, res, next) => {
  // res.send('First use');
  console.log('Use No.1 firing now.');
  next();
});

app.get('/', (req, res) =>{
  res.send('Hello!');
});

app.listen(3000, () => {
  console.log("Server up on localhost:3000");
});
