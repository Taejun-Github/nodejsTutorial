// const http = require('http');
// const { readFileSync } = require('fs');

// // get all files
// const homePage = readFileSync('./index.html');
// const homePage2 = readFileSync('../tutorial/index.html'); // 이런 식으로 가져오고 싶은 페이지 변경 가능.
// const homeStyles = readFileSync('../tutorial/styles.css'); // css와 js파일도 이런식으로 가져와야 한다.
// const homeImage = readFileSync('../tutorial/log.svg');
// const homeLogic = readFileSync('../tutorial/index.js');

// const server = http.createServer((req, res) => {
//   // console.log('user hit the server'); // 유저가 접속하면 이것을 출력한다.

//   // console.log(req.method);
//   // console.log(req.url);
  
//   const url = req.url;

//   if (url === '/') {
//     res.writeHead(200, {'content-type':'text/html'})
//     res.write(homePage);
//     res.end();
//   } else if (url === '/styles.css') {
//     res.writeHead(200, {'content-type':'text/css'})
//     res.write(homeStyles);
//     res.end();
//   } else if (url === '/logo.svg') {
//     res.writeHead(200, {'content-type':'image/svg+xml'})
//     res.write(homeImage);
//     res.end();
//   } else if (url === '/logic.js') {
//     res.writeHead(200, {'content-type':'text/javascript'})
//     res.write(homeLogic);
//     res.end();
//   } else {
//     res.writeHead(404, {'content-type':'text/html'})
//     res.write('<h1>Resource Not Found</h1>');
//     res.end();
//   }

// })

// server.listen(5000);

const express = require('express');
const path = require('path');
const app = express();
import { products } from './data';

// setup static and middleware
// app.use(express.static('./public'));
// public에 있는 css, js 등의 자료를 가져오는 미들웨어

app.get('/', (req, res) => {
  // res.status(200).send('Home Page');
  // res.sendFile(path.resolve(__dirname, './navbar-app/index.html')); // html 파일을 보내는 방법
  res.json([{name: 'john'}, {name: 'shangus'}]) // json 파일을 보내는 방법
});

app.get('/about', (req, res) => {
  res.status(200).send('About Page');
})

app.get('/api/products/:productId', (req, res) => {
  // req.params
  const { productId } = req.params;

  const singleProduct = products.find((product) => product.id === Number(productId));
  res.json(singleProduct);
})

app.get('/api/products/:productId/reviews/:reviewId', (req, res) => {
  const { productId, reviewId } = req.params;
  
});

app.get('/api/products', (req, res) => {
  const newProducts = products.map((product) => {
    const {id, name, image} = product;
    return {id, name, image};
  })
  res.json(products);
});

app.get('/api/v1/query', (req, res) => {
  console.log(req.query);
  const { search, limit } = req.query;
  let sortedProducts = [...products];

  if (search) {
    sortedProducts = sortedProducts.filter((product) => {
      return product.name.startWith(search)
    })
  }

  if (limit) {
    sortedProducts = sortedProducts.slice(0, Number(limit));
  }

  if (sortedProducts.length < 1) {
    // res.status(200).send('no products matched your search');
    return res.status(200).json({success: true, data: []})
  }

  return res.status(200).json(sortedProducts);
})

app.all('*', (req, res) => {
  res.status(404).send('<h1>resource not found</h1>');
});

app.listen(5000, () => {
  console.log('server is listening on port 5000');
});