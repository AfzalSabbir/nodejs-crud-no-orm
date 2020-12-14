var express = require('express');
var router = express.Router();
var mongo = require('mongodb');
var assert = require('assert');
let dbName = 'test';
var url = 'mongodb://localhost:27017/test';

const MongoClient = require('mongodb').MongoClient

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('pages/index', { title: 'Home', active: {home:true} });
});
/* GET post page. */
router.get('/post', function(req, res, next) {
  MongoClient.connect(url, function (err, client){
    assert.strictEqual(null, err);
    const db = client.db(dbName);
    let posts = [];

    let cursor = db.collection('posts').find().toArray((err, results) => {
      if(err) throw err;
      posts = results;
      /*results.forEach((value)=>{
        console.log(value);
      });*/
    })
    client.close();
  });

  res.render('pages/post', { title: 'Post', active: {post:true}, posts });
});
/* POST post page. */
router.post('/post', function(req, res, next) {
  let item = {
    title: req.body.title,
    description: req.body.description,
  };

  MongoClient.connect(url, function (err, client){
    assert.strictEqual(null, err);
    const db = client.db(dbName);

    db.collection('posts').insertOne(item, function (error, result){
      assert.strictEqual(null, error);
      console.log('jjuuhhuh')
    });
    client.close();
  });
  res.redirect('/post');
});

module.exports = router;
