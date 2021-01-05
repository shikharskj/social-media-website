const express = require("express");
const port = 8000;
const app = express();

app.listen(port,function(error){
    if(error){
        console.log(`Error in running the server: ${error}`);
    }
    console.log(`Server is running on port : ${port}`);
});