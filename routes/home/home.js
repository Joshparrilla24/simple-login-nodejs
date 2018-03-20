exports.Index = function(req, res, next) {
    var message = '';
    res.render('index', {message: message, title: 'Express'});
  };