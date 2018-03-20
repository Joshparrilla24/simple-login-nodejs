//Sign up
exports.SignUp = function(req,res){
    var message = '';
    if(req.method == 'POST'){
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
      res.render('signup',{message: message});
    }
};