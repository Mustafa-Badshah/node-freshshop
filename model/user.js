var connect = require("../config/connect");
var database = require("../config/database");



module.exports.save = function(req_body, func) {
    connect(function(err, client) {
        if (err) {
            console.log(err);
            return;
        }
        var db = client.db(database.dbName);
        db.collection("user").insert(req_body, func);
    });
}

module.exports.search = function(where, func) {
    connect(function(err, client) {
        if (err) {
            console.log(err);
            return;
        }
        var db = client.db(database.dbName);
        db.collection("user").find(where).toArray(func);
    });
}

module.exports.update = function(where, obj, cb) {
    connect(function(err, client) {
        if (err) {
            console.log(err);
            return;
        }
        var db = client.db(database.dbName);
        db.collection("user").update(where, { $set: obj }, cb);
    });
}