/*
this middleware consumes a segment of the URL,
gets a state
and keeps consuming until there is nothing left

consume(obj, id, next)
*/


module.exports = function (consume, root){
    return function(req, res, next){
        var obj = root,
            path = req.url,
            path = (path[0] === '/' && path.slice(1) || path),
            pathlist = path.split('/'),
            id;    
            // from /hello/hode/js to [hello, node, js]

        (function rec(o){
            // exit condition: no obj returned
            if (!o){
                pathlist.unshift(id);
                req.url = pathlist.join('/');
                return next();
            }
            
            req.context = o;
            
            // exit condition: path exausted
            id = pathlist.shift();
            if (!id){
                return next();                
            }

            req.url = pathlist.join('/');
                        
            consume(o, id, rec);

        }(obj));

    };
};
