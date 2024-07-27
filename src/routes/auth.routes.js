const authController = require('../controller/AuthController')
const router = require('express').Router();
const verifyToken = require('../middleware/authMiddleware');


//Route pour obtenir les informations de l'utilisateur authentifié
router.get('/user', verifyToken, authController.user_Auth);

//Route pour enregistrer un utilisateur
router.post('/register', authController.registerCompte) 
router.post('/login', authController.login) 
router.post('/verify-account', verifyToken, authController.verifyCompte) 

module.exports = router
 