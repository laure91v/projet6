const express = require('express');
const router = express.Router();

const sauceCtrl = require('../controllers/sauce');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
'use strict';


//chaque  route demande que les users soient authentifiés avant de charger la sauce

router.get('/', auth, sauceCtrl.getSauces);           // route principale de chgt des sauces/renvoi toutes les sauces dans la BdD
router.post('/', auth, multer, sauceCtrl.createSauce);// route permettant la creation + multer pour la photo/analyse sauce et l'enregistre dans la BdD
router.get('/:id', auth, sauceCtrl.getSauceById);       //voir 1 sauce en particulier / renvoi la sauce avec l'id fourni
router.put('/:id', auth, multer, sauceCtrl.modifySauce);//modification si besoin/mise à jour
router.delete('/:id', auth, sauceCtrl.deleteSauce);     //suppression si besoin

router.post('/:sauceId/like', auth, sauceCtrl.likeSauce) // aimer ou non la sauce


module.exports = router; //exporter