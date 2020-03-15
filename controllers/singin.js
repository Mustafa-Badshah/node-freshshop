var express = require("express");
var routes = express.Router();
var { check, validationResult } = require('express-validator');
// var MongoClient = require("mongodb").MongoClient;
// var url = "mongodb://localhost:27017";
// var database = require("../config/database");
var sha1 = require("sha1");

var User = require("../model/user");





routes.get("/",
    //  [
    // check('f_name', 'This Field Is Required !').exists(),

    // check('email', 'Insert Correct Email !').isEmail(),
    // check('password', 'Insert This Field !').isLength({ min: 8 })
    // ],
    function(req, res) {
        // var error = validationResult(req);
        // console.log(error.mapped());
        var pagedata = {
            pagename: "Singin/index",
            title: "Singin",
            // error: error.mapped(),
            lightslider: ""
        };
        res.render("layout", pagedata);
    });

routes.post("/", function(req, res) {
    req.body.password = sha1(req.body.password);
    // req.body.status = database.status;
    User.save(req.body, function(err, result) {
        res.redirect("/login");
    });
});





// routes.post("/", function(req, res) {
//     // console.log(req.body);
//     req.body.password = sha1(req.body.password);
//     MongoClient.connect(database.dbUrl, function(err, client) {
//         if (err) {
//             console.log(err);
//             return;
//         }
//         var db = client.db(database.dbName);
//         db.collection("user").insert(req.body, function(err, result) {
//             if (err) {
//                 console.log(err);
//                 return;
//             }
//             console.log(result);
//             res.redirect("/login");
//         });
//     });
// });
module.exports = routes;