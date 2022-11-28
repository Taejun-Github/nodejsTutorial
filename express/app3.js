const express = require('express')
const app = express();
let { people } = require('./data');

// static assets
app.use(express.static('./methods-public')) // 여기에 있는 css, js 자료를 사용한다는 뜻이다.
app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.get('/api/people', (req, res) => {
  res.status(200).json({success: true, data: people});
});

app.post('/api/people', (req, res) => {
  const {name} = req.body;
  if (!name) {
    return res.status(400).json({success: false, msg: 'please provide name value'});
  }
  res.status(201).send({ success: true, person: name});
});

app.post('/login', (req, res) => {
  console.log(req.body);
  // req.body는 form으로 받아온 데이터이다.
  const {name} = req.body;

  if(name) {
    return res.status(200).send(`Welcome ${name}`);
  }
  res.status(401).send('Please provide Credentials');
});

app.put('/api/people/:id', (req, res) => {
  const {id} = req.params;
  const {name} = req.body;
  console.log(id, name);

  const person = people.find((person) => {
    return person.id === Number(id)
  });

  if (!person) {
    return res.status(404).json({success: false, msg: `please provide name value id ${id}`})
  }
  const newPeople = people.map((person) => {
    if (person.id === Number(id)) {
      person.name = name;
    }
    return person;
  })

  res.status(200).json({success: true, data: newPeople})
});

app.delete('/api/people/:id', (req, res) => {
  const person = people.find((person) => person.id === Number(req.params.id))
  if (!person) {
    return res.status(404).json({success: false, msg: `please provide name value id ${req.params.id}`})
  }
  const newPeople = people.filter((person) => person.id !== Number(req.params.id));
  return res.status(200).json({success: true, data: newPeople});
});

app.listen(5000, () => {
  console.log('Server is listening on port 5000....');
})
