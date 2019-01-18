const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");

var app = express();

const PORT = 3000;

//Set Views
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

//Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}) );
app.use(express.static(path.join(__dirname, 'public')));

//Routes
app.get('/', (req, res) =>{
  res.render('index');
});
app.get('/about', (req, res) =>{
  res.render('about');
});

app.get('/contact', (req, res) =>{
  res.render('contact');
});

app.post('/contact/send', (req, res) =>{
  var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'ho.joshua4@gmail.com',
      pass: 'REDACTED'
    }
  });

  var mailOptions = {
    from: 'Joshua Ho <ho.joshua4@gmail.com>',
    to: 'Support <ho.joshua4@gmail.com>',
    subject: 'Website Submission',
    text: 'You have a submission with the following message: ' + req.body.message,
    html: '<p> Name: ' + req.body.name + ' email: ' + req.body.email + ' message: ' +
          req.body.message + '</p>'
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err){
      console.log('Mail Options - Error:', err);
      res.redirect('/');
    } else {
      console.log('Mail Options - Message sent!')
      res.redirect('/');
    }
  })



  console.log('post recieved')
});

app.listen(PORT);
console.log('Server is running on port ' + PORT + '...')
