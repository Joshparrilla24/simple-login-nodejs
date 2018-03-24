var model = require('../../models/user');

exports.Profile = function(req, res){
    var user = req.session.user;
    var userId = req.session.userId;
    if(userId === null){
        res.redirect('/');
        return;
    }
    model.byId(userId, function(err, result){
        res.render('profile.pug', {data: result, user: user});
    });
};