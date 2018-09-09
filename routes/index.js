
var express = require("express");
var router  = express.Router();
var passport = require("passport");
var User = require("../models/user");

router.get("/", function(req, res){
    res.render("login");
});

router.get("/register", function (req, res){
    res.render("register");
});

//signup logic
router.post("/register", function(req, res){
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            req.flash("error", "Someone with that username already exists!");
            return res.render("register");
        }
        passport.authenticate("local")(req, res, function(){
            req.flash("success", "You're logged in");
            res.redirect("/tickets");
        });
    });
});

router.get("/tickets", function (req, res) {
    res.render("tickets");
});

// handling login logic
router.post("/", passport.authenticate("local", 
{
    successRedirect: "/tickets",
    failureRedirect: "/"
}), function(req, res){
});

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "Please Login First");
    res.redirect("/login");
}

module.exports = router;