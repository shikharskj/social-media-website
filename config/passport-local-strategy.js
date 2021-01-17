const passport = require("passport");

const LocalStrategy = require('passport-local').Strategy;

const User = require("../models/user");


//authentication using passport
passport.use(new LocalStrategy({
    usernameField: "email"
    },
    function(email, password, done){
        //find a user and establish the identity
        User.findOne({email:email},function(error,user){
            if(error){
                console.log("Error in finding user ---> passport");
                return done(error);
            }
            if(!user || user.password != password){
                console.log("Invalid username/password");
                return done(null,false);
            }

            return done(null,user);
        });
    }
));

//serializing the user to decide which key is to be kept in the cookie
passport.serializeUser(function(user, done){
    done(null,user.id);
});

//deserializing the user from the key in the cookies
passport.deserializeUser(function(id, done){
    User.findById(id, function(error,user){
        if(error){
            console.log("Error in finding user ---> passport");
            return done(error);
        }

        return done(null,user);
    });
});

//check f the user is authenticated
passport.checkAuthentication = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    //if the user is not signed-in,then pass on the req. to the next function(controller's action)
    return res.redirect("/users/sign-in");
};

passport.setAuthenticatedUser = function(req, res, next){
    if(req.isAuthenticated()){
        //req.user contains the current signed-in user from the session cookie and we are just sending this to the locals for the views
        res.locals.user = req.user;
    }
    next();
};

module.exports = passport;