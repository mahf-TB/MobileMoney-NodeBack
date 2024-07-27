const { creditCompte } = require("./credit");
const db = require("../../models");
const Transaction = db.Transaction;

const ajouterTransaction = async (data) => {
  const { numEnvoyeur, numRecepteur, montant, raison } = data;
  const credit = await creditCompte(numRecepteur, numEnvoyeur , montant);
  if (credit.status === 400) {
    return { status: 400, message: credit.message };
  }

  const newTrans = await Transaction.create({
    numEnvoyeur,
    numRecepteur,
    montant,
    raison,
  });
  return newTrans;
};


module.exports = {
  ajouterTransaction,
};
