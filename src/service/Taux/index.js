const db = require("../../models");
const TauxEnvoyer = db.TauxEnvoyer;
const TauxRetrait = db.TauxRetrait;

const ajouterTauxEnvoie = async (data) => {
  const { montant_min, montant_max, fraisEnvoie } = data;

  const newTaux = await TauxEnvoyer.create({
    montant_min,
    montant_max,
    fraisEnvoie,
  });
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

const getFraisEnvoie = async (montant) => {
  const allTaux = await TauxEnvoyer.findAll(); 
  var frais = 0
  allTaux.forEach(element => {
    if (element.montant_min <= montant && element.montant_max > montant) {
      frais = element.fraisEnvoie;
    }
  }); 
  return frais;
}

const getFraisRetrait = async (montant) => {
  const allTaux = await TauxRetrait.findAll(); 
  var frais = 0
  allTaux.forEach(element => {
    if (element.montant_min <= montant && element.montant_max > montant) {
      frais = element.fraisRetrait;
    }
  }); 
  return frais;
}

module.exports = {
  ajouterTauxEnvoie,
  ajouterTauxRetrait,
  getFraisEnvoie,
  getFraisRetrait
};
