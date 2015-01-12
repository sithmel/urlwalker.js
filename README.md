urlwalker.js
============

A routing middleware for node.js

Object traversal middlewares
============================
This package consists of 2 express (and connect) middlewares useful for "context aware" routing.

Traversal middleware
====================
This middleware is used to get the "context" from a fragment of HTTP URL. The context will be saved inside req.context. I call this process "traversing the URL" and the middleware "traversal". This is how to initialize the middleware:

    var traversal = require('urlwalkerjs').traversal;
    var traversal_middleware = traversal(function (obj, id, cb){
        return cb({ ... a new object ... });
        // or
        return cb(); // end of traversing
    }, { ... the root object ... });

Then you can use the traversal as express middleware:

    app.use(traversal_middleware);

    app.get('index.json', function(req, res) {
      res.send(req.context);
    });

How it works
------------
The middleware takes one segment of the URL and run the function with the root object. Then it repeats the process again using the resulting object and the next segment of the URL, and so on.
When it can't return a new object it puts the last valid object in req.context and pass the control to the next middleware (the regular routing middleware for example).
You can find an example in examples/example1.js.

View middleware
===============
This middleware is designed to work together with the traversal middleware. It works the same as an ordinary express controller. But it will perform the routing match inside the function:

    var view = require('urlwalkerjs').view;

    var view_middleware = view(function (url, method, context, req, res, next){
        if (url == "index.json" && method == "GET"){
            res.send(req.context);
        }
        else {
          next();
        }
    });

    app.use(traversal_middleware);
    app.use(view_middleware);


How it works
------------
It is designed to work with [occamsrazor.js](https://github.com/sithmel/occamsrazor.js)! Have a look to the example2-3.
