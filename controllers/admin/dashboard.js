var express = require("express");
var routes = express.Router();

routes.get("/", function(req, res) {
    var pagedata = { pagename: "admin/dashboard/index", title: "Dashboard" }
    res.render("addmin_layout", pagedata);
});




module.exports = routes;