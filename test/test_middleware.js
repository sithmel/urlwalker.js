// install mocha and should.js to get the test run 
// sudo npm -g install mocha
//
// run with "mocha"

var assert = require('assert'),
    traversal = require('../lib/index'),
    middle = traversal(function (obj, id, cb){
        if (obj === "hello world !"){
            return cb(); // return undefined
        }
        return cb(obj + " " + id);
    }, "hello");


describe('Traverse middleware', function(){

    it('middleware is a function', function(){
        assert(middle instanceof Function);
    });

    it('traversing', function(){
        var req = {url:'/world'};
        middle(req, null, function (){
            assert(req.url === '');
            assert(req.context === 'hello world');
        });
    });

    it('traversing 2', function(){
        var req = {url:'/world/!'};
        middle(req, null, function (){
            assert(req.url === '');
            assert(req.context === 'hello world !');
        });
    });    

    it('traversing 3 (too long)', function(){
        var req = {url:'/world/!/foo'};
        middle(req, null, function (){
            assert(req.url === 'foo');
            assert(req.context === 'hello world !');
        });
    });    

    it('traversing 4 (empty)', function(){
        var req = {url:'/'};
        middle(req, null, function (){
            assert(req.url === '/');
            assert(req.context === 'hello');
        });
    });    
});


