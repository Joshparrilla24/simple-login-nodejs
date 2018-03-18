var mysql = require('mysql');
var settings = require('./settings');
var db;

//create mysql connection
function connectDb(){
    if(!db){
        db = mysql.createConnection(settings);
        db.connect(function(err){
            if(!err){
                console.log("Database is Connected!");
            }else{
                console.log("Error connecting to Database");
            }
        })
    }
    return db;
}
module.exports = connectDb();
