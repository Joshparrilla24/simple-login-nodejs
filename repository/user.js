var user = require('../models/user');
//API user get method by id
exports.ById = function(req, res, next){
    if(req.params.id){
        user.byId(req.params.id,function(err, rows){
            if(err){
                res.json(err);
            }
            res.json(rows);
        });
    }
};
// API user get all users 
exports.All = function(req,res, next){
    user.all(function(err, rows){
        if(err){
            res.json(err);
        }
        res.json(rows);
    });
};
//API add user 
exports.Add = function(req, res, next){
    user.add(req.body.user, function(err,count){
        if(err){
            res.json(err);
        }
        res.json(req.body.user);
    });
};
//API user update
exports.Update = function(req, res, next){
    if(req.params.id){
        user.update(req.params.id,req.body.user,function(err, rows){
            if(err){
                res.json(err);
            }
            res.json(rows);
        });
    }
};
//API user delete
exports.Delete = function(req, res, next){
    if(req.params.id){
        user.delete(req.params.id,function(err,count){
            if(err){
                res.json(err);
            }
            res.json(count);
        });
    }
};