const db = require("../../models");
const { getFraisEnvoie } = require("../Taux");

const Compte = db.Compte;


const debitCompte = async (numero, montant) => {
  try {
    const compte = await Compte.findOne({
      where: { numero: numero },
    });
    if (!compte) {
      return { status: 400, message: "Compte non trouvé " };
    }
    if (montant !== undefined) {
      var frais = await getFraisEnvoie(montant);
      var soldeRetire = montant + frais;
      if (compte.solde < soldeRetire) {
        return { status: 400, message: "votre solde est insuffisantes. Solde: " + compte.solde  };
      }
      
      compte.solde = compte.solde - soldeRetire;
    }
    await compte.save();
    return compte;
  } catch (error) {
    return { status: 400, message: "Erreur de debit dans compte" };
  }
};


module.exports = {
    debitCompte,
  };
