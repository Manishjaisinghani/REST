var mongoose = require("mongoose"),
    Campground = require("./models/campground"),
    Comment = require("./models/comment");
    
    
var data =[
    {
        name: "rishikesh heights",
        image: "https://farm7.staticflickr.com/6139/6016438964_f6b8e1fee2.jpg",
        description: "I am not going to write anything"
    },
    {
        name: "Damne solitude",
        image: "https://farm2.staticflickr.com/1056/534082362_8e9ce97462.jpg",
        description: "I am not going to write anything"
    },
    {
        name: "Desert safari",
        image: "https://farm9.staticflickr.com/8314/7968774876_11eafbfbb7.jpg",
        description: "I am not going to write anything"
    }
    ]

function seedDB(){
    //remove all campgrounds
    Campground.remove({}, function(err){
    //     if(err){
    //         console.log(err);
    //     }else{
    //         console.log("removed campgrounds");     
    //             //add a few campgrounds
    //         data.forEach(function(seed){
    //         Campground.create(seed, function(err, campground){
    //         if(err){
    //             console.log(err);
    //         }else{
    //             console.log("Added campgrounds");
    //             Comment.create(
    //             {
    //                 text: "I want to visit this chutiya place",
    //                 author: "Manish"
    //             }, function(err, comment){
    //                 if(err){
    //                     console.log(err)    
    //                 }else{
    //                     campground.comments.push(comment);
    //                     campground.save();
    //                     console.log("Created new comment");
    //                 }
                    
    //             });
    //         }
    //   }) 
    // });
    //     }
       
    });   
    
    //add comments
}

module.exports = seedDB;