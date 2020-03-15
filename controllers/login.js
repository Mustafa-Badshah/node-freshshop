var express = require("express");
var routes = express.Router();
var sha1 = require("sha1");
var User = require("../model/user");


routes.get("/", function(req, res) {
    var pagedata = {
        pagename: "login/index",
        title: "Login",
        lightslider: "",
        errMsg: req.flash("error")
    };
    res.render("layout", pagedata);
});







routes.post("/", function(req, res) {
    // console.log(req.body);
    var e = req.body.email;
    var p = req.body.password;

    User.search({ email: e }, function(err, result) {
        // console.log(result);
        if (result.length == 1) {
            if (result[0].password == sha1(p)) {
                req.session.name = result[0].f_name;
                req.session._id = result[0]._id;
                req.session.is_user_logged_in = true;
                res.redirect("/");
            } else {
                req.flash("error", "Your Password is Incorrect");
                res.redirect("/login");
            }

        } else {
            req.flash("error", "Your Email And Password is Incorrect");
            res.redirect("/login");
        }
    });
});
module.exports = routes;