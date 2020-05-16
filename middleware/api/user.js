const express                 =   require('express');
const router                  =   express.Router();
const MongoClient             =   require("mongodb").MongoClient;
const MONEY                   =   20000;
var db, users
var mongourl                  =   "mongodb://localhost:27017/bookstore";
const uuid = require("uuid");
MongoClient.connect(mongourl, (err, database) => {
    if (err) return console.log(err);
    db = database.db("bookstore");
});

router.get("/", (req, res) => {
    if(req.session.uid) {
      db.collection('users').find({id: req.session.uid }).toArray(function(err, result) {
        if(err) throw err;
        res.json(result);
      });
    } else {
      res.json([]);
    }
});

router.post('/', (req, res) => {

    db.collection("users").insertOne({
      id      : uuid.v4(),
      name    : req.body.name,
      pswd    : req.body.pswd,
      email   : req.body.email,
      birth   : req.body.birth,
      address : req.body.address,
      money   : req.body.money||MONEY,
      cart    : []
    });
    res.json({success:true});
});

router.put("/:id", (req, res) => {
  var myquery = { id: req.params.id };
  var newvalues = { $set: req.body };
  db.collection("users").update(myquery, newvalues, function(err, res) {
    if (err) throw err;
    console.log("1 document updated...");

  }, {upsert:true});
  res.send('ok');
});

router.put("/", (req, res) => {
  if(!req.session.uid) return false;
  var myquery = { id: req.session.uid };
  delete req.body["_id"];
  var newvalues = { $set: req.body };
  db.collection("users").update(myquery, newvalues, function(err, res) {
    if (err) throw err;
    console.log("1 document updated...");

  }, {upsert:false});
  res.send('ok');
});

router.delete('/:id', (req, res) => {
  var myquery = { id: req.params.id };
  db.collection("users").deleteOne(myquery, function(err, obj) {
    if (err) throw err;
    console.log("1 document deleted...");

  });
  res.send('ok');
});

module.exports = router;