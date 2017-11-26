var mongoose = require('mongoose');
var Campground = require('./models/campgrounds');
var Comment = require('./models/comments');
var data = [
    {name: "Rust", image: "http://bit.ly/2hkwzHY", desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec porttitor non dolor sed bibendum. Morbi tempus rhoncus risus sit amet porta. Nullam convallis libero nec nisi finibus iaculis eget vel purus. Donec dignissim tortor tellus, sed sodales sapien imperdiet vel. Aenean dolor nisi, condimentum quis auctor non, mattis a erat. Curabitur malesuada dapibus leo, nec dictum libero venenatis quis. Fusce turpis ipsum, fermentum sed egestas nec, rutrum et sapien. Vestibulum in facilisis augue, id laoreet est. Fusce justo elit, congue quis diam at, posuere ultrices ante. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Interdum et malesuada fames ac ante ipsum primis in faucibus. Quisque non massa urna. Fusce vitae sem eleifend augue rutrum viverra. Vestibulum pretium id massa eu tincidunt. Nam porta turpis ac turpis rutrum bibendum. Phasellus eget risus dui."},
    {name: "Rust", image: "http://bit.ly/2hkwzHY", desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec porttitor non dolor sed bibendum. Morbi tempus rhoncus risus sit amet porta. Nullam convallis libero nec nisi finibus iaculis eget vel purus. Donec dignissim tortor tellus, sed sodales sapien imperdiet vel. Aenean dolor nisi, condimentum quis auctor non, mattis a erat. Curabitur malesuada dapibus leo, nec dictum libero venenatis quis. Fusce turpis ipsum, fermentum sed egestas nec, rutrum et sapien. Vestibulum in facilisis augue, id laoreet est. Fusce justo elit, congue quis diam at, posuere ultrices ante. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Interdum et malesuada fames ac ante ipsum primis in faucibus. Quisque non massa urna. Fusce vitae sem eleifend augue rutrum viverra. Vestibulum pretium id massa eu tincidunt. Nam porta turpis ac turpis rutrum bibendum. Phasellus eget risus dui."},
    {name: "Rust", image: "http://bit.ly/2hkwzHY", desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec porttitor non dolor sed bibendum. Morbi tempus rhoncus risus sit amet porta. Nullam convallis libero nec nisi finibus iaculis eget vel purus. Donec dignissim tortor tellus, sed sodales sapien imperdiet vel. Aenean dolor nisi, condimentum quis auctor non, mattis a erat. Curabitur malesuada dapibus leo, nec dictum libero venenatis quis. Fusce turpis ipsum, fermentum sed egestas nec, rutrum et sapien. Vestibulum in facilisis augue, id laoreet est. Fusce justo elit, congue quis diam at, posuere ultrices ante. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Interdum et malesuada fames ac ante ipsum primis in faucibus. Quisque non massa urna. Fusce vitae sem eleifend augue rutrum viverra. Vestibulum pretium id massa eu tincidunt. Nam porta turpis ac turpis rutrum bibendum. Phasellus eget risus dui."},
    {name: "Rust", image: "http://bit.ly/2hkwzHY", desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec porttitor non dolor sed bibendum. Morbi tempus rhoncus risus sit amet porta. Nullam convallis libero nec nisi finibus iaculis eget vel purus. Donec dignissim tortor tellus, sed sodales sapien imperdiet vel. Aenean dolor nisi, condimentum quis auctor non, mattis a erat. Curabitur malesuada dapibus leo, nec dictum libero venenatis quis. Fusce turpis ipsum, fermentum sed egestas nec, rutrum et sapien. Vestibulum in facilisis augue, id laoreet est. Fusce justo elit, congue quis diam at, posuere ultrices ante. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Interdum et malesuada fames ac ante ipsum primis in faucibus. Quisque non massa urna. Fusce vitae sem eleifend augue rutrum viverra. Vestibulum pretium id massa eu tincidunt. Nam porta turpis ac turpis rutrum bibendum. Phasellus eget risus dui."}
    ];


function seedDB(){
    //Remove Campgrounds
    Comment.remove({}, function(err){
        if(err){
        console.log(err);
            
        }else{
            console.log("Comments removed!");
        }
    })
    
    Campground.remove({}, function(err){
    if(err){
        console.log(err);
            }
    else{
    console.log("Removed Campgrounds");
    
    
    data.forEach(function(seed){
        
        Campground.create(seed, function(err, camp){
            
            if(err){
                console.log(err);
            }else{
                console.log("You've added a Campground!");
                //Add a Comment
                Comment.create({
                    text: "Great but wish I had internet",
                    author: "Homer"
                }, function(err, data){
                    
                    if(err){
                        console.log(err);
                    }else{
                        camp.comments.push(data);
                        camp.save();
                        console.log("New comment created!");
                    }
                });
            }
        });
    });
    }
    
});

}





module.exports = seedDB;