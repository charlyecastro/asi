const mongoose = require('mongoose');

const recipeSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {type: String, required : true},
    description: {type: String, required : true},
    author: {type: String, required : true},
    private: { type: Boolean, default: false },
    members: [],
    ingredients: [],
    directions:[],
    foodImg: {type: String, required : true},
    categoryList: [String],
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Recipe', recipeSchema);