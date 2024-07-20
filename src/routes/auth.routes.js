const authController = require('../controller/AuthController')
const router = require('express').Router();


//Route pour enregistrer un utilisateur
router.post('/register', authController.registerCompte) 


module.exports = router