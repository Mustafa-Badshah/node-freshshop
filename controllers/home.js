var express = require("express");
var routes = express.Router();
var Product = require("../model/product");








routes.get("/", function(req, res) {
    Product.search({}, function(err, result) {
        var pagedata = { pagename: "Home/index", title: "Home", lightslider: "lightslider", product: result };
        res.render("layout", pagedata);
    });
});


module.exports = routes;