const { readFile, writeFile } = require('fs');

console.log('start');
readFile('./content/first.txt', 'utf-8', (err, result) => {
  if (err) {
    console.log(err);
    return;
  }
  const first = result;
  readFile('./content/second.txt', 'utf-8', (err, result) => {
    if (err) {
      console.log(err);
      return;
    }
    const second = result;
    writeFile('./content/result-async.txt',
      `Here is the result : ${first}, ${second}`,
      (err, result) => {
        if (err) {
          console.log(err);
          return;
        }
        console.log('done with this task');
      });
  });
});
console.log('starting next task');








// callback hell을 해결한 코드

import { readFile, writeFile } from 'fs';
import util from 'util';
const readFilePromise = util.promisify(readFile);
const writeFilePromise = util.promisify(writeFile);

// const getText = (path) => {
//   return new Promise((resolve, reject) => {
//     readFile(path, 'utf-8', (err, data) => {
//       if (err) {
//         reject(err);
//       } else {
//         resolve(data);
//       }
//     })
//   })
// }

getText('./content/first.txt')
  .then(result => console.log(result))
  .catch(err => console.timeLog(err));

const start = async () => {
  try {
    const first = await readFilePromise('./content/first.txt');
    const second = await readFilePromise('./content/second.txt');
    await writeFilePromise('./content/result-async.txt');
    console.log(first);
    console.log(second);
  } 
  catch (error) {
    console.log(error);
  }

  start();
}