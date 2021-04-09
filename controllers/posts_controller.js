const Post = require("../models/post");
const User = require("../models/user");
const Like = require("../models/like");

const Comment = require("../models/comment");
const path = require("path");
module.exports.create = async function (req, res) {
  try {
    console.log("outside - req.body : ", req.body);
    Post.uploadedPost(req, res, function (err) {
      if (err) {
        console.log("***** Multer Error: ", err);
      }
      let img_path = "";
      if (req.file) {
        console.log(">>> req.file - ", req.file);
        img_path = Post.postPath + "/" + req.file.filename;
      }
      console.log(">>> req.body - ", req.body);
      Post.create({
          content: req.body.content,
          user: req.user._id,
          pposts: img_path
        }, function(err, post) {
          console.log("Post Create Successfully : ", post);
        });
      

      if(req.xhr){
          post = post.populate('user', 'name').execPopulate();
          return res.status(200).json({
              data:{
                  post: post
              },
              message: "Post created!"
          })
      }

      req.flash("success","Post published!");
      return res.redirect("back");
    });
  } catch (err) {
    console.log("EEERRROOORRR", err);
    req.flash("error", err);
    return res.redirect("back");
  }
};

module.exports.destroy = async function (req, res) {
  try {
    let post = await Post.findById(req.params.id);

    if (post.user == req.user.id) {

      //delete the associated likes for the post and all its comment's likes too
      await Like.deleteMany({ likeable: post, onModel: "Post"});
      await Like.deleteMany({ _id: {$in: post.comments}});

      post.remove();

      await Comment.deleteMany({ post: req.params.id });

      if (req.xhr) {
        return res.status(200).json({
          data: {
            post_id: req.params.id,
            message: "Post deleted!",
          },
        });
      }

      req.flash("success", "Post and associated comments deleted!");
      return res.redirect("back");
    } else {
      req.flash("error", "You cannot delete this post");
      return res.redirect("back");
    }
  } catch (err) {
    req.flash("error", err);
    return res.redirect("back");
  }
};
