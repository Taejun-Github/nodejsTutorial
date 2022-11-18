const EventEmitter = require('events');

const customEmitter = new EventEmitter();

customEmitter.on('response',(name, id) => {
  console.log(`data recieved ${name} ${id} `)
});

// customEmitter.emit('response')
// 두번째 콜백함수는 만들어지기 전에 emit 되었으므로 호출되지 않는다.

customEmitter.on('response',() => {
  console.log(`data recieved changed `)
});
// 두 콜백함수가 모두 response 이벤트에 들어간다.

// customEmitter.emit('response')

customEmitter.emit('response', 'mc', 12); // 이렇게 하면 argument를 더 넣을 수 있다.
