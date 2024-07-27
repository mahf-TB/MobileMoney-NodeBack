module.exports = (sequelize, DataTypes) => {
  const TauxEnvoyer = sequelize.define("TauxEnvoyer", {
    montant_min: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    montant_max: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    fraisEnvoie: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
  });

  return TauxEnvoyer;
};
