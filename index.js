const express = require("express");
const port = 8000;
const app = express();

//require and set up express layout
const expressLayouts = require("express-ejs-layouts");
app.use(expressLayouts);

const db = require("./config/mongoose");
//used for session cookie and our authentication
const session = require("express-session");
const passport = require("passport");
const passportLocal = require("./config/passport-local-strategy");

//require connect-mongo to persistently store session cookies
const MongoStore = require("connect-mongo")(session);


//require cookie-parser and use it
const cookieParser = require("cookie-parser");
const { Cookie } = require("express-session");
app.use(cookieParser());
//to read thru the post requests
app.use(express.urlencoded());

app.use(express.static("./assets"));
//extract style and scripts from subpages into the layout
app.set("layout extractStyles",true);
app.set("layout extractScripts",true);

// set up the view engine
app.set("view engine","ejs");
app.set("views","./views");

app.use(session({
    name: "codeial",
    //TODO change the secret before deployment in production mode
    secret: "blahsomething",
    saveUninitialized: false,
    resave:false,
    cookie:{
        maxAge: (1000*60*100)
    },
    store: new MongoStore(
    {
        mongooseConnection:db,
        autoRemove: "disabled"
    },function(err){
        console.log(err, "connect mongodb setup ok");
      })
  
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

//use express router
app.use("/",require("./routes"));

app.listen(port,function(error){
    if(error){
        console.log(`Error in running the server: ${error}`);
    }
    console.log(`Server is running on port : ${port}`);
});
