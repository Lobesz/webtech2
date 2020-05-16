const express                 =   require('express');
const app                     =   express();
const path                    =   require('path');
const port                    =   process.env.PORT || 8080;
const logger                  =   require('./middleware/logger');
const MongoClient             =   require("mongodb").MongoClient;
var users                     =   require('./middleware/api/user');
var books                     =   require('./middleware/api/books');
var db;
var mongourl                  =   "mongodb://localhost:27017/bookstore";
var cookieParser              =   require('cookie-parser');
var expressSession            =   require('express-session');
const bodyParser              =   require('body-parser');
const uuid = require("uuid");

/* Login */
var loggedUser = false;
MongoClient.connect(mongourl, (err, database) => {
    if (err) return console.log(err);
    db = database.db("bookstore");
    app.listen(port, () => {
        console.log("Server running...");
    });
});

app.use(cookieParser());
app.use(expressSession({
    secret: 'logininfo',
    resave: true,
    saveUninitialized: true
}));

app.use(bodyParser.urlencoded({
  extended: true
}));

app.get('/', (req, res, next)=>{
    req.session.uid = false;
    next();
});

app.get('/login', (req, res, next)=>{
  if(!req.session.uid) {
    res.redirect('/')
  } else {
    res.sendFile(__dirname + '/public/login.html');
  }
});

app.post("/login", (req, res) => {
    db.collection("users").find(req.body).toArray(function(err, result){
      if(err) throw err;
      if(result.length == 0) { 
        res.redirect("/error.html");
      } else { 
        var id = result[0]['id']; 
        req.session.uid = id;
        res.redirect('/login');
      }
    });
});

app.post("/register", (req, res) => {
    req.body['money'] = 20000; 
    req.body["id"]    = uuid.v4(); //
    req.body["cart"]  = []; 
    db.collection("users").insertOne(req.body);
    console.log("inserted");
    res.redirect("/success.html");
});

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(logger);
app.use("/api/user", users);
app.use("/api/books", books);

app.get('*', (req, res, next) => {
  if(!req.session.uid) {
    res.redirect('/')
  } else {
    next();
  }
});