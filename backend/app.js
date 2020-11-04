//app gere toutes les requetes envoyées au serveur

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');     //donne accès au chemin des fichiers

const sauceRoutes = require('./routes/sauce');
const userRoutes = require('./routes/user');


const { verify } = require('crypto');

const app = express();

mongoose.connect('mongodb+srv://laure91v:soleil32@cluster0.okqqf.mongodb.net/laure-test?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));



// communiquer entre les ports. 
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

    


  app.use(bodyParser.json());     // body-parser permet d'extraire l'objet JSON de la demande. il est mis "middleware global"
 //app.use('images', express.static(path.join(_dirname, 'images')));  //repondre aux requetes envoyées à 'image', qu'il serve le dossier static, dossier dirname où l'on met images
 
  app.use('/api/sauces', sauceRoutes);
  app.use('/api/auth', userRoutes);
  

module.exports = app;