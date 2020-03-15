var connect = require("../config/connect");
var database = require("../config/database");





module.exports.insert = function(req_body, func) {
    connect(function(err, client) {
        // if (err) {
        //     console.log(err);
        //     return;
        // }

        var db = client.db(database.dbName);
        db.collection("catagory").insert(req_body, func);
    });
}
module.exports.search = function(where, fun) {
    connect(function(err, client) {
        if (err) {
            console.log(err);
            return;
        }
        var db = client.db(database.dbName);
        db.collection("catagory").find(where).toArray(fun);
    });
}
module.exports.remove = function(where, fun) {
    connect(function(err, client) {
        if (err) {
            console.log(err);
            return;
        }
        var db = client.db(database.dbName);
        db.collection("catagory").remove(where, fun);

    });
}
module.exports.update = function(where, obj, func) {
    connect(function(err, client) {
        if (err) {
            console.log(err);
            return;
        }
        var db = client.db(database.dbName);
        db.collection("catagory").update(where, { $set: obj }, func);
    });
}