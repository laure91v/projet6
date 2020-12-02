//app gere toutes les requetes envoyées au serveur
//plugin externes
require('dotenv').config();
'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const mongoSanitize = require ( 'express-mongo-sanitize' ) ;
const mongoose = require('mongoose');
const path = require('path');                             //donne accès au chemin des fichiers
const helmet = require('helmet');
const cors = require('cors');

//declaration des routes
const sauceRoutes = require('./routes/sauce');
const userRoutes = require('./routes/user');

//mise en place de la fonction express
const app = express();

//adresse de connexion mongodb
mongoose.connect(`mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PWD}@cluster0.okqqf.mongodb.net/${process.env.MONGODB_DATABASE}?retryWrites=true&w=majority`,

{ useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

app.use(helmet());
app.use(cors());

// communiquer entre les ports. acces des utilisateurs
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

    
  app.use('/images', express.static(path.join(__dirname, 'images')));    //repondre aux requetes envoyées à 'image', qu'il serve le dossier static, dossier dirname où l'on met images
 
//--//
  app.use ( mongoSanitize ( {
    replaceWith : ' _ ' 
  } ) )
//--//

  app.use(bodyParser.json());         // parsé automatique le corps requete, permettra d'extraire l'objet JSON de la demande. il est mis "middleware global"
   
 // declaration des fichiers routes 
  app.use('/api/sauces', sauceRoutes);
  app.use('/api/auth', userRoutes);
  

module.exports = app;