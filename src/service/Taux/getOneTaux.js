const db = require("../../models");
const TauxEnvoyer = db.TauxEnvoyer;
const TauxRetrait = db.TauxRetrait;

const getOneTauxEnvoie = async () => {
  const newTaux = await TauxEnvoyer.findAll();
  return newTaux;
};

const ajouterTauxRetrait = async (data) => {
  const { montant_min, montant_max, fraisRetrait } = data;

  const newTaux = await TauxRetrait.create({
    montant_min,
    montant_max,
    fraisRetrait,
  });
  return newTaux;
};

module.exports = {
  getAllTauxEnvoie,
  ajouterTauxRetrait,
};
