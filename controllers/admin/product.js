var express = require("express");
var routes = express.Router();
var Product = require("../../model/product");
//var database = require("../../config/database");
var Catagory = require("../../model/catagory");
var mongodb = require("mongodb");
var path = require("path");
var random = require("randomstring");

// var MongoClient = require("mongodb").MongoClient;
// var url = "mongodb://localhost:27017";
// var database = require("../../config/database");






routes.get("/", function(req, res) {
    Catagory.search({}, function(err, result) {
        var pagedata = { pagename: "admin/product/index", title: "Product", catagory: result };
        var pagedata = { pagename: "admin/product/index", title: "Product", catagory: result, errorMsg: req.flash("msg") }
        res.render("addmin_layout", pagedata);
    });
});

routes.post("/", function(req, res) {
    // console.log(req.files);
        var a = random.generate(25);
        
        
        
        var image = req.files.image;
        // console.log(image);
        var size = image.size;
        var filename = image.name;
        var arr = filename.split(".");
        var ext = arr[arr.length - 1];
        var newName = a + "." + ext;
        var uploadPath = path.resolve() + "/public/upload/" + newName;

        if (ext == "jpg" || ext == "gif" || ext == "png" || ext == "jpeg") {
            if (size <= (1024 * 1024)) {
                image.mv(uploadPath, function(err) {
                    req.body.product_price = parseInt(req.body.product_prie);
                    req.body.product_discount = parseInt(req.body.product_discount);
                    req.body.image = newName;

                    Product.save(req.body, function(err, result) {
                        res.redirect("/admin/product/view");
                    });
                });
            } else {
                req.flash("msg", "This File is too large");
                res.redirect("/admin/product");
            }
        } else {
            req.flash("msg", "This Fileis type not allowed");
            res.redirect("/admin/product");

        }

    // });
    // req.body.product_price = parseInt(req.body.product_price);
    // req.body.product_discount = parseInt(req.body.product_discount);
    // // console.log(req.body);
    // Product.save(req.body, function(err, result) {
    //     res.redirect("/admin/product");
});
routes.get("/view", function(req, res) {
    Product.search({}, function(err, result) {
        var pagedata = { pagename: "admin/product/view", title: "Admin View", Product: result }
        res.render("addmin_layout", pagedata);
    });
});

routes.get("/delete", function(req, res) {
    var a = req.query.id;
    Product.remove({ _id: mongodb.ObjectId(a) }, function(err, result) {
        res.redirect("/admin/product/view");
    });
});
routes.get("/edit/:id", function(req, res) {
    // console.log(req.params);
    var id = req.params.id;
    Catagory.search({}, function(err, result1) {
        Product.search({ _id: mongodb.ObjectId(id) }, function(err, result2) {
            // console.log("result");
            var pagedata = { title: "Edit Product", pagename: "admin/product/edit", product: result2[0], catagory: result1 }
            res.render("addmin_layout", pagedata);
        });
    });
});
routes.post("/update", function(req, res) {
    var id = req.body.id;
    delete req.body.id;
    Product.update({ _id: mongodb.ObjectId(id) }, req.body, function(err, result) {
        res.redirect("/admin/product/view");
    });
});
module.exports = routes;