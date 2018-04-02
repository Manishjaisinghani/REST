//all middleware goes here

var Campground = require("../models/campground")
var Comment = require("../models/comment")
var middlewareObj = {};


middlewareObj.checkCampgroundOwnership = function(req, res, next){
        if(req.isAuthenticated()){
         Campground.findById(req.params.id, function(err, foundCampground){
            if(err){
                req.flash("error", "Campground not found");
                res.redirect("back");
            }else{
                //if user logged in, does user own campground
                if(foundCampground.author.id.equals(req.user._id)){
                    next();
                }else{
                    req.flash("error", "You do not have permission to perform the action");
                    res.redirect("back");
                }
            }
        });
    }else{
        req.flash("error", "You need to be logged in!");
        res.redirect("back");
    }
}

middlewareObj.checkCommentOwnership = function(req, res, next){
        if(req.isAuthenticated()){
         Comment.findById(req.params.comment_id, function(err, foundComment){
            if(err){
                res.redirect("back");
            }else{
                //if user logged in, does user own comment
                if(foundComment.author.id.equals(req.user._id)){
                    next();
                }else{
                    req.flash("error", "You do not have permission to perform the action");
                    res.redirect("back");
                }
            }
        });
    }else{
        req.flash("error", "You need to be logged in!");
        res.redirect("back");
    }
}

middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "You need to be logged in!");
    res.redirect("/login");
}

module.exports = middlewareObj