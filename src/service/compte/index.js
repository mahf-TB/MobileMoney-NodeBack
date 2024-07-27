const db = require("../../models");

const Client = db.Client;
const Compte = db.Compte;

const updateCompte = async (key, data) => {
  const { numero, solde, codeVerify, isActive, motdepasse } = data;
  try {
    const compte = await Compte.findByPk(key);

    if (!compte) {
      throw new Error("Compte non trouvé");
    }

    // Mettre à jour les champs nécessaires
    if (numero !== undefined) {
      compte.numero = numero;
    }
    if (solde !== undefined) {
      compte.solde = solde;
    }
    if (codeVerify !== undefined) {
      compte.codeVerify = codeVerify;
    }
    if (isActive !== undefined) {
      compte.isActive = isActive;
    }
    if (motdepasse !== undefined) {
      compte.motdepasse = await bcrypt.hash(motdepasse, 10);
    }
    await compte.save();
    return compte;

  } catch (error) {
    console.error("Error updating compte:", error);
    throw new Error("Erreur lors de la mise à jour du compte");

  }
};

const getOneCompte = async (key) => {
  try {
    const data = await Compte.findByPk(key, {
      include: [{ model: Client }],
    });
    if (data) {
      return data;
    } else {
      throw new Error("Client non trouvée ");
    }
  } catch (error) {
    throw new Error("Error creating Compte d'un client" + error);
  }
};

module.exports = {
  updateCompte,
  getOneCompte,
};
