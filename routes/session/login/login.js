var model = require('../../../models/user');

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