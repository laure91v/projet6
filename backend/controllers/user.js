const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');


exports.signup = (req, res, next) => {          //fonction signup qui va crypter le mot de passe, créer un new user avec ce MDP crypté + adresse mail du corps de la requete et enregistrer ce user dans la base de données
    bcrypt.hash(req.body.password, 10)              //fonction pour crypter un mot de passe
                                                 //on lui passe le mot de passe du corps de la requete passé par le fontend; 10 tour=combien de fois on va utiliser l'algorithme de hashage
        .then(hash => {                                //on recupere le hash de mot de passe, qu'on enrgistre dans un new user, dans la base de données
            const user = new User({                     //on crée le new userr avec le modele mongoose
                email: req.body.email,                   //on prend l'email fournit dans le corps de la requete
                password: hash                          // on enregistre le hash créé ici(.then), ne pas stocker du blanc
            });

            user.save()                                       //on utilise save pour l'enregistrer dans la base de données
                .then(() => res.status(201).json({ message: 'utilisateur créé' }))                   //renvoyer un 201 pour une création de ressources 

                .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));           //on capte l'erreur et on l'envoid ans un objet

};




//trouver le user dans la base de donnée qui correspond à l'adresse email entré
exports.login = (req, res, next) => {               //user existants peuvent se connecter
    User.findOne({ email: req.body.email })           //trouver 1 utilisateeur de la base de données-objet de comparaison: l'adresse mail envoyé dans le corps de la requete
        .then(user => {
            if (!user) {                                 //verifier SI on a trouvé un user
                return res.status(401).json({ error: 'utilisateur non trouvé' });
            }
            bcrypt.compare(req.body.password, user.password)  // on arrive ici donc on a trouvé un user- on utilise bcrypt pour comparer le MDP envoyé par celui qui veut se connecter avec le hash enregistré.
                .then(valid => {                            //on reçoit un boolean.
                    if (!valid) {                             //si on reçoit false, donc reçu mauvais MDP
                        return res.status(401).json({ error: 'mot de passe incorrect' }); //on a trouvé le user mais MDP = false
                }
                return res.status(200).json({               // c'est true

                    userId: user._id,                     //on renvoit l'identifiant de l'utilisateur dans la base, 
                    token: jwt.sign(                        //verifier   token renviyé pour authentifier la demande-on appelle la fonction SIGN QUI PREND DES ARGUMENTS
                        {userId: user._id},                 //les données à encoder dans ce token-on met l'utilisateur pour qu'un objet créé ne soit pas touchable par un autre ID
                        'RANDOM_TOKEN_SECRET',             //cle secrete pour l'encodage
                        {expiresIn: '24h'}                  //expiration du token
                        )                  
                });
        })
        .catch(error => res.status(500).json({ error }));
})                                      

    .catch (error => res.status(500).json({ error })); //concerne un probleme de connection car il va renvoyer qqchose mm vide
                               

};
