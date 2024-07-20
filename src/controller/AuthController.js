const { addClient, addCompteClient } = require("../service/auth/register");
const { sendVerificationEmail } = require("../service/email/emailService");

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

        res.status(201).send({
          message: "create compte réussie.",
          compteInfo: compteCli,
          user: user,
        });
      }
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  registerCompte,
};
