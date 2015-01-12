var express = require('express');
var app = express();
var occamsrazor = require('occamsrazor');

var traversal = require('../lib/index').traversal;
var view = require('../urlwalker.js/lib/index').view;

var data = require("./data");

var getObject = occamsrazor();
var getView = occamsrazor();

var traversal_middleware = traversal(getObject, data);
var view_middleware = view(getView);

app.use(traversal_middleware);
app.use(view_middleware);

var is_anything = occamsrazor.validator();
var has_authors = is_anything.has("authors");
var has_books = is_anything.has("books");
var has_title = is_anything.has("title");

// traversing object

getObject.add(is_anything, function (obj, id, cb){
    return cb(); // this will match if no one else match
});

getObject.add(has_authors, function (obj, id, cb){
    return cb(obj.authors[id]);
});

getObject.add(has_books, function (obj, id, cb){
    return cb(obj.books[id]);
});

// getting views

getView.add(is_anything, function (url, method, context, req, res, next){
    next(); // this will match if no one else match
});

getView.add(["/index", "GET", has_books], function (url, method, context, req, res, next){
  res.send('this is the author name: ' + req.context.name);
});

getView.add(["/index", "GET", has_authors], function (url, method, context, req, res, next){
  res.send('these are the authors available: ' + Object.keys(req.context.authors));
});

getView.add(["/index", "GET", has_title], function (url, method, context, req, res, next){
  res.send('Book: ' + req.context.title + " - " + req.context.year);
});

var server = app.listen(3000, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Try visiting http://%s:%s/douglas_adams/hitchikers_guide/index', host, port);
  console.log('Or http://%s:%s/douglas_adams/index', host, port);
  console.log('Or http://%s:%s/index', host, port);

});
