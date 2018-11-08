const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log', log + '\n', err => {
    if (err) console.log('Unable to append to server.log!');
  });
  next();
});

// app.use((req, res, next) => {
//     res.render('maintenance.hbs');
// });

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

hbs.registerHelper('Upper', text => {
  return text.toUpperCase();
});

//serving static content
app.use(express.static(__dirname + '/public'));

//req handelers
// app.get('/', (req, res) => {
//     //res.send('<h1>Hellow from Express</h1>');
//     res.send({
//         name: 'Amr',
//         age: 38,
//         title: 'web dev'
//     })
// });

// Templating Engine!
app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page'
  });
});

app.get('/', (req, res) => {
  res.render('home.hbs', {
    pageTitle: 'Home Page',
    message: 'welcome to the home page!'
  });
});

app.listen(port, () => {
  console.log(`Server starting on port: ${port}`);
});
