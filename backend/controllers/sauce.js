
const Sauce = require('../models/Sauce');
'use strict';


//creation d'une sauce
exports.createSauce = (req, res, next) => {     //nous exposons la logique de notre route POST en tant que fonction appelée createSauce()
  const sauceObject = JSON.parse(req.body.sauce); // on uilise la methode json.parse pour extraire l'objet json du sauce ici-'

  const sauce = new Sauce({


    ...sauceObject,
    imageUrl: `http://${req.get('host')}/images/${req.file.filename}`   //on genere l'url de l'image


  });


  sauce.save((err, sauce) => {
    if (err) {

      return res.status(400).json({ err });
    }

    return res.status(201).json({ message: 'Post saved successfully!' });

  })


};


//modification d'une sauce
exports.modifySauce = (req, res, next) => {
  const sauceObject = req.file ?                 // test pour savoir dans quel cas on se trouve. y a t'il une nouvelle image ou pas, dans ce cas c'est juste un objet.?
    {
      ...json.parse(req.body.sauce),
      imageUrl: `${req.protocole}://${req.get('host')}/images/${req.file.filemane}`
    } : { ...req.body };                    //s'il n'existe pas, on fait une copie de req.body

  Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })

    .then(() => {
      res.status(200).json({ message: 'Sauce updated successfully!' })
    })
    .catch((error) => {
      res.status(400).json({ error: error });
    });
};

//supression d'une sauce
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

//editer toutes les sacues
exports.getSauces = (req, res, next) => {


  Sauce.find()

    .then((sauces) => {

      return res.status(200).json(sauces);
    }
    ).catch((error) => {

      return res.status(400).json({ error: error });
    }
    );
};

//recherche d'une sauce par son id
exports.getSauceById = (req, res, next) => {
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

/*--------------------------------------------------------------------------------------*/

//si j'aime =1, incrementation de1 la qtté de like et enregistrement de son userid.
//si je n'aime pas=-1, j'incremente le pouce rouge et j'enregistre le userid
//si j'annule, j'envoi 0 et je decrmente la qtté du pouce concerné tout en enlevant le user id


exports.likeSauce = (req, res, next) => {

  if (req.body.like == 1) {

    Sauce.updateOne({ _id: req.params.sauceId },
      {
        $push: { usersLiked: req.body.userId },
        $inc: { likes: 1 }
      })

      .then(() => {
        res.status(200).json({ message: 'like ajouté!' })
      })
      .catch((error) => {
        res.status(400).json({ error: error });
      });
  }

  else if (req.body.like == -1) {

    Sauce.updateOne({ _id: req.params.sauceId },
      {
        $push: { usersDisliked: req.body.userId },
        $inc: { dislikes: 1 }
      })

      .then(() => {
        res.status(200).json({ message: 'dislike ajouté!' })
      })
      .catch((error) => {
        res.status(400).json({ error: error });
      });
  }

  else {

    Sauce.findById(req.params.sauceId, function (err, sauce) { //recherche de la sauce 

      if (err) {
        return res.status(400).json({ error: err });
      }
      if (sauce.usersDisliked.includes(req.body.userId)) {  //verifier que le user est biend ans la BdD
        Sauce.update({ _id: req.params.sauceId },
          {
            $pull: { usersDisliked: req.body.userId },
            $inc: { dislikes: -1 },

          },
          function (error) {
            if (error) {
              return res.status(400).json({ error: error });
            }
            return res.status(200).json({ message: 'dislike enlevé!' });
          });



      }
      else {


        Sauce.update({ _id: req.params.sauceId },
          {
            $pull: { usersLiked: req.body.userId },
            $inc: { likes: -1 }

          },
          function (error) {
            if (error) {
              return res.status(400).json({ error: error });
            }
            return res.status(200).json({ message: 'like enlevé!' });
          });




      }
    })
  }
}








