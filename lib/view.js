/*
view middleware

var view_middleware = view(function (url, method, context, req, res, next){
    if (url == "index.json" && method == "GET"){
        return function (req, res){
            res.send(req.context);
        }
    }
});

*/


module.exports = function (getView){
    return function (req, res, next){
        return getView(req.url, req.method, req.context, req, res, next);
    };
};
