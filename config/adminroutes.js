var express = require("express");
var routes = express.Router();


var url = ["/dashboard", "/catagory", "/product", "/users"];
routes.use(url, function(req, res, next) {
    if (!req.session.is_admin_logged_in) {
        res.redirect("/admin");
        return;
    }
    next();

});

routes.use("/", require("../controllers/admin/login"));
routes.use("/product", require("../controllers/admin/product"));
routes.use("/dashboard", require("../controllers/admin/dashboard"));
routes.use("/catagory", require("../controllers/admin/catagory"));
routes.use("/users", require("../controllers/admin/users"));

routes.get("/logout", function(req, res) {
    req.session.destroy();
    res.redirect("/admin");
});
module.exports = routes;