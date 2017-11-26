//SCHEMA SETUP
var mongoose = require('mongoose');
var Comments = require('./comments');
var campSchema = new mongoose.Schema({
    name: String,
    price: String,
    image: String,
    desc: String,
    author:{
        id:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    },
    comments: [
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment"
    }
    ]
});

var Campground = mongoose.model("Campground", campSchema);

module.exports = Campground;