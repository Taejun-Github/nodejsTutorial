const http = require('http')

http.createServer((req, res) => {
  res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
  res.write('<h1>Hello Node!</h1>');
  res.end('<p>Hello Server!</p>');
  // end는 응답을 종료하는 메서드이다. 만약 인수가 있다면 그 데이터도 클라이언트로 보내고 응답을 종료한다.
}).listen(8080, () => {
  // 서버 연결
  console.log('8080번 포트에서 서버 대기 중입니다.');
})