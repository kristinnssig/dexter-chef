var mongoose = require('mongoose');

var Comments = mongoose.Schema({
    username : String,
    body     : String,
    posted_at: {type: Date, default: Date.now()},
    parent_id: String
});

var Ingredients = mongoose.Schema({
    title   : String,
    amount  : String,
    unit    : String
});
var Steps = mongoose.Schema({
    desc      : String,
    step_num  : Number
});
var Likes = mongoose.Schema({
    username : String, 
    like_date: {type:String, default: Date.now()}
})

var RecipeSchema = mongoose.Schema({
	name: { type: String, required: true },
    creator_username: { type: String, required: true },
    description: String,
    published: Boolean,
    permalink: String,
    comments: [Comments],
    ingredients: [Ingredients],
    steps: [Steps],
    likes: [Likes],
    images: [{src : String, placement: Number}],
    categories: [{ cat_id : String }],
    keywords : [{ title: String }],
    created_at: Date,
    updated_at: Date
});

RecipeSchema.pre('save', function(next) {
  // get the current date
  var currentDate = new Date();
  
  // change the updated_at field to current date
  //this.updated_at = currentDate;

  // if created_at doesn't exist, add to that field
  if (!this.created_at)
    this.created_at = currentDate;

  next();
});

var Recipe = module.exports = mongoose.model('Recipe', RecipeSchema);

module.exports.createRecipe = function(data, callback){
    data.save(callback);
}

/*module.exports.getRecipeByUsername = function(username, callback){
    var query = {username: username};
    User.findOne(query, callback);
}*/

module.exports.getRecipeById = function(id, callback){
    Recipe.findById(id, callback);
}