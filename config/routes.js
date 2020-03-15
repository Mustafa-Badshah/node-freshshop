var express = require("express");
var routes = express.Router();

var url = ["/profile"];
// backdoor protation code
routes.use(url, function(req, res, next) {

    if (!req.session.is_user_logged_in) {
        console.log("jhghghjk");
        res.redirect("/login");
        return;
    }
    next();
});





routes.use("/", require("../controllers/home"));
routes.use("/Aboutus", require("../controllers/about"));
routes.use("/gallery", require("../controllers/gallery"));
routes.use("/contact", require("../controllers/contact"));
routes.use("/shop", require("../controllers/shop"));
routes.use("/login", require("../controllers/login"));
routes.use("/singin", require("../controllers/singin"));
routes.use("/profile", require("../controllers/profile"));


routes.use("/admin", require("./adminroutes"));
routes.get("/logout", function(req, res) {
    req.session.destroy();
    res.redirect("/login");

});

routes.get("*", function(req, res) {
    res.render("pagenotfond/index", { title: "page not found" })
});


module.exports = routes;