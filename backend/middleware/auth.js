const jwt = require ('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split('') [1];               //recuperer le token dans le header autorisationconst- on recupere le 2eme element du tableau [1] le 1er etant bear:
        const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');      //decoder le token - quand ond ecode le token, cela devient un objet JS   
        const userId = decoderToken.userId;                                 //recup le userid qui estd edans
        if(req.body.userId && req.body.userId !==userId){                   //s'il y a un userId on verifie que cela correspond- s'il y a un userId et qu'il est different de userID alors
            throw 'user ID non valable';                                    //renvoye le message
        }   else {
            next();                                                         // middleware appliqué avt les controleurs routes donc on passe d'abord par ce middleware et si tout est ok, on passe au prochain middleware
        }                 
    
    
    
    
    
    }catch (error) {
     return res.status(401).json({ error: error | 'requete non authentifiée'})  //sois renvoyé401 pour un probleme d'authentification . dans le json, si on reçoit uen erreur on veut l'envoyer sinon message (permet de personnaliser, si erreur sur autre ligne, cela enverra le message ecrit.)
        }

};



