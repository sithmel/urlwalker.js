
var assert = require('assert'),
    view = require('../lib/view'),
    middle = view(function (url, method, context, req, res){
        if (url == "/index.json" && method == "GET"){
            res.send(req.context);
        }
    });

describe('View middleware', function(){

    it('middleware is a function', function(){
        assert(middle instanceof Function);
    });

    it('get view', function(done){
        var req = {path:'/index.json', method: 'GET', context: "test"};
        var res = {send: function (s){
          assert(s === "test");
          done();
        }};
        middle(req, res);
    });

});
