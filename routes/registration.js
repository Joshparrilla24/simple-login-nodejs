
var model = require('../models/user');

exports.SignUp = function(req, res){
    var message = '';
    if(req.method=='POST'){
        var user = req.body;
        model.add(user,function(err,result){
            if(err){
                console.log(err);
                message = err.message;
                res.render('signup.pug', {message: message});
            }else{
                message = 'Account created successfully!';
                res.render('index.pug',{message: message});
            }
        });
    }else{
        message='';
        res.render('signup',{message: message}); 
    }
};

exports.Login = function(req, res){
    var message = '';
    var session = req.session;
    if(req.method = 'POST'){
        var user = req.body;
        model.login(user,function(err, results){
            if(results.length){
                req.session.userId = results[0].id;
                req.session.user = results[0];
                console.log(results[0].id,results[0]);
                res.redirect('/home/dashboard');
            }else{
                message = 'incorrect username/password';
                res.render('index.pug',{message:message});
            }
        });
    }else{
        res.render('index.pug',{message:message});
    }
    
};

exports.DashBoard = function(req, res){
    var user = req.session.user;
    var userId = req.session.userId;
    console.log("userid="+userId);
    if(userId===null){
        res.redirect('/login');
        return;
    }
    model.byId(userId,function(err, results){
        res.render('dashboard.pug',{user:user});
    });
};

exports.Logout = function(req, res){
    req.session.destroy(function(err){
        res.redirect('/');
    });
}

exports.Profile = function(req, res){
    var user = req.session.user;
    var userId = req.session.userId;
    if(userId===null){
        res.redirect('/');
        return;
    }
    model.byId(userId,function(err,result){
        res.render('profile.pug',{data: result, user: user});
    });
};