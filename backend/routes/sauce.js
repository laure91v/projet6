const express = require('express');
const router = express.Router();

/*const createdIdLike = require('../controllers/like');   **/

const sauceCtrl = require('../controllers/sauce');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

router.get('/', auth, sauceCtrl.getSauces);           //fichier image inclus = multer. voir si utile
router.post('/', auth, multer, sauceCtrl.createSauce);
router.get('/:id', auth, sauceCtrl.getSauceById);
router.put('/:id', auth, multer, sauceCtrl.modifySauce);
router.delete('/:id', auth, sauceCtrl.deleteSauce);

/*router.post('/:id', auth, likeCtrl.createIdLike) delete?*/   


module.exports = router;