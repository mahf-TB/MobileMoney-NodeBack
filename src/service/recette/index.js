const db = require("../../models");
const Recette = db.Recette;


const addNewRecette = async (data) => {
  const { id_trans, montant } = data;
  const newTaux = await Recette.create({
    id_trans,
    montant,
  });
  return newTaux;
};

module.exports = {
    addNewRecette,
};