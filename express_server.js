const express = require('express');
const app = express();
const PORT = 8080;  // default port 8080

app.set('view engine', 'ejs');    // set "ejs" as the view engine
// use Express library's body parsing middleware to make the POST request body human readable:
app.use(express.urlencoded({ extended: true }));

const urlDatabase = {
  'b2xVn2': 'http://www.lighthouselabs.ca',
  '9sm5xK': 'http://www.google.com'
};

// 6-random-alphanumeric-character unique short URL ID generator:
const generateRandomString = () => {
  let randomStr = '';
  const givenStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < 6; i++) {
    randomStr += givenStr.charAt(Math.floor(Math.random() * givenStr.length));
  }
  return randomStr;
};

// add "/urls" route and template:
app.get('/urls', (req, res) => {
  const templateVars = { urls: urlDatabase };
  res.render('urls_index', templateVars);
});

// add a GET route to show the form in "/views/urls_new.ejs":
app.get('/urls/new', (req, res) => {
  res.render('urls_new');
});

// add a POST route to receive the form submission and redirect to '/urls/:id':
app.post('/urls', (req, res) => {
  const id = generateRandomString();
  const longURL = req.body.longURL;
  urlDatabase[id] = longURL;
  //res.send('Ok');
  res.redirect(`/urls/${id}`);
});

// add "/urls/:id" route and template:
app.get('/urls/:id', (req, res) => {
  const templateVars = { id: req.params.id, longURL: urlDatabase[req.params.id]};
  res.render('urls_show', templateVars);
});

app.get('/urls.json', (req, res) => {
  res.json(urlDatabase);
});

app.get('/hello', (req, res) => {
  res.send('<html><body>Hello <b>World</b></body></html>\n');
});

app.get('/', (req, res) => {
  res.send('Hello!');
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});