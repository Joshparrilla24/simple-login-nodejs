var model = require('../../models/user');

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