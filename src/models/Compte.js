module.exports = (sequelize, DataTypes) => {
  const Compte = sequelize.define("Compte", {
    numero: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    solde: {
      type: DataTypes.FLOAT,
      allowNull: true,
      defaultValue: 0,
    },
    motdepasse: {
      type: DataTypes.STRING,
    },
    codeVerify: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    //   foreign keys #####################################
    id_client: {
      type: DataTypes.INTEGER,
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

  Compte.associate = (models) => {
    Compte.belongsTo(models.Client, { foreignKey: "id_client" });
  };

  return Compte;
};
