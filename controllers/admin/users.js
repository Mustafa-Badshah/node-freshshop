var express = require("express");
var routes = express.Router();
var User = require("../../model/user")
var mongodb = require("mongodb");

routes.get("/", function(req, res) {
    User.search({}, function(err, result) {
        var pagedata = { pagename: "admin/users/index", title: "User Information", user: result }
        res.render("addmin_layout", pagedata);
    });
})

routes.get("/:id/:status", function(req, res) {
    // console.log(req.params);
    var id = req.params.id;
    if (req.params.status == 1) {
        var status = 0;
    } else {
        var status = 1;
    }
    User.update({ _id: mongodb.ObjectId(id) }, { status: status }, function(err, result) {
        res.redirect("/admin/users");
    });
});



module.exports = routes;