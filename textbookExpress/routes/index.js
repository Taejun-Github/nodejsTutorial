const express = require('express');
const User = require('../models/user');
const router = express.Router();

router.get('/', async(req, res, next) => {
  try {
   const users = await User.findAll();
   res.render('sequelize', {users}); 
   // sequelize.html 을 렌더링할 때 결과값인 users를 넣는다.
  } catch (error) {
    console.error(error);
    next(err);
  }
});

module.exports = router;