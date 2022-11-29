const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express'})
}, function(req, res, next) {
  console.log('실행되지 않음');
  next();
});

router.get('/', function(req, res) {
  console.log('실행됩니다');
  res.send('Hello, Express');
})

export default router;