const { ajouterTauxEnvoie, ajouterTauxRetrait } = require("../service/Taux");

const addNewTaux = async (req, res) => {
  const dataEnv = {
    montant_min: req.body.minimum,
    montant_max: req.body.maximum,
    fraisEnvoie: req.body.frais,
  };

  //calcul frais de retrait est en 80% de frais de envoie
  const fraisRet = parseFloat(req.body.frais) * 0.8;
  const dataRet = {
    montant_min: req.body.minimum,
    montant_max: req.body.maximum,
    fraisRetrait: fraisRet,
  };
  try {
    const data_Envoie = await ajouterTauxEnvoie(dataEnv);
    const data_Ret = await ajouterTauxRetrait(dataRet);

    return res.status(201).send({
      message: "nouveaux taux transaction a été ajouté.",
      data_Envoie: data_Envoie,
      data_Ret: data_Ret,
    });
  } catch (error) {
    res.status(401).send({
      message: "Echec danas le catch.",
    });
  }
};

module.exports = {
  addNewTaux,
};
