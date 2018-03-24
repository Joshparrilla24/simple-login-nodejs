var model = require('../../models/user');

exports.DashBoard = function(req, res){
    var user = req.session.user;
    var userId = req.session.userId;
    if(userId === null){
        res.redirect('/login');
        return;
    }
    model.byId(userId, function(err, results){
        res.render('dashboard.pug', {user: user});
    });
};