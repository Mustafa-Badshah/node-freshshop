var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var session = require("express-session");
var flash = require("express-flash");
var cache = require("nocache");
var upload = require("express-fileupload");
var expressValidator = require("express-validator")
    // var sha1 = require("sha1");
var Catagory = require("./model/catagory");
var routes = require("./config/routes");



app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(bodyParser());
app.use(cookieParser());
app.use(session({ secret: "freshshope_5253" }));
app.use(flash());
app.use(cache());
app.use(upload());
// app.use(expressValidator())


app.use(function(req, res, next) {
    Catagory.search({}, function(err, result) {
        res.locals.logo = "images/logo.png";
        res.locals.session = req.session;
        res.locals.allcatagory = result;
        // console.log(sha1("admin"));
        next();
    });
});

app.use(routes);
app.listen(5253, function() {
    console.log("Server Is Running");
});

















// var n = 0;
// var arr = ["/", "/Aboutus", "/contact"];
// app.use(arr, function(Req, res, next) {
//     n++;
//     console.log("total : ", n);
//     next();
// });



// app.get("/", function(req, res) {
//     var pagedata = { pagename: "Home/index", title: "Home", lightslider: "lightslider" };
//     res.render("layout", pagedata);
// });
// app.get("/Aboutus", function(req, res) {
//     var pagedata = {
//         pagename: "about/index",
//         title: "About",
//         lightslider: "lightslider"
//     };
//     res.render("layout", pagedata);
// });
// app.get("/gallery", function(req, res) {
//     var pagedata = {
//         pagename: "Gallery/index",
//         title: "Gallery",
//         lightslider: "lightslider"
//     };
//     res.render("layout", pagedata);
// });
// app.get("/contact", function(req, res) {
//     var pagedata = {
//         pagename: "Contact/index",
//         title: "Contact",
//         lightslider: "lightslider"
//     };
//     res.render("layout", pagedata);
// });
// app.get("/login", function(req, res) {
//     var pagedata = {
//         pagename: "login/index",
//         title: "Login",
//         lightslider: ""
//     };
//     res.render("layout", pagedata);
// });
// app.get("/singin", function(req, res) {
//     var pagedata = {
//         pagename: "Singin/index",
//         title: "Singin",
//         lightslider: ""
//     };
//     res.render("layout", pagedata);
// });