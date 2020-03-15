var express = require("express")
var routes = express.Router();
var User = require("../model/user");
var mongodb = require("mongodb");
var sha1 = require("sha1");
var path = require("path");
var random = require("randomstring");
var fs = require("fs");



routes.get("/", function(req, res) {
    var id = req.session._id;
    User.search({ _id: mongodb.ObjectId(id) }, function(err, result) {
        var pagedata = { pagename: "Profile/index", title: "Profile", lightslider: "", user: result[0] }
        res.render("layout", pagedata);
    });
});

routes.get("/edit", function(req, res) {
    var id = req.session._id;
    // console.log(id);
    User.search({ _id: mongodb.ObjectId(id) }, function(err, result) {
        // console.log(result);
        var pagedata = {
            pagename: "Profile/edit",
            title: "Edit Profile",
            lightslider: "",
            user: result[0]
        }
        res.render("layout", pagedata);
    });
});
routes.post("/update", function(req, res) {
    var id = req.session._id;
    delete req.body._id;
    User.update({ _id: mongodb.ObjectId(id) }, req.body, function(err, result) {
        // console.log(result);
        res.redirect("/profile");

    });
});

routes.get("/changepassword", function(req, res) {
    var pagedata = {
        pagename: "Profile/changepassword",
        title: "Change password",
        lightslider: "",
        errMsg: req.flash("msg")
    };
    res.render("layout", pagedata);
});

routes.post("/changepassword", function(req, res) {
    // console.log(req.body);
    var a = req.body.c_password;
    var b = req.body.n_password;
    var c = req.body.cn_password;
    var id = req.session._id;
    // console.log(id);
    User.search({ _id: mongodb.ObjectId(id) }, function(err, result) {
        if (result[0].password == sha1(a)) {
            if (b == c) {
                User.update({ _id: mongodb.ObjectId(id) }, { password: sha1(b) }, function(err, result) {
                    req.flash("msg", "Your password has been changed");
                    res.redirect("/profile");
                });
            } else {
                req.flash("msg", "Password And New Password does Not Match !");
                res.redirect("/profile/changepassword");
            }
        } else {
            req.flash("msg", "Current Passoword Doesn't Not Match !");
            res.redirect("/profile/changepassword");
        }
    });
});

routes.get("/changeimage", function(req, res) {
    var pagedata = { pagename: "Profile/changeimage", title: "Change Profile", lightslider: "", message: req.flash("msg") }
    res.render("layout", pagedata)
})

routes.post("/changeimage", function(req, res) {
    // console.log(req.files)
    var objid = mongodb.ObjectId(req.session._id);
    var image = req.files.image;
    var name = image.name;
    var size = image.size;
    // console.log(size);

    var arr = name.split(".");
    var ext = arr[arr.length - 1];

    if (ext == "jpg" || ext == "png" || ext == "jpeg" || ext == "gif") {
        if (size <= (1024 * 1024 * 2)) {
            User.search({ _id: objid }, (err, result) => {
                if (result[0].image) {
                    var oldfilename = result[0].image;
                    fs.unlinkSync(path.resolve() + "/public/user_profile/" + oldfilename);
                }
            });

            var new_name = random.generate(30) + "." + ext;
            var file_path = path.resolve() + "/public/user_profile/" + new_name;
            image.mv(file_path, function(err) {
                if (err) {
                    console.log(err);
                }
                User.update({ _id: objid }, { image: new_name }, function(err, result) {
                    res.redirect("/profile")
                })
            })
        } else {
            req.flash("msg", "File Size Error");
            res.redirect("/profile/changeimage");
        }
    } else {
        req.flash("msg", "File Type Not Allow Erorr")
        res.redirect("/profile/changeimage");
    }



})

module.exports = routes;