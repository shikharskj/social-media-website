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

//get the sign up data
module.exports.create = function(req,res){
    
}

module.exports.createSession = function(req,res){
    
}