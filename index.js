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

const sassMiddleware = require("node-sass-middleware");
const flash = require("connect-flash");
const customMware = require("./config/middleware");


//we ll put it just before the server is starting bcoz we need those pre-compiled files before the server starts
app.use(sassMiddleware({
    //source is from where do we pick up the scss files to convert into css
    src: "./assets/scss",
    //destination is where do we need to put our css files
    dest:"./assets/css",
    //debug mode is whether we want to display some errors tht are there in the file during compilation when it is not able to convert tht file
    debug: true,
    //outputStyle is do we want everything to be in a single line or multiple lines
    outputStyle: "extended",
    // prefix is basically where should my server look out for css files
    prefix: "/css"

}));


//require cookie-parser and use it
const cookieParser = require("cookie-parser");
const { Cookie } = require("express-session");
app.use(cookieParser());
//to read thru the post requests
app.use(express.urlencoded());

//make the uploads path available to the browser
app.use("/uploads",express.static(__dirname + "/uploads"));

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

app.use(flash());
app.use(customMware.setFlash);

//use express router
app.use("/",require("./routes"));

app.listen(port,function(error){
    if(error){
        console.log(`Error in running the server: ${error}`);
    }
    console.log(`Server is running on port : ${port}`);
});
