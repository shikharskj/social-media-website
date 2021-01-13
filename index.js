const express = require("express");
const port = 8000;
const app = express();
//require and set up express layout
const expressLayouts = require("express-ejs-layouts");
app.use(expressLayouts);

const db = require("./config/mongoose");

app.use(express.static("./assets"));
//extract style and scripts from subpages into the layout
app.set("layout extractStyles",true);
app.set("layout extractScripts",true);

// set up the view engine
app.set("view engine","ejs");
app.set("views","./views");

//use express router
app.use("/",require("./routes"));

app.listen(port,function(error){
    if(error){
        console.log(`Error in running the server: ${error}`);
    }
    console.log(`Server is running on port : ${port}`);
});
