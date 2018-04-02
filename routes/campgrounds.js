var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var Comment = require("../models/comment");
var middleware = require("../middleware")


//INDEX - show all campgrounds
router.get("/", function(req, res){
    //Get all campgrounds from DB
    Campground.find({}, function(err, allCampground){
        if(err){
            console.log("error... " + err)
        }
        else{
            console.log(allCampground);
            res.render("campgrounds/index", {campgrounds: allCampground, page: 'campgrounds'});
        }
    })
    // res.render("campgrounds", {campgrounds: campgrounds});
});


//CREATE - add new campground to DB
router.post("/",middleware.isLoggedIn, function(req, res){
    //get data from forms
    var name = req.body.name;
    var price = req.body.price;
    var image = req.body.image;
    var desc = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    var newCampground = {name: name,price: price, image:image, description: desc, author: author};
    //careate a new campground and save to DB
    Campground.create(newCampground, function(err, newlyCreated){
        if(err){
            console.log("error");
            console.log(err);
        }else{
            //redirect to campgrounds page
            // console.log("Newly created campground" + newlyCreated);
            res.redirect("/campgrounds");            
        }
    })


});

//NEW - show form to create new campground

router.get("/new",middleware.isLoggedIn, function(req, res) {
    //find the campground with provided ID
    //render the information about campground
    res.render("campgrounds/new");
});


//SHOW - show more infor about a particular campground
router.get("/:id", function(req, res) {
    //find the campground with ID in URL
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err){
            console.log(err);
        }else{
            console.log(foundCampground);
            //render show tempelate with that campground
            res.render("campgrounds/show", {campground: foundCampground})            ;
        }
    });

})

//Edit campground route
router.get("/:id/edit",middleware.checkCampgroundOwnership, function(req, res) {
    //is user logged in 
         Campground.findById(req.params.id, function(err, foundCampground){
         //if user logged in, does user own campground
        res.render("campgrounds/edit",{campground: foundCampground});         
        });
});
//Update campground route

router.put("/:id",middleware.checkCampgroundOwnership, function(req, res){
   //find and update the correct campground 
   Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
      if(err){
          res.redirect("/campgrounds");
      } else{
          res.redirect("/campgrounds/" + req.params.id);
      }
   });
   //and redirect
   
});


//Destroy campground route

router.delete("/:id",middleware.checkCampgroundOwnership, function(req, res){
   Campground.findByIdAndRemove(req.params.id, function(err){
      if(err){
          res.redirect("/campgrounds");
      } else{
          res.redirect("/campgrounds");
      }
   });
});




module.exports = router;
