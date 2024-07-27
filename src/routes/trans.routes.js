const router = require('express').Router();
const authController = require('../controller/TransController')
const verifyToken = require('../middleware/authMiddleware');


//Route pour enregistrer un utilisateur
router.post('/envoyer', verifyToken, authController.addNewTransaction) 

module.exports = router