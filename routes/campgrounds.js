var express = require("express");
var router = express.Router();
var Campground = require('../models/campgrounds');
var middleware = require('../middleware');

router.get("/campgrounds", function(req, res){
   
   //Get All Campgrounds from DB
   Campground.find({}, function(error, allCampgrounds){
      if(error){
          console.log(error);
      } 
      else{
          res.render('campgrounds/index', {camps : allCampgrounds, currentUser: req.user});
      }
   });
});

router.get("/campgrounds/new", middleware.isLoggedIn, function(req, res){
   res.render('campgrounds/new', {currentUser: req.user}); 
});

router.post("/campgrounds", middleware.isLoggedIn, function(req ,res){
   //get data from form and add to campgrounds array
   //redirect back to campgrounds page
   var campName = req.body.campName;
   var image = req.body.imageURL;
   var desc = req.body.desc;
   var price = req.body.price;
   
   var author = {
       id: req.user._id,
       username: req.user.username
   }
   
   Campground.create({name: campName, price: price, image: image, desc: desc, author: author}, function(error, campground){
       if(error){
           console.log(error);
       }
       else{
           console.log(campground);
       }
   });
   
    res.redirect("/campgrounds");
});



//SHOW - SHOWS MORE INFO ABOUT CAMPGROUND!
router.get("/campgrounds/:id", function(req, res){
    //find the campground with id from URL
    Campground.findById(req.params.id).populate("comments").exec(function(error, foundCampground){
       if(error || !foundCampground){
            req.flash("error", "Campground not found!");
            res.redirect("back");
       }else{
           console.log(foundCampground);
           res.render("campgrounds/show", {camp: foundCampground, currentUser: req.user});
       }
    });
});

// EDIT CAMPGROUND ROUTE
router.get("/campgrounds/:id/edit", middleware.checkCampgroundOwnership, function(req, res){
    
    
        Campground.findById(req.params.id, function(err, foundCampground){
           
            res.render("campgrounds/edit", {campground: foundCampground});
            
        });

    
});

router.put("/campgrounds/:id", middleware.checkCampgroundOwnership,function(req,res){
    //find and update the correct campground
    
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
        if(err){
            res.redirect("/campgrounds");
        }else{
            res.redirect("/campgrounds/" + req.params.id);
        }
    });

})

//Remove Campground

router.delete("/campgrounds/:id", middleware.checkCampgroundOwnership, function(req, res){
    Campground.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/campgrounds");
        }else{
            res.redirect("/campgrounds");
        }
    })
})





module.exports = router;