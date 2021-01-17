const { user } = require("../config/mongoose");

module.exports.profile = function(req,res){
    return res.render("users_profile",{
        title:"PROFILE Page"
    });
};


module.exports.edit = function(req,res){
    res.end("<h1>EDIT Profile</h1>");
}

//render the sign up page
module.exports.signUp = function(req,res){
    return res.render("user_sign_up",{
        title:"CODEIAL || Sign Up"
    });
}

//render the sign in page
module.exports.signIn = function(req,res){
    return res.render("user_sign_in",{
        title:"CODEIAL || Sign In"
    });
}

const User = require("../models/user");

//get the sign up data
module.exports.create = function(req,res){
    if(req.body.password != req.body.confirm_password){
        return res.redirect("back");
    }
        User.findOne({email:req.body.email},function(error,user){
            if(error){
                console.log("Error in finding user while signing-up");
                return;
            }
            if(!user){
                User.create(req.body, function(error,user){
                    if(error){
                        console.log("Error in creating user while signing-up");
                        return;
                    }
                    return res.redirect("/users/sign-in");
                });
            }else{
                return res.redirect("back");
            }
        });
    
}

module.exports.createSession = function(req,res){
    return res.redirect("/");
}