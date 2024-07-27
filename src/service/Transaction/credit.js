const db = require("../../models");
const { debitCompte } = require("./debit");

const Compte = db.Compte;

const creditCompte = async (numeroCredite ,numeroDebite, montant) => {
  try {
    const compte = await Compte.findOne({
      where: { numero: numeroCredite }
    });

    if (!compte) {
      throw new Error("Compte non trouvé");
    }

    if (montant !== undefined) {
      if (!compte.isActive) {
        return {
          status: 400,
          message: "le compte " + compte.numero + " est bloquer",
        };
      }

      //debit les compte de envoyeur et creite le recepteur
      const debit = await debitCompte(numeroDebite, montant);
      if (debit.status === 400) { 
        return { status: 400, message: debit.message };
      }
      
      compte.solde = compte.solde + montant;
    }
    await compte.save();
    return compte;

  } catch (error) {
    return { status: 400, message: "Erreur de credit dans compte" };
  }
};

module.exports = {
  creditCompte,
};
