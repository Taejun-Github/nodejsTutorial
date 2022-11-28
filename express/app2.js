const express = require('express');
const app = express();
const morgan = require('morgan');
import logger from './logger';
import authorize from './authroize';
// req => middleware => res

app.use('/api', logger) // 이렇게 하면 모든 app.get에서 /api가 들어가는 곳에 logger를 미들웨어로 사용한다.
app.use('/about', [logger, authorize]); // 미들웨어를 두개 적용
app.user(morgan('tiny'));

app.get('/', (req, res) => {

  res.send('Home');
});

app.get('/about', (req, res) => {
  res.send('About');
})

app.get('/api/products', (req, res) => {
  res.send('Products');
});

app.get('/api/items', [logger, authorize], (req, res) => {
  console.log(req.user);
  res.send('Items');
});

app.listen(5000, () => {
  console.log('Server is listening on port 5000....');
})