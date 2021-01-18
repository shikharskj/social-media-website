// module.exports.action_name = function(req,res){    };
const Post = require("../models/post");
module.exports.home = function(req,res){
    // console.log(req.cookies);
    // res.cookie("user_id",25);

    //populate the user of each post
    Post.find({}).populate("user").exec(function(error,posts){
        return res.render("home",{
            title:"HOME!!",
            posts: posts
        });
    })
    

    
};