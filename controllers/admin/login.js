var express = require("express");
var routes = express.Router();
var Admin = require("../../model/admin");
var sha1 = require("sha1");

routes.get("/", function(req, res) {
    var pagedata = { title: "Admin Panel", pagename: "admin/login/index", errMsg: req.flash("error") }
    res.render("addmin_layout", pagedata);
});


routes.post("/", function(req, res) {
    // console.log(req.body);
    var u = req.body.username;
    var p = req.body.password;
    Admin.search({ username: u }, function(err, result) {
        if (result.length == 1) {
            if (result[0].password == sha1(p)) {
                req.session.a_id = result[0]._id;
                req.session.a_name = result[0].name;
                req.session.is_admin_logged_in = true;
                res.redirect("/admin/dashboard")

            } else {
                req.flash("error", "Your password is incorrect");
                res.redirect("/admin");
            }

        } else {
            req.flash("error", "Your username and password is incorrect");
            res.redirect("/admin");
        }
    });



});


module.exports = routes;