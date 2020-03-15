var MongoClient = require("mongodb").MongoClient;
var database = require("./database");

module.exports = function(cb) {
    MongoClient.connect(database.dbUrl, cb);

}