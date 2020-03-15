var express = require("express");
var routes = express.Router();
var Catagory = require("../../model/catagory");
var mongodb = require("mongodb");

routes.get("/", function(req, res) {
    var pagedata = { pagename: "admin/catagory/index", title: "Catagory" }
    res.render("addmin_layout", pagedata);
});


routes.post("/", function(req, res) {
    //console.log(req.body);
    Catagory.insert(req.body, function(err, result) {
        res.redirect("/admin/catagory");
    });
});
routes.get("/view", function(req, res) {
    Catagory.search({}, function(err, result) {
        var pagedata = {
            pagename: "admin/catagory/view",
            title: "View Catagory",
            catagory: result
        }
        res.render("addmin_layout", pagedata);
    });
});

routes.get("/delete", function(req, res) {
    var a = req.query.id;
    Catagory.remove({ _id: mongodb.ObjectId(a) }, function(err, result) {
        res.redirect("/admin/catagory/view");
    });
});

routes.get("/edit/:id", function(req, res) {
    // console.log(req.params);
    var id = req.params.id;
    Catagory.search({ _id: mongodb.ObjectId(id) }, function(err, result) {
        // console.log(result);
        var pagedata = { pagename: "admin/catagory/edit", title: "Edit Catagory", catagory: result[0] }
        res.render("addmin_layout", pagedata);
    });
});
routes.post("/update", function(req, res) {
    // console.log(req.body);
    var id = req.body.id;
    delete req.body.id;
    Catagory.update({ _id: mongodb.ObjectId(id) }, req.body, function(err, result) {
        res.redirect("/admin/catagory/view");
    });
});

module.exports = routes;