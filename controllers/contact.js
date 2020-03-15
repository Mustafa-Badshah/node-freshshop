var express = require("express");
var routes = express.Router();

routes.get("/", function(req, res) {
    var pagedata = {
        pagename: "Contact/index",
        title: "Contact",
        lightslider: "lightslider"
    };
    res.render("layout", pagedata);
});
module.exports = routes;