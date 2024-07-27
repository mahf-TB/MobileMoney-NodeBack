const db = require("../../models");
const bcrypt = require("bcrypt");


const Client = db.Client;
const Compte = db.Compte;



const loginUser = async (data) => {
  const { numero, motdepasse } = data;

  // Vérifier si l'utilisateur existe
  const user_auth = await Compte.findOne({
    include: [{ model: Client }],
    where: { numero: numero }, 
  });
  if (!user_auth) {
    return { status: 400, message: "Utilisateur non trouvé." };
  }

  // Comparer le mot de passe
  const isMatch = await bcrypt.compare(motdepasse , user_auth.motdepasse);
  if (!isMatch) {
      console.log("mot de passe incorrect")
    return { status: 400, message: "Mot de passe incorrect" };
  }

  return user_auth ;
};

module.exports = {
  loginUser,
};
