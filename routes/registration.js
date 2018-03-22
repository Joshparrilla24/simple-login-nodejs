//Sign up
exports.SignUp = function(req,res){
    var message = '';
    if(req.method == 'POST')
    {
      var form = req.body;
      var username = form.user_name;
      var password = form.password;
      var firstName = form.first_name;
      var lastName = form.last_name;
      var mobile = form.mob_no;
  
      var sql = "INSERT INTO `users`(`first_name`,`last_name`,`mob_no`,`user_name`, `password`) VALUES ('" + firstName + "','" + lastName + "','" + mobile + "','" + username + "','" + password + "')";
  
      var query = db.query(sql, function(err, result) {
        message = "Account created successfully!";
        res.render('signup.pug',{message: message});
      });
    }else{
      res.render('signup',{message:message});
    }
};
//Login
exports.Login = function(req, res){
    var message = '';
    var session = req.session;
    if(req.method = 'POST'){
        var form = req.body;
        var username = form.user_name;
        var password = form.password;

        var sql = "SELECT * FROM `users` WHERE `user_name`='"+username+"' AND `password`='"+password+"'";
        db.query(sql,function(err,results){
            if(results.length){
                req.session.userId = results[0].id;
                req.session.user = results[0];
                console.log(results[0].id);
                res.redirect('/home/dashboard');
            }else{
                message = 'incorrect username/password!'
                res.render('index.pug',{message:message});
            }
        });
    }else{
        res.render('index.pug',{message:message});
    }
};

//Dashboard
exports.DashBoard = function(req, res){
    var user = req.session.user;
    userId = req.session.userId;
    console.log("userid="+userId);
    if(userId===null){
        res.redirect('/login');
        return;
    }
    var sql = "SELECT * FROM `users` WHERE id='"+userId+"'";
    db.query(sql, function(err, results){
        res.render('dashboard.pug',{user:user});
    });
};
//Logout
exports.Logout = function(req, res){
    req.session.destroy(function(err){
        res.redirect('/login');
    });
}