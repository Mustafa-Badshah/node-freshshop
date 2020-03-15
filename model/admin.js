var connect = require("../config/connect");
var database = require("../config/database");




module.exports.save = function(req_body, func) {
    connect(function(err, client) {
        if (err) {
            console.log(err);
            return;
        }
        var db = client.db(database.dbName);
        db.collection("admin").insert(req_body, func);
    });
}

module.exports.search = function(where, func) {
    connect(function(err, client) {
        if (err) {
            console.log(err);
            return;
        }
        var db = client.db(database.dbName);
        db.collection("admin").find(where).toArray(func);
    });
}