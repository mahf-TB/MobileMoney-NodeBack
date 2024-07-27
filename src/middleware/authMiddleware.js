const jwt = require('jsonwebtoken');
const db = require('../models');
const Compte = db.Compte
const Client = db.Client

const verifyToken = async (req, res, next) => {
  let token = req.headers['x-access-token'] || req.headers['authorization'];

  if (!token) {
    return res.status(403).send({ message: 'Token non fourni.' });
  }
  if (token.startsWith('Bearer ')) {
    token = token.slice(7, token.length);
  }
  
  jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: 'Non autorisé.' });
    }
    try {
      const user = await Compte.findByPk(decoded.id , {include: [{ model: Client }], attributes: { exclude: ['motdepasse'] } });
      if (!user) {
        return res.status(404).send({ message: 'Utilisateur non trouvé.' });
      }

      req.auth_user = user;
      next();

    } catch (error) {
      return res.status(500).send({ message: 'Erreur du serveur.' });
    }
  });
};

module.exports = verifyToken;