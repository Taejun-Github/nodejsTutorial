const http = require('http');

http.createServer((req, res) => {
  res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
  res.write('<h1>Hello Node!</h1>');
  res.end('<p>Hello Werver!</p>');
})
.listen(8080, () => {
  console.log('8080 서버가 대기 중입니다');
})

http.createServer((req, res) => {
  res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
  res.write('<h1>Hello Node!</h1>');
  res.end('<p>Hello Werver!</p>');
})
.listen(8081, () => {
  console.log('8081 서버가 대기 중입니다');
})
