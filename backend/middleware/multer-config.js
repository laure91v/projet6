const multer = require('multer');           //va aider àla gestion de fichiers envoyés via requete http vers notre API
                                            // expliquer comment gerer les fichiers, où les enregistrer et quel nom de fichier leurs donner
const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png'
};



const storage = multer.diskStorage({        //objet de configuration-on enregistre sur le disque-
    destination: (req, file, callback) =>{      //on dit où/quel dossier enregistrer les fichiers
        callback (null, 'images')                //2 arguments: null=pas d'erreur à ce niveau là-nom du dossier
    },
    filename: (req, file, callback) =>{          //expliquer "quel nom à utiliser" - pas le nom de fichier d'origine car 2x mm nom existe
        const name =  file.originalname.split('').join('_');             //nouveau nom pour le fichier avt l'extension - nom do'rigine + on split les espaces et crée un tableau+on met des _ à la place
        const extension = MIME_TYPES[file.mimeType];    //element de notre dictionnaire qui correspond au mimetype du fichier envoyé par le frontend                                                        //on doit appliquer une extension du fichier, mais pas d'accès à ce fichier avec "envoyer",on va donc generer les extensions avec les maintype(image.png, image.jpg...)
    callback(null, name + Date.now()+ '.' + extension);                     //on prend le name au dessus et on rajoute date à la mms

    }
});
module.exports = multer({storage}).single('image');                     //methode multer, à laquelle on passe notre objet storage. on appelle la methode single pour dire que c'est unique(pas un groupe)  et que se sont des fichiers images.

