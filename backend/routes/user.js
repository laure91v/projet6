const express = require('express');

const router = express.Router();
const bouncer = require('express-bouncer')(8000, 60000, 3); //against brute force attemps
const userCtrl = require('../controllers/user');

'use strict';
                                            //c'est là où:
router.post('/signup', userCtrl.signup);  //on va chiffrer mot de passe et rajouter l'user à la BDD

router.post('/login', bouncer.block, userCtrl.login);//verification de l'identification du user, en renvoyant l'identifiant useriddepuis la BdD 
                                                        //et un token web jason signé.


module.exports = router;