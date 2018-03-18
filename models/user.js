var db = require('../db/db_connect');

var user = {
    all: function(callback){
        return db.query("SELECT * from users", callback);
    },
    byId: function(id, callback){
        return db.query("SELECT * from users WHERE id=?",[id], callback);
    },
    add: function(user, callback){
        return db.query("INSERT into users values(?,?,?,?,?)", [user.first_name,user.last_name,user.mob_no,user.user_name,user.password],callback);
    },
    update: function(id, user, callback){
        return db.query("UPDATE users set first_name=?, last_name=?, password=? WHERE id=?",[user.first_name,user.last_name,id], callback );
    },
    delete: function(id, callback){
        return db.query("DELETE * from users WHERE id=?", [id], callback);
    }
};

module.exports = user;

