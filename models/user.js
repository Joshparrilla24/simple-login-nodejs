var db = require('../db/db_connect');

var users = {
    all: function(callback){
        return db.query("SELECT * from users", callback);
    },
    byId: function(id, callback){
        return db.query("SELECT * from users WHERE id=?",[id], callback);
    },
    add: function(users, callback){
        return db.query("INSERT into users values(?,?,?,?,?,?)", [users.id,users.first_name,users.last_name,users.mob_no,users.user_name,users.password],callback);
    },
    update: function(id, users, callback){
        return db.query("UPDATE users set first_name=?, last_name=?, password=? WHERE id=?",[users.first_name,users.last_name,id], callback );
    },
    delete: function(id, callback){
        return db.query("DELETE * from users WHERE id=?", [id], callback);
    }

};

module.exports = users;

