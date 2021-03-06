var mongoose = require('mongoose');


var commentSchema = mongoose.Schema({
    text: String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    }
});

var comments = mongoose.model("Comment", commentSchema);

module.exports = comments;