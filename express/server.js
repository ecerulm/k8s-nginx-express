var express = require('express')
var path = require('path')
var fs = require('fs')
var morgan = require('morgan')
const winston = require('winston');
const { format } = require('path');
var bodyParser = require('body-parser')
var app = express();
var session = require('express-session')

var sess = {
  secret: 'keyboard cat',
  cookie: {}
}

if (app.get('env') === 'production') {
  app.set('trust proxy', 1) // trust first proxy
  sess.cookie.secure = true // serve secure cookies
}


const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.splat(),
    winston.format.json()
  ),
  transports: [new winston.transports.Console()]
});

app.set("view engine", "ejs");
app.set("views", path.resolve(__dirname, "views"));

app.use(session(sess))
app.use(bodyParser.urlencoded({extended: false}));

// YOUR OWN MIDDLEWARE HERE
app.use(function(req, res, next) {
  if (req.body === undefined) {
    throw Error("Missing body-parser");
  }
  if (req.session == undefined) {
    throw Error("Missing express-session")
  }
  next()
});

app.get('/', function (req, res, next) {

  logger.info("req.body", {"req.body": req.body});
  logger.info("req.session", { "req.session": req.session});
  
  req.session.views ??= 1;
  req.session.views++;


  res.render("index", {views: req.session.views});
});

app.listen(5000, function() {
  logger.info("Web server started on port 5000")
})