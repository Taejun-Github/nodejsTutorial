const http = require('http');
const server = http.createServer((req, res) => {
  if (req.url === '/') {
    res.end('Welcome to our home page')
  }
  if (req.url === '/about') {
    res.end('Here is our short story')
  }
  res.end(
    `<h1>404</h1>
    <p>We cannot seem to find the page you are looking for</p>
    <a href="/">back home</a>`
  )
})

server.listen(5000); // 포트번호
const _ = require('lodash');

const items = [1, [2, [3, [4]]]];

const newItems = _.flattenDeep(items);
console.log(newItems)

