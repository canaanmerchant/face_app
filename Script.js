// JavaScript source code
const express = require('express');
const cors = require('cors');
<<<<<<< HEAD
const bcrypt = require('bcrypt');
const knex = require('knex')

const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : 'test',
    database : 'face_app'
  }
});


/*console.log(db.select('*').from('users').then(data => {
  console.log(data)
}));*/
=======



>>>>>>> 279124d04693df4ec0357e5dfb9ec9f780485cee

const app = express();

// const bodyParser = require('body-parser');
// app.use(bodyParser.json());

app.use(express.json());
app.use(cors());

const database = {
<<<<<<< HEAD
    users: [
      {
        id: '123',
        name: 'John',
        email: 'john@gmail.com',
        password: 'cookies',
        entries: 0,
        joined: new Date()
      },
      {
        id: '124',
        name: 'Sally',
        email: 'sally@gmail.com',
        password: 'bananas',
        entries: 0,
        joined: new Date()
      }
    ],
  login: [
    {
      id: '987',
      hash: '',
      email: 'john@gmail.com'
    }
  ]

}


const saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$w0rD';
const someOtherPlaintextPassword = 'not_bacon';

=======
  users: [
    {
      id: '123',
      name: 'John',
      email: 'john@gmail.com',
      password: 'cookies',
      entries: 0,
      joined: new Date()
    },
    {
      id: '124',
      name: 'Sally',
      email: 'sally@gmail.com',
      password: 'bananas',
      entries: 0,
      joined: new Date()
    }
  ]
}

>>>>>>> 279124d04693df4ec0357e5dfb9ec9f780485cee
app.get('/', (req, res) => {
  res.send(database.users);
})

app.post('/signin', (req, res)=> {
<<<<<<< HEAD
  const {email, name, password} = req.body;
  const hash = bcrypt.hashSync(password, saltRounds);
   db.select('email', 'hash').from('login')
  .where('email', '=', req.body.email)
  .then(data =>{
    const isValid = bcrypt.hashSync(req.body.password, saltRounds, data[0].hash);
    console.log(isValid);
    if (isValid) {
      return db.select('*').from('users')
        .where('email', '=', req.body.email)
        .then(user => {
          console.log(user);
          res.json(user[0])
        })
        .catch(err => res.status(400).json('unable to get user'))
      } else {
        res.status(400).json('wrong credentials')
      }
  })
  .catch(err => res.status(400).json('wrong credentials'))
=======
  if (req.body.email === database.users[0].email &&
       req.body.password === database.users[0].password) {
        res.json(database.users[0]);
      } else {
        res.status(400).json('error loggin in');
      }
>>>>>>> 279124d04693df4ec0357e5dfb9ec9f780485cee
})

app.post('/register', (req, res) => {
  const {email, name, password} = req.body;
<<<<<<< HEAD
  const hash = bcrypt.hashSync(password, saltRounds);
  db.transaction(trx => {
    trx.insert({
      hash: hash,
      email: email
    })
    .into('login')
    .returning('email')
    .then(loginEmail => {
      return trx('users')
        .returning('*')
        .insert({
          email: loginEmail[0],
          name: name,
          joined: new Date()
        })
        .then(user => {
          res.json(user[0]);
        })
    })
    .then(trx.commit)
    .catch(trx.rollback)
  })
  .catch(err => res.status(400).json('unable to register'))
=======
  database.users.push({
    id: '125',
    name: name,
    email: email,
    password: password,
    entries: 0,
    joined: new Date()
  })
  res.json(database.users[database.users.length-1]);
>>>>>>> 279124d04693df4ec0357e5dfb9ec9f780485cee
})

app.get('/profile/:id', (req, res) => {
  const { id } = req.params;
<<<<<<< HEAD
  db.select('*').from('users').where({id})
  .then(user => {
    if (user.length) {
      res.json(user[0]);
    } else {
      res.status(400).json('Not found')
    }

  })
    .catch(err => res.status(400).json('error getting user'))
=======
  let found = false;
  database.users.forEach(user => {
    if (user.id === id) {
      found = true;
      return res.json(user);
    }
  })
    if (!found) {
      res.status(400).json('not found');
    }
>>>>>>> 279124d04693df4ec0357e5dfb9ec9f780485cee
})

app.put('/image', (req, res) => {
  const { id } = req.body;
<<<<<<< HEAD
  db('users').where('id', '=', id)
  .increment('entries', 1)
  .returning('entries')
  .then(entries => {
    res.json(entries[0])
  })
  .catch(err => res.status(400).json('unable to count entries'))
=======
  let found = false;
  database.users.forEach(user => {
    if (user.id === id) {
      found = true;
      user.entries ++
      return res.json(user.entries);
    }
  })
    if (!found) {
      res.status(400).json('not found');
    }
>>>>>>> 279124d04693df4ec0357e5dfb9ec9f780485cee
})


app.listen(3000, ()=> {
  console.log('app is running on port 3000');
})

/*
/ --> res = this is working
/singin --> post = success/fail
/register --> POST = user
/profile/:userID --> GET = user
/image --> PUT  --> user
*/
