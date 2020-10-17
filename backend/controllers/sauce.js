/*const Sauce = require('../models/sauce');

exports.createSauce = (req, res, next) => {     //nous exposons la logique de notre route POST en tant que fonction appelée createSauce()
  const userObject = json.parse(req.body.user); //format de la requete changé pour pouvoir envoyer un fichier AVEC la requete-req.body.user sera un objet CDC à analyser-dans ce cas, on uilise la methode json.parse pour extraire l'objet json du user ici-'
  delete userObject._id;
  const sauce = new Sauce({


    ...sauceObject,
    imageUrl: `${req.protocole}://${req.get('host')}/images/${req.file.filemane}`   //on genere l'url de l'image


  });
  sauce.save()
    .then(() => res.status(201).json({ message: 'Post saved successfully!' }))
    .catch((error) => res.status(400).json({ error }));
};

exports.getOneSauce = (req, res, next) => {
  Sauce.findOne({
    _id: req.params.id
  }).then(
    (sauce) => {
      res.status(200).json(sauce);
    }
  ).catch(
    (error) => {
      res.status(404).json({
        error: error
      });
    }
  );
};

exports.modifySauce = (req, res, next) => {
  const sauceObject = req.file ?                 // test pour savoir dans quel cas on se trouve. y a t'il une nouvelle image ou pas, dans ce cas c'est juste un objet.?
    {
      ...json.parse(req.body.sauce),
      imageUrl: `${req.protocole}://${req.get('host')}/images/${req.file.filemane}`
    } : { ...req.body };                    //s'il n'existe pas, on fait une copie de req.body

  Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })

    .then(() => { res.status(200).json({ message: 'Sauce updated successfully!' });
    
    .catch((error) => {res.status(400).json({error: error});
    };

exports.deleteSauce = (req, res, next) => {
  Sauce.deleteOne({ _id: req.params.id }).then(
    () => {
      res.status(200).json({
        message: 'Deleted!'
      });
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};

exports.getAllSauce = (req, res, next) => {
  sauce.find().then(
    (things) => {
      res.status(200).json(things);
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};

  */