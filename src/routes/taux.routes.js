const router = require('express').Router();
const verifyToken = require('../middleware/authMiddleware');
const taux = require('../controller/TauxController')


//Route pour enregistrer un utilisateur
router.post('/envoie-retrait', verifyToken, taux.addNewTaux) 

module.exports = router