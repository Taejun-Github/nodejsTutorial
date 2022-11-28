const logger = (req, res, next) => {
  const method = req.method;
  const url = req.url;
  const time = new Date().getFullYear();
  console.log(method, url, time);
  // next를 안해주면 다음 미들웨어로 넘어가지 않는다.
  // next.send('Testing');
  next();
}

export default logger;