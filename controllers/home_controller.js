// module.exports.action_name = function(req,res){    };

module.exports.home = function(req,res){
    return res.render("home",{
        title:"HOME!!"
    });
};