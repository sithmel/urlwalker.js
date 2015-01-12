var express = require('express');
var app = express();
var traversal = require('../lib/index').traversal;
var data = require("./data");

var traversal_middleware = traversal(function (obj, id, cb){
    if (obj.authors){
        return cb(obj.authors[id]);
    }
    else if (obj.books){
        return cb(obj.books[id]);
    }
    return cb(); // end of traversing
},data);

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
