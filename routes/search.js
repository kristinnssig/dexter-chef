var  express = require('express'),
     router  = express.Router(),
        User = require('../models/user.js'),
      Recipe = require('../models/recipe.js');

router.get('/', function(req, res){
    var regex = req.query.q;
    if(regex.toString().indexOf("@") == 0){
        regex = regex.substring(1);
        regex = new RegExp(regex, 'i');
        var query = User.find({ username: regex }, function(err, resp){
            if (err) return handleError(err);
            res.render("search", {
                searchQuery : req.query.q,
                userSearch: true,
                results : resp,
                title: 'Search: "'+req.query.q+'" - DexterChef'
            });
        });
    } else {
        regex = new RegExp(regex, 'i');
        var query = Recipe.find({ name: regex }, function(err, resp){
            if (err) return handleError(err);
            for(var i=0; i<resp.length; i++){
                resp[i].like = resp[i].likes.length;
            }
            res.render("search", {
                searchQuery : req.query.q,
                userSearch: false,
                results : resp,
                title: 'Search: "'+req.query.q+'" - DexterChef'
            });
        });
    }
});

module.exports = router;