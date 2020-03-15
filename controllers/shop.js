var express = require("express");
var routes = express.Router();
var MongoClient = require("mongodb").MongoClient;
var url = "mongodb://localhost:27017";

routes.get("/checkout", function(req, res) {
    var pagedata = {
        pagename: "shop/checkout/index",
        title: "admin panel",
        lightslider: "lightslider"
    }
    res.render("layout", pagedata);
});
routes.get("/cart", function(req, res) {
    var pagedata = {
        pagename: "shop/cart/index",
        title: "cart",
        lightslider: "lightslider"
    }
    res.render("layout", pagedata);
});

routes.post("/", function(req, res) {
    // console.log(req.body);
    MongoClient.connect(url, function(err, client) {
        if (er) {
            console.log(err)
            return;
        }
        var db = client.db("mr_badshah");
        db.collection("Billing_details").insert(req.body, function(err, result) {
            if (err) {
                console.log(err);
                return;
            }
            console.log(result);
            res.redirect("/login");
        });
    });
});

module.exports = routes;