const db = require("../../models");
const bcrypt = require("bcrypt");

const Client = db.Client;
const Compte = db.Compte; 

const addClient = async (data) => {
  const { noms, age, sexe, email } = data;
  const newClient = await Client.create({
    noms,
    age,
    sexe,
    email,
  });
  return newClient;
};

const addCompteClient = async (data) => {
  const { numero, motdepasse, id_client } = data;
  const hashedPassword = await bcrypt.hash(motdepasse, 10);
  const code = generateVerificationCode();

  const compteInfo = await Compte.create({
    numero,
    motdepasse: hashedPassword,
    id_client,
    codeVerify: code,
  });
  return compteInfo;
};

const generateVerificationCode = () => {
  return Math.floor(1000 + Math.random() * 9000).toString(); // Génère un code à 4 chiffres
};

module.exports = {
  addClient,
  addCompteClient,
};
