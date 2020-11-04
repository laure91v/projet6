
const mongoose = require('mongoose');

const saucesSchema = mongoose.Schema({
    
    name: String,
    manufacturer: String,
    description: String,
    heat: Number,
    likes: Number,
    dislikes: Number,
    imageUrl: String,
    mainPepper: String,
    usersLiked: [String],
    usersDisliked: [String],
    userId: String
  });

  module.exports = mongoose.model('Sauce', saucesSchema);
  