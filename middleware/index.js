// all the middleware goes here

var Campground = require('../models/campgrounds');
var Comment = require('../models/comments');

var middlewareObj = {};

middlewareObj.checkCampgroundOwnership = function(req, res, next){
    if(req.isAuthenticated()){
        Campground.findById(req.params.id, function(err, foundCampground){
        if(err || !foundCampground){
            res.redirect("back");
        }else{
            if(foundCampground.author.id.equals(req.user._id)){
           next();
        }
        else{
            req.flash("error", "You don't have permission to do that!");
            res.redirect("back");
        }
        }
    });}
    else{
        req.flash("error", "You need to be logged in to do that!");
        res.redirect("back");
    }
}

middlewareObj.checkCommentOwnership = function(req, res, next){
    
    
    Comment.findById(req.params.comment_id, function(err, foundComment){
        if(err || !foundComment){
            req.flash("error", "Comment Not Found!");
            res.redirect("back");
        }else{
            //Users id with comment's author id
            if(foundComment.author.id.equals(req.user._id)){
                next();
            }else{
                req.flash("error", "You don't have permission to do that!");
                res.redirect("back");
            }
        }
    });
    
}

middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }else{
        req.flash("error", "You need to be logged in to do that!");
        res.redirect("/login");
    }
}


module.exports = middlewareObj;