var express = require('express');
var router = express.Router({mergeParams: true});
var Campground = require('../models/campgrounds');
var Comment = require('../models/comments');
var middleware = require('../middleware');

router.get("/campgrounds/:id/comments/new", middleware.isLoggedIn, function(req, res){
    //find campground by id
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
        }else{
            res.render("comments/new", {campground: campground, currentUser: req.user});
        }
    });
});

router.post("/campgrounds/:id/comments", middleware.isLoggedIn, function(req, res){
    //look up campground using ID
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
            res.redirect("/campgrounds");
        }else{
            Comment.create(req.body.comment, function(err, comment){
                if(err){
                    req.flash("error", "Something went wrong!");
                    console.log(err);
                }else{
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    comment.save();
                    campground.comments.push(comment);
                    campground.save();
                    console.log(comment);
                    req.flash("success", "Successfully added comment!");
                    res.redirect('/campgrounds/' + campground._id);
                }
            });
        }
    })
})

router.get("/campgrounds/:id/comments/:comment_id/edit", middleware.isLoggedIn, middleware.checkCommentOwnership, function(req, res){
    
    Campground.findById(req.params.id, function(err, foundCampground){
        if(err || !foundCampground){
            req.flash("error", "Cannot find that campground!");
            return res.redirect("back");
        }
        
        Comment.findById(req.params.comment_id, function(err, foundComment){
        if(err || !foundComment){
            res.redirect("back");
        }else{
            res.render("comments/edit", {campground_id: req.params.id, comment: foundComment});
        }
    });
});
    
    
});

router.put("/campgrounds/:id/comments/:comment_id", middleware.isLoggedIn, middleware.checkCommentOwnership, function(req, res){
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
        if(err || !updatedComment){
            res.redirect("back");
        }else{
            res.redirect("/campgrounds/"+req.params.id);
        }
    })
})

router.delete("/campgrounds/:id/comments/:comment_id/destroy", middleware.isLoggedIn, middleware.checkCommentOwnership, function(req, res){
    Comment.findByIdAndRemove(req.params.comment_id, function(err){
        if(err){
            res.redirect("back");
        }else{
            req.flash("success","Comment deleted!");
            res.redirect("/campgrounds/"+req.params.id);
        }
    })
})



module.exports = router;