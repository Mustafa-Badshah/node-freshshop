var connect = require("../config/connect");
var database = require("../config/database");


module.exports.save = function(req_body, fun) {
    connect(function(err, client) {
        if (err) {
            console.log(err);
            return;
        }
        var db = client.db(database.dbName);
        db.collection("product").insert(req_body, fun)
    });
}
module.exports.search = function(where, fun) {
    connect(function(err, client) {
        if (err) {
            console.log(err);
            return;
        }
        var db = client.db(database.dbName);
        db.collection("product").find(where).toArray(fun);
    });
}
module.exports.remove = function(where, fun) {
    connect(function(err, client) {
        if (err) {
            consolee.log(err);
            return;
        }
        var db = client.db(database.dbName);
        db.collection("product").remove(where, fun);

    });
}
module.exports.update = function(where, obj, fun) {
    connect(function(err, client) {
        if (err) {
            console.log(err);
            return;
        }
        var db = client.db(database.dbName);
        db.collection("product").update(where, { $set: obj }, fun);
    });
}