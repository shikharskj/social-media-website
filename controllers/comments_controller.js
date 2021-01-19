const Comment = require("../models/comment");
const Post = require("../models/post");

module.exports.create = function(req,res){
    Post.findById(req.body.post,function(error,post){
        if(error){
            console.log("Error in finding a post");
            return;
        }
        if(post){
            Comment.create({
                content:req.body.content,
                post:req.body.post,
                user:req.user._id
            },function(error,comment){
                if(error){
                    console.log("Error in creating a comment");
                    return;
                }
                post.comments.push(comment);
                post.save(); //after updating anything we need to call save after it
                return res.redirect("/");//return??
            });
        }
    });
}
