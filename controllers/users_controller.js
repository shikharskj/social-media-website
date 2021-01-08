module.exports.profile = function(req,res){
    return res.end("<h1>User's Profile</h1>");
};

module.exports.create = function(req,res){
    return res.end("<h1>CREATE Profile</h1>");
};

module.exports.edit = function(req,res){
    res.end("<h1>EDIT Profile</h1>");
}