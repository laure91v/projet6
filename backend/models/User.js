const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
'use strict';

const userSchema = mongoose.Schema({  //modele utilisé dans mongodb

  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);

