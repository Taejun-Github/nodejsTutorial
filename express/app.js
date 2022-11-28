const http = require('http');
const server = http.createServer((req, res) => {
  // console.log('user hit the server'); // 유저가 접속하면 이것을 출력한다.

  // console.log(req.method);
  // console.log(req.url);
  
  const url = req.url;

  if (url === '/') {
    res.writeHead(200, {'content-type':'text/html'})
    res.write('<h1>home page</h1>');
    res.end();
  } else if (url === '/about') {
    res.writeHead(200, {'content-type':'text/html'})
    res.write('<h1>About page</h1>');
    res.end();
  } else {
    res.writeHead(404, {'content-type':'text/html'})
    res.write('<h1>Resource Not Found</h1>');
    res.end();
  }

})

server.listen(5000);