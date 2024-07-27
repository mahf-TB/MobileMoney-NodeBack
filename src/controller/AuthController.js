const { addClient, addCompteClient } = require("../service/auth/register");
const { loginUser } = require("../service/auth/login");
const { updateCompte } = require("../service/compte");
const { sendVerificationEmail } = require("../service/email/emailService");
const { generateToken } = require("../utils/token");



const user_Auth = (req, res) => {
  res.status(200).send(req.auth_user);
};

const login = async (req, res) => {
  try {
    const users = await loginUser(req.body);
    if (users.status === 400) {
      return res.status(users.status).send(users.message);
    }
   
    const user_conn = {
      id: users.id,
      noms: users.Client.noms,
      numero: users.numero,
      email: users.Client.email,
      isActive: users.isActive,
    };
    

    const token = generateToken(user_conn);
    if (token) {
      res.status(201).send({
        message: "Connexion réussie...",
        compte: user_conn,
        token: token,
      });
    }

  } catch (error) {
    res.status(400).send({
      message: error.message || "Erreur connexion login a echoué",
    });
  }
};

const registerCompte = async (req, res) => {
  try {
    const user = await addClient(req.body);
    if (user) {
      var cmpt = {
        numero: req.body.numero,
        motdepasse: req.body.motdepasse,
        id_client: user.id,
      };
      const compteCli = await addCompteClient(cmpt);
      if (compteCli) {
        // Envoyer l'email de vérification
        await sendVerificationEmail(user.email, compteCli.codeVerify);
        const user_conn = {
          id: compteCli.id,
          noms: user.noms,
          numero: compteCli.numero,
          email: user.email,
          isActive: compteCli.isActive,
        };

        const token = generateToken(user_conn);

        if (token) {
          res.status(201).send({
            message: "create compte réussie.",
            compte: user_conn,
            token: token,
          });
        }
      }
    }
  } catch (error) {
    res.status(400).send({
      message: error.message || "Erreur lors de la création du compte.",
    });
  }
};

const verifyCompte = async (req, res) => {
  try {
    if (req.auth_user.codeVerify == req.body.code) {
      const cmpt = await updateCompte(req.auth_user.id, { isActive: true });
      res.status(201).send({
        message: "Account client est verifié.",
        compteInfo: cmpt,
      });
    } else {
      res.status(400).send({
        message: "Code incorrect",
      });
    }
  } catch (error) {
    res.status(400).send({
      message: "Erreu..., bad request error",
    });
  }
};

module.exports = {
  user_Auth,
  login,
  registerCompte,
  verifyCompte,
};
