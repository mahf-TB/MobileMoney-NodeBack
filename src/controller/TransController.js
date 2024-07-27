const { ajouterTransaction } = require("../service/Transaction");
const { getFraisEnvoie } = require("../service/Taux");
const { addNewRecette } = require("../service/recette");

const addNewTransaction = async (req, res) => {
  if (req.body.montant < 300) {
    return res.status(400).send({
      message: "le montant minimale est 300",
    });
  }
  const data = {
    numEnvoyeur: req.auth_user.numero,
    numRecepteur: req.body.numero,
    montant: req.body.montant,
    raison: req.body.raison,
  };

  try {
    // ajouter le transaction 
    const data_Trans = await ajouterTransaction(data);
    if (data_Trans.status === 400) {
      return res.status(400).send({
        message: data_Trans.message,
      });
    }

    //ajouter dans le recette le frais
    var frais = await getFraisEnvoie(req.body.montant);
    const recette = { id_trans: data_Trans.id, montant: frais };
    await addNewRecette(recette);

    //envoyer le return finale 
    return res.status(201).send({
      message: "votre transaction a été réussie.",
      data_Trans: data_Trans,
    });

  } catch (error) {
    res.status(401).send({
      message: "Echec danas le catch.",
    });
  }
};

module.exports = {
  addNewTransaction,
};
