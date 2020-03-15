var express = require("express");
var routes = express.Router();

routes.get("/", function(req, res) {
    var pagedata = {
        pagename: "Gallery/index",
        title: "Gallery",
        lightslider: "lightslider"
    };
    res.render("layout", pagedata);
});
module.exports = routes;