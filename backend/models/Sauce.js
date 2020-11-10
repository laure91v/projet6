
const mongoose = require('mongoose');

const saucesSchema = mongoose.Schema({
    
    name: String,
    manufacturer: String,
    description: String,
    heat: Number,
    likes: {type: Number,default: 0},
    dislikes: {type: Number,default: 0},
    imageUrl: String,
    mainPepper: String,
    usersLiked: [String],
    usersDisliked: [String],
    userId: String
  });

  module.exports = mongoose.model('Sauce', saucesSchema);
  