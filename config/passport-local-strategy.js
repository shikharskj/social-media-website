const passport = require("passport");

const LocalStrategy = require('passport-local').Strategy;

const User = require("../models/user");

//authentication using passport
passport.use(new LocalStrategy({
    usernameField: "email"
    },
    function(email,password,done){
        //find a user and establish the identity
        User.findOne({email:email},function(error,user){
            if(error){
                console.log("Error in finding user ---> passport");
                done(error);
            }
            if(!user || user.password != password){
                console.log("Invalid username/password");
                return done(null,false);
            }

            return done(null,user);
        });
     }
}));

//serializing the user to decide which key is to be kept in the cookie
passport.serializeUser(function(user,done){
    done(null,user.id);
});

//deserializing the user from the key in the cookies
passport.deserializeUser(function(id,done){
    User.findById({id, function(error,user){
        if(error){
            console.log("Error in finding user ---> passport");
            done(error);
        }

        return done(null,user);
    });
});

module.exports = passport;