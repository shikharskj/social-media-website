const mongoose = require('mongoose');
const multer = require("multer");
const path = require("path");
const POST_PATH = path.join("/uploads/users/posts");


const postSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    user: {
        type:  mongoose.Schema.Types.ObjectId,
        ref: 'User'

    },
    pposts: {
        type: String
    },
    // include the array of ids of all comments in this post schema itself
    comments: [
        {
            type:  mongoose.Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ]
},{
    timestamps: true
});

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname,"..",POST_PATH));
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now());
    }
  });

//static functions
postSchema.statics.uploadedPost = multer({storage: storage}).single("pposts");
postSchema.statics.postPath = POST_PATH; 

const Post = mongoose.model('Post', postSchema);
module.exports = Post;