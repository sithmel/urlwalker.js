var express = require('express');
var app = express();
var occamsrazor = require('occamsrazor');

var traversal = require('../lib/index').traversal;
var data = require("./data");

var getObject = occamsrazor();
var has_authors = occamsrazor.validator().has("authors");
var has_books = occamsrazor.validator().has("books");

getObject.add(null, function (obj, id, cb){
    return cb(); // this will match if no one else match
});

getObject.add(has_authors, function (obj, id, cb){
    return cb(obj.authors[id]);
});

getObject.add(has_books, function (obj, id, cb){
    return cb(obj.books[id]);
});

var traversal_middleware = traversal(getObject, data);
app.use(traversal_middleware);
app.get('/index.json', function(req, res) {
    res.send(req.context);
});

var server = app.listen(3000, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Try visiting http://%s:%s/douglas_adams/hitchikers_guide/index.json', host, port);
  console.log('Or http://%s:%s/douglas_adams/index.json', host, port);

});
